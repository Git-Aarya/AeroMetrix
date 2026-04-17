namespace AeroMetrix.API.Models;

public class DroneConfiguration
{
    public int Id { get; set; }
    public string DroneModel { get; set; } = string.Empty;
    public double EmptyWeightKg { get; set; }
    public double MaxBatteryCapacityMAh { get; set; }
}
