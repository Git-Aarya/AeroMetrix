# Contributing to AeroMetrix

First off, thank you for considering contributing to AeroMetrix! As an open-source flight telemetry diagnostic suite, we encourage any improvements you can make towards computational performance or React UI/UX design.

## Architecture Guidelines

AeroMetrix follows strict separation of concerns:
1.  **React Frontend:** Strictly used for visualization, component mapping, and REST interfacing. Do *not* write data computation hooks here. All logic and data caching should route through `@tanstack/react-query`.
2.  **C# Controller Layer:** The API routes handle basic logic mapping, repository transactions, and cross-framework process bootup. It acts entirely as a traffic controller structure.
3.  **Julia Engine:** *All heavy matrix computations and mathematical models must be implemented here.* If you are writing a feature that involves computational formulas against flight path records, append it to `TelemetryAnalyzer.jl`.

## Local Development Spin Up Quick Start

Ensure you have `.NET 8 SDK`, `Node v18+`, and `Julia v1.9+` installed natively across your system environment path.

1.  Clone repo.
2.  Install Julia Packages locally: `julia install.jl`
3.  Install Python modules (Optional for testing mock telemetry generator scripts): `pip install -r requirements.txt`
4.  Boot Backend API: `cd backend/AeroMetrix.API && dotnet run`
5.  Boot Frontend Client: `cd frontend && npm install && npm run electron:dev`

## Pull Request TDD Standards

All PRs must maintain Test-Driven Development Coverage metrics:
*   Frontend Components: Requires standard rendering and mock verifications tracked via `jest` and `React Testing Library`. (`npm test` in `/frontend`)
*   Backend Logic: Requires In-Memory Database Controller unit tests tracked via `xUnit`. (`dotnet test` in `/backend/AeroMetrix.API.Tests`)

Ensure GitHub Actions (`.github/workflows/main.yml`) checks fully pass against your commit before requesting review.
