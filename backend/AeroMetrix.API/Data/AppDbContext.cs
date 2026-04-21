// Entity Framework Core DbContext that maps the Users, DroneConfigurations, and FlightLogs tables to the SQLite database.
using Microsoft.EntityFrameworkCore;
using AeroMetrix.API.Models;

namespace AeroMetrix.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<DroneConfiguration> DroneConfigurations { get; set; }
    public DbSet<FlightLog> FlightLogs { get; set; }
}
