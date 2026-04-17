# AeroMetrix Data & Processing Models

AeroMetrix uses a multi-language processing pipeline. The backend is powered by **C# Entity Framework Core**, while the heavy computational logic is delegated to a specialized **Julia** subspace (`TelemetryAnalyzer.jl`).

---

## 1. Relational Database Models (C#)

Stored internally using an SQLite instance (`aerometrix.db`) connected via Code-First EF Core Migrations.

### `DroneConfiguration`
A parent configuration entity representing a class of drones operating in the fleet.
*   **Id** `[int, Primary Key]`
*   **DroneModel** `[string, Max 100]`
*   **MaxBatteryCapacityMAh** `[double]`
*   **EmptyWeightKg** `[double]`

### `FlightLog`
A child entity capturing the processed aggregate physics of a completed flight block.
*   **Id** `[int, Primary Key]`
*   **DroneConfigurationId** `[int, Foreign Key]`
*   **FlightDate** `[DateTime]`
*   **AvgWindResistanceMs** `[double]`
*   **BatteryDrainRateMAhPerMin** `[double]`

---

## 2. Telemetry Processing Pipeline (Julia)

The Julia sub-process utilizes explicitly performant data manipulation via `DataFrames.jl` and `CSV.jl`.

### Data Ingestion
Telemetry files expected are standard `[Nx5]` matrices output at roughly 1Hz representing recorded properties: `Time_s`, `Airspeed_ms`, `Groundspeed_ms`, `Battery_Voltage`, `Motor_Current_A`.

### Calculations
*   **Wind Resistance Extraction:** Calculated as the delta offset between the drone's internal pitot tube readings (Airspeed) vs standard positioning systems (Groundspeed). 
*   **Battery Depletion Rates:** Scaled based on voltage drops dynamically tracked across flight intervals. In simulated mode, `AvgBatteryDrain` represents `(Total Voltage Drop / Total Matrix Capture Duration Mins) * 1000` to mirror `mAh/m`.

### Output Handshake
The script outputs standard JSON exclusively to STDOUT. The C# executing `Process` class reads the output natively, deserializes the JSON string, and seeds the Database layer.
