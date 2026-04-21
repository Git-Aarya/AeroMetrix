// Data model representing a drone's hardware configuration including its model name, weight, and maximum battery capacity.
namespace AeroMetrix.API.Models;

public class DroneConfiguration
{
    public int Id { get; set; }
    public string DroneModel { get; set; } = string.Empty;
    public double EmptyWeightKg { get; set; }
    public double MaxBatteryCapacityMAh { get; set; }
}
