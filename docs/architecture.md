# Architecture & System Design

## 1. Architecture Overview

Job Application Tracker follows a three-layer client-server architecture:

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** SQLite

The frontend communicates with the backend through a REST API using JSON.

## 2. Technology Decisions

| Technology | Reason |
|---|---|
| React | Component-based UI development |
| TypeScript | Type safety and maintainability |
| Vite | Fast development and simple configuration |
| Express | Lightweight REST API framework |
| SQLite | Persistent storage without a separate database server |
| Zod | Runtime validation of API inputs |
| Vitest | Automated testing |

A monolithic backend was selected over microservices to reduce deployment and maintenance complexity. SQLite was preferred over PostgreSQL because the MVP supports one local user and does not require concurrent distributed access.

## 3. Backend Structure

The backend will separate responsibilities into:

- Routes: HTTP endpoint definitions.
- Controllers: HTTP request and response handling.
- Services: Business logic.
- Repositories: Database operations.
- Schemas: Input validation.

## 4. Database Design

The `applications` table will contain:

| Column | Type |
|---|---|
| id | INTEGER PRIMARY KEY |
| company_name | TEXT NOT NULL |
| job_title | TEXT NOT NULL |
| status | TEXT NOT NULL |
| application_date | TEXT NOT NULL |
| job_url | TEXT |
| interview_date | TEXT |
| notes | TEXT |
| created_at | TEXT NOT NULL |
| updated_at | TEXT NOT NULL |

Statuses: Applied, Interview, Offer, Rejected.

Dates will use ISO 8601 representations. Application and interview dates use YYYY-MM-DD. Timestamps use UTC.

## 5. REST API

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/applications | List applications; optional `status` query parameter |
| GET | /api/applications/:id | Get application by ID |
| POST | /api/applications | Create application |
| PATCH | /api/applications/:id | Update application |
| DELETE | /api/applications/:id | Delete application |

The API will return JSON. Create operations return HTTP 201, successful reads and updates return HTTP 200, and successful deletion returns HTTP 204.

Validation errors return 400, missing resources return 404, and unexpected errors return 500.

## 6. Security

- Validate incoming requests using Zod.
- Use parameterized SQL queries.
- Limit CORS to the local frontend origin.
- Keep database files and environment variables outside Git.
- Bind the development backend to localhost.

Authentication is excluded because the first iteration is intended for local single-user use.

## 7. Testing Strategy

- Unit tests for validation and business rules.
- API integration tests for CRUD operations.
- Tests for invalid inputs and missing resources.
- Manual verification of core frontend workflows.

## 8. Deployment Approach

The MVP runs locally using two development processes: Vite for the frontend and Express for the backend.

Production hosting, multi-user access, and cloud infrastructure are outside the MVP scope.

## 9. Trade-offs and Limitations

SQLite simplifies setup but is less suitable for a distributed, highly concurrent system than a database server.

Separate frontend and backend processes add some setup complexity but establish clear API boundaries.

The MVP prioritizes a reliable CRUD workflow over advanced integrations, authentication, and analytics.