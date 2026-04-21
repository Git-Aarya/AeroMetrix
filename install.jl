# Installs the required Julia package dependencies (DataFrames and CSV) needed by the telemetry processing engine.
import Pkg
Pkg.add(["DataFrames", "CSV"])
