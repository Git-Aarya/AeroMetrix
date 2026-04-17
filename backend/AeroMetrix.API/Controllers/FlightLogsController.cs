using Microsoft.AspNetCore.Mvc;
using AeroMetrix.API.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AeroMetrix.API.Controllers;

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
    public IActionResult GetSummary()
    {
        // Currently returning hardcoded values representing the MVP integration.
        // In the future this will query _context.FlightLogs and _context.DroneConfigurations
        // and trigger the Julia subprocess.
        
        return Ok(new
        {
            activeDrones = 24,
            avgBatteryDrain = "4.2 mAh/m",
            windResistanceMax = "12 m/s",
            status = "Optimal Health - LIVE API"
        });
    }

    [HttpPost("sync")]
    public IActionResult TriggerJuliaSync()
    {
        // This is a placeholder for triggering the Julia script
        // e.g. System.Diagnostics.Process.Start("julia", "processing/TelemetryAnalyzer.jl");
        
        // Return randomized values to show the UI updating
        var random = new System.Random();
        return Ok(new
        {
            activeDrones = random.Next(20, 30),
            avgBatteryDrain = $"{random.NextDouble() * 2 + 3:F1} mAh/m",
            windResistanceMax = $"{random.Next(8, 15)} m/s",
            status = "Optimal Health - SYNCED"
        });
    }
}
