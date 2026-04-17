# AeroMetrix API Reference

The AeroMetrix backend exposes a lightweight C# ASP.NET Core REST API to interface between the Drone Telemetry Database and the Julia Processing Engine.

## Base URL
Local Development environment: `http://localhost:5079/api/`

---

### 1. Flight Logs Summary

Retrieves the global fleet health statistics by aggregating all stored telemetry records in the Entity Framework Core SQLite database.

**Endpoint:** `/flightlogs/summary`
**Method:** `GET`
**Content-Type:** `application/json`

**Response Example (200 OK):**
```json
{
  "activeDrones": 35,
  "avgBatteryDrain": "118.1 mAh/m",
  "windResistanceMax": "5.2 m/s",
  "status": "Optimal Health",
  "recentLogs": [
    {
      "name": "Flight 1",
      "windResistance": 5.2,
      "batteryDrain": 118.1
    }
  ]
}
```

---

### 2. Trigger Flight Sync

Triggers a backend process to execute the Julia computational engine natively. It loads `sample_telemetry.csv`, parses the computed telemetry output, maps the metrics into a C# `FlightLog` entity, and saves the historical record into the `aerometrix.db` database.

**Endpoint:** `/flightlogs/sync`
**Method:** `POST`
**Content-Type:** `application/json`

*Note: For testing and UI visualization purposes in a simulated environment, this endpoint dynamically applies a +/- 15% random variance to the computed metrics to realistically map fluctuating charts without requiring new CSV files per sync.*

**Response Example (200 OK):**
```json
{
  "message": "Synced successfully"
}
```
