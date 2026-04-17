using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;
using AeroMetrix.API.Controllers;
using AeroMetrix.API.Data;
using AeroMetrix.API.Models;

namespace AeroMetrix.API.Tests;

public class FlightLogsControllerTests
{
    private async Task<AppDbContext> GetDatabaseContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite("DataSource=:memory:")
            .Options;
            
        var databaseContext = new AppDbContext(options);
        databaseContext.Database.OpenConnection();
        databaseContext.Database.EnsureCreated();
        
        return databaseContext;
    }

    [Fact]
    public async Task GetSummary_ReturnsEmptyState_WhenNoLogsExist()
    {
        // Arrange
        using var context = await GetDatabaseContext();
        var controller = new FlightLogsController(context);

        // Act
        var result = await controller.GetSummary();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var value = okResult.Value;
        
        var statusProp = value?.GetType().GetProperty("status")?.GetValue(value, null) as string;
        Assert.Equal("Awaiting Data", statusProp);
    }

    [Fact]
    public async Task GetSummary_CalculatesAverages_WhenLogsExist()
    {
        // Arrange
        using var context = await GetDatabaseContext();
        
        var config = new DroneConfiguration { Id = 1, DroneModel = "Test" };
        context.DroneConfigurations.Add(config);
        
        context.FlightLogs.Add(new FlightLog 
        { 
            DroneConfigurationId = 1, 
            AvgWindResistanceMs = 10, 
            BatteryDrainRateMAhPerMin = 100 
        });
        context.FlightLogs.Add(new FlightLog 
        { 
            DroneConfigurationId = 1, 
            AvgWindResistanceMs = 20, 
            BatteryDrainRateMAhPerMin = 200 
        });
        await context.SaveChangesAsync();

        var controller = new FlightLogsController(context);

        // Act
        var result = await controller.GetSummary();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var value = okResult.Value;
        
        var avgDrain = value?.GetType().GetProperty("avgBatteryDrain")?.GetValue(value, null) as string;
        Assert.Equal("150.0 mAh/m", avgDrain);
        
        var peakWind = value?.GetType().GetProperty("windResistanceMax")?.GetValue(value, null) as string;
        Assert.Equal("20.0 m/s", peakWind);
    }
}
