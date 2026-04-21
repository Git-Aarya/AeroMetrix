# Generates a synthetic drone flight telemetry CSV (1000 rows) simulating airspeed, groundspeed, battery voltage, and motor current data for testing.
import pandas as pd
import numpy as np
import os

# Create data directory if it doesn't exist
os.makedirs('data', exist_ok=True)

# Generate 1000 rows of flight data (simulating a 16-minute flight recorded at 1Hz)
np.random.seed(42)
time_steps = np.arange(0, 1000)

# Simulate drones struggling against wind
airspeed = np.random.normal(15, 2, 1000) # Drone's internal speedometer (m/s)
groundspeed = airspeed - np.random.normal(5, 3, 1000) # True speed over ground
groundspeed = np.clip(groundspeed, 0, None)

# Simulate battery drain (starts at 16.8V for a 4S lipo, drops linearly + noise based on wind drag)
base_drain = 0.002 * time_steps
drag_penalty = (airspeed - groundspeed) * 0.0005
voltage = 16.8 - base_drain - drag_penalty + np.random.normal(0, 0.05, 1000)

df = pd.DataFrame({
    'Time_s': time_steps,
    'Airspeed_ms': airspeed,
    'Groundspeed_ms': groundspeed,
    'Battery_Voltage': voltage,
    'Motor_Current_A': np.random.normal(25, 5, 1000) + (airspeed - groundspeed) * 2
})

filepath = 'data/sample_telemetry.csv'
df.to_csv(filepath, index=False)
print(f"Successfully generated 1000 rows of realistic telemetry data at {filepath}")
