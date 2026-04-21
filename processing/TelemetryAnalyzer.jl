# Julia processing module that reads flight telemetry CSV data and calculates wind resistance, battery drain, and flight time metrics, outputting results as JSON.
module TelemetryAnalyzer

using DataFrames
using CSV

export process_flight_data

"""
    process_flight_data(file_path::String)

Reads a CSV of flight telemetry, calculates wind resistance vectors
and estimates battery drain over time, outputting a JSON string.
"""
function process_flight_data(file_path::String)    
    if !isfile(file_path)
        error("Telemetry file not found at: \$file_path")
    end

    df = CSV.read(file_path, DataFrame)
    
    # Calculate real statistics from the simulated CSV

    # Wind Resistance
    df.WindResistance = df.Airspeed_ms .- df.Groundspeed_ms
    avg_wind_res = sum(df.WindResistance) / nrow(df)
    
    # Battery voltage drop over the flight
    starting_voltage = df.Battery_Voltage[1]
    ending_voltage = df.Battery_Voltage[end]
    voltage_drop = starting_voltage - ending_voltage
    
    total_time_mins = nrow(df) / 60.0
    
    # Batter drain factor in mAh
    avg_drain = (voltage_drop / total_time_mins) * 1000 
    
    # Peak Wind Resistance
    peak_wind_res = maximum(df.WindResistance)

    # Output as JSON for C# to parse
    println("{\"AvgWindResistance\": $(round(avg_wind_res, digits=2)), \"PeakWindResistance\": $(round(peak_wind_res, digits=2)), \"AvgBatteryDrain\": $(round(avg_drain, digits=2)), \"TotalFlightTimeS\": $(nrow(df))}")
end

# Check if script is run directly from command line
if abspath(PROGRAM_FILE) == @__FILE__
    if length(ARGS) > 0
        process_flight_data(ARGS[1])
    else
        println("{\"error\": \"Please provide a filepath argument\"}")
    end
end

end
