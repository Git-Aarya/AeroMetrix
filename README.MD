# 🚁 AeroMetrix: Drone Telemetry Analyzer

![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![Julia](https://img.shields.io/badge/Julia-9558B2?style=for-the-badge&logo=julia&logoColor=white)

AeroMetrix is a cross-platform desktop application designed to ingest, process, and visualize high-fidelity drone flight telemetry. It allows drone operators to upload flight CSVs, analyze battery degradation against wind resistance, and visualize flight paths.

This project was built to demonstrate full-stack desktop application development, performance-heavy data processing, and modern CI/CD practices.

## 🌟 Features

* **Data Visualization Desktop App:** Built with React, TypeScript, and Material UI, wrapped in Electron for native desktop performance.
* **High-Performance Processing:** Utilizes a Julia engine to calculate complex aerodynamic metrics and battery drain vectors from raw sensor data.
* **Robust API & Storage:** C# ASP.NET Core API using Entity Framework (MVC) and SQL to manage historical flight data and user fleet configurations.
* **Smart State Management:** Leverages React Query for seamless API synchronization, caching, and background data updates.

## 🏗️ Architecture & Tech Stack

* **Frontend Environment:** VS Code, TypeScript, React, Material UI, React Query, Electron.
* **Backend Environment:** Visual Studio, C# ASP.NET Core MVC, Entity Framework Core, SQL Server.
* **Data Processing:** Julia (DataFrames.jl for CSV ingestion and mathematical modeling).
* **DevOps & CI/CD:** Git, Azure DevOps (Pipelines for automated testing and builds).
* **Workflow:** Agile (Kanban), AI-assisted development (GitHub Copilot for boilerplate and unit test generation).

## 🧪 Testing & CI/CD

AeroMetrix was built using **Test-Driven Development (TDD)** principles to ensure reliability:
* **Backend:** xUnit and Moq used for API integration and unit testing.
* **Frontend:** Jest and React Testing Library for component testing.
* **Pipelines:** Commits to the `main` branch trigger an automated CI/CD pipeline that runs all unit tests, verifies database migrations, and builds the Electron executable.

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* .NET 8 SDK
* SQL Server (LocalDB or Express)
* Julia (v1.9+)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/AeroMetrix.git](https://github.com/yourusername/AeroMetrix.git)
    cd AeroMetrix
    ```

2.  **Setup the Database (C# / EF Core):**
    ```bash
    cd backend/AeroMetrix.API
    dotnet restore
    dotnet ef database update
    dotnet run
    ```

3.  **Run the Julia Processing Service:**
    ```bash
    cd backend/AeroMetrix.Processor
    julia --project=. -e 'using Pkg; Pkg.instantiate(); include("server.jl")'
    ```

4.  **Launch the Desktop App (Electron / React):**
    ```bash
    cd frontend
    npm install
    npm run electron:start
    ```

## 📚 Documentation & Guides

Comprehensive documentation for developers and end-users can be found in the `/docs` directory:
* [API Schema and Endpoints](./docs/API_REFERENCE.md)
* [Julia Mathematical Models Explained](./docs/DATA_MODELS.md)
* [Developer Setup & Contribution Guide](./docs/CONTRIBUTING.md)

## 🤖 AI Development Workflow

To accelerate development while maintaining code quality, AI tools were utilized throughout the lifecycle:
* **GitHub Copilot:** Used for generating boilerplate C# interfaces, React functional components, and writing repetitive Regex patterns.
* **ChatGPT:** Utilized for conceptualizing the Julia data models, drafting Agile user stories, and refining SQL queries for complex telemetry joins.