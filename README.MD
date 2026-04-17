<div align="center">
  <img src="./frontend/public/vite.svg" alt="AeroMetrix Header" width="120" />
  <h1>🚁 AeroMetrix: Advanced Drone Telemetry Analyzer</h1>

  <p>
    <strong>A high-performance, cross-platform telemetry processor mapping computational models across Julia, C#, and React.</strong>
  </p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white" alt="C#">
    <img src="https://img.shields.io/badge/ASP.NET_Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt="ASP.NET Core">
    <img src="https://img.shields.io/badge/Julia-9558B2?style=for-the-badge&logo=julia&logoColor=white" alt="Julia">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white" alt="Electron">
  </p>
</div>

---

## 📖 Overview

AeroMetrix is a cross-platform desktop application designed to ingest, process, and beautifully visualize high-fidelity drone flight telemetry. Built structurally with rigorous multi-tier framework processing, it acts as a testbed for bridging rapid UI development (React) with heavy numerical data science engines (Julia) seamlessly orchestrated by robust object-relational mapping (C# EF Core).

It empowers drone operators to simulate telemetry metrics, analyze battery degradation against complex wind resistance variables, and visualize dynamic fleet health live.

## 🌟 Architecture & Tech Stack

AeroMetrix achieves explicit separation of concerns by assigning each micro-pipeline exactly according to its ideal programming paradigm:

1.  **Frontend Desk/Web (React + TypeScript + UI)**
    *   Responsive, glowing "Glassmorphism" design system utilizing `@mui/material`.
    *   State and cache-managed exclusively by `@tanstack/react-query` to pull API data flawlessly.
    *   `Recharts` plotting engines to beautifully graph multi-variable vectors.
    *   Wrapped inside an `Electron` core shell for native, cross-platform OS deployment distributions.

2.  **Backend Integration Controller (C# ASP.NET Core)**
    *   RESTful pipeline handling endpoints safely across CORS limitations.
    *   Entity Framework Core mapped with dynamic `.db` SQLite migrations structurally modeling `FlightLogs` and `DroneConfigurations`.
    *   Subprocess manager executing external CLI computational environments safely.

3.  **Algorithmic Engine (Julia)**
    *   The core metrics brain leveraging `DataFrames.jl` and `CSV.jl` modules.
    *   It rips through hundreds of thousands of matrix points instantly crunching mathematical vectors for Aerodynamic wind deltas and battery voltage degradation heuristics.

## 📸 Dynamic Visualization
*AeroMetrix translates raw matrix flight data into an actionable AreaChart dynamically comparing voltage drain scaling against aerodynamics over localized flight clusters.*

## 🚀 Getting Started

Follow these steps to configure your local development playground.

### Prerequisites
*   Node.js (v18+)
*   .NET 8 SDK
*   Julia (v1.9+)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/AeroMetrix.git
    cd AeroMetrix
    ```
2.  **Setup Global Libraries (Julia)**
    ```bash
    julia install.jl 
    # Or natively via Julia console: Pkg.add(["DataFrames", "CSV"])
    ```
3.  **Initialize the API & Database Migrations (C# ASP.NET Core)**
    ```bash
    cd backend/AeroMetrix.API
    dotnet restore
    dotnet ef database update
    # Start the local Host
    dotnet run
    ```
4.  **Boot the Desktop Application (Vite/React/Electron)**
    ```bash
    cd frontend
    npm install
    # Execute developer electron client
    npm run electron:dev
    ```

## 🧪 Testing & CI/CD Pipelines

AeroMetrix maintains rigid TDD structures locally enforced by an automated GitHub Actions pipeline (`main.yml`) upon branch merges.

*   **Backend (xUnit):** Utilizing `Moq` patterns against an `InMemoryDatabase` architecture to validate SQL mapping interactions. (Execute `dotnet test` within `AeroMetrix.API.Tests/`).
*   **Frontend (Jest):** Integrated tightly into the Vite TSConfig utilizing the `React Testing Library` and `Babel JSDOM` environment to validate Component rendering logic without booting the window. (Execute `npm test` within `frontend/`).

## 📚 Deep Dive Documentation

Please browse the core `./docs` sector if you want to intimately explore how the subsystems natively interface!

*   [API Schema and C# Controller Endpoints](./docs/API_REFERENCE.md)
*   [Julia Mathematical Models Explained](./docs/DATA_MODELS.md)
*   [Developer Setup & Contribution Guide](./docs/CONTRIBUTING.md)