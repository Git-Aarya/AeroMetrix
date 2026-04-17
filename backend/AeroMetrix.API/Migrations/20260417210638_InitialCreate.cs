using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AeroMetrix.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DroneConfigurations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DroneModel = table.Column<string>(type: "TEXT", nullable: false),
                    EmptyWeightKg = table.Column<double>(type: "REAL", nullable: false),
                    MaxBatteryCapacityMAh = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DroneConfigurations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FlightLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DroneConfigurationId = table.Column<int>(type: "INTEGER", nullable: false),
                    FlightDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    AvgWindResistanceMs = table.Column<double>(type: "REAL", nullable: false),
                    BatteryDrainRateMAhPerMin = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlightLogs_DroneConfigurations_DroneConfigurationId",
                        column: x => x.DroneConfigurationId,
                        principalTable: "DroneConfigurations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightLogs_DroneConfigurationId",
                table: "FlightLogs",
                column: "DroneConfigurationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightLogs");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "DroneConfigurations");
        }
    }
}
