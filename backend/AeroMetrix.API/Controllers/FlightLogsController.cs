using Microsoft.AspNetCore.Mvc;
using AeroMetrix.API.Data;
using AeroMetrix.API.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Text.Json;
using System.IO;
using System.Linq;
using System;

namespace AeroMetrix.API.Controllers;

public class JuliaResultDto
{
    public double AvgWindResistance { get; set; }
    public double PeakWindResistance { get; set; }
    public double AvgBatteryDrain { get; set; }
    public int TotalFlightTimeS { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class FlightLogsController : ControllerBase
{
    private readonly AppDbContext _context;

    public FlightLogsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var totalLogs = await _context.FlightLogs.CountAsync();
        
        if (totalLogs == 0)
        {
            return Ok(new
            {
                activeDrones = 0,
                avgBatteryDrain = "0 mAh/m",
                windResistanceMax = "0 m/s",
                status = "Awaiting Data"
            });
        }

        var avgDrain = await _context.FlightLogs.AverageAsync(f => f.BatteryDrainRateMAhPerMin);
        var peakWind = await _context.FlightLogs.MaxAsync(f => f.AvgWindResistanceMs);

        // Simulation heuristic for active drones based on log counts
        var activeDrones = totalLogs * 2 + 5; 
        
        var status = avgDrain > 150 ? "Critical Battery Drag!" : "Optimal Health";

        return Ok(new
        {
            activeDrones = activeDrones,
            avgBatteryDrain = $"{avgDrain:F1} mAh/m",
            windResistanceMax = $"{peakWind:F1} m/s",
            status = status
        });
    }

    [HttpPost("sync")]
    public async Task<IActionResult> TriggerJuliaSync()
    {
        string projectRoot = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", ".."));
        string juliaScript = Path.Combine(projectRoot, "processing", "TelemetryAnalyzer.jl");
        string csvPath = Path.Combine(projectRoot, "data", "sample_telemetry.csv");

        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "julia",
                Arguments = $"\"{juliaScript}\" \"{csvPath}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        process.Start();
        string output = await process.StandardOutput.ReadToEndAsync();
        string err = await process.StandardError.ReadToEndAsync();
        await process.WaitForExitAsync();

        if (process.ExitCode != 0)
        {
            return StatusCode(500, $"Julia process failed: {err}");
        }

        JuliaResultDto juliaData;
        try
        {
            juliaData = JsonSerializer.Deserialize<JuliaResultDto>(output);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to parse Julia output: {output}. Error: {ex.Message}");
        }

        // Ensure we have a dummy DroneConfiguration to anchor the foreign key
        var config = await _context.DroneConfigurations.FirstOrDefaultAsync();
        if (config == null)
        {
            config = new DroneConfiguration { DroneModel = "Scout X4", EmptyWeightKg = 2.5, MaxBatteryCapacityMAh = 5000 };
            _context.DroneConfigurations.Add(config);
            await _context.SaveChangesAsync();
        }

        var log = new FlightLog
        {
            DroneConfigurationId = config.Id,
            FlightDate = DateTime.UtcNow,
            AvgWindResistanceMs = juliaData.AvgWindResistance,
            BatteryDrainRateMAhPerMin = juliaData.AvgBatteryDrain
        };

        _context.FlightLogs.Add(log);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Synced successfully" });
    }
}
