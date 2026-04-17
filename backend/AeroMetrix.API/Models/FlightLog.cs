namespace AeroMetrix.API.Models;

public class FlightLog
{
    public int Id { get; set; }
    public int DroneConfigurationId { get; set; }
    public DroneConfiguration? DroneConfiguration { get; set; }
    public DateTime FlightDate { get; set; }
    public double AvgWindResistanceMs { get; set; }
    public double BatteryDrainRateMAhPerMin { get; set; }
}
