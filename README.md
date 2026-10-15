# Job Application Tracker

A full-stack web application that helps job seekers organize and manage their job applications throughout the recruitment process.

Built as an MVP to demonstrate requirements engineering, system design, implementation, testing, and validation.

## Features

- Create job applications.
- View saved applications.
- Edit application details.
- Update application statuses.
- Filter applications by status.
- Delete applications with confirmation.
- Store application data persistently.
- Validate input and handle API errors.

**Supported statuses:** Applied, Interview, Offer, Rejected.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express, TypeScript |
| Database | SQLite (better-sqlite3) |
| Validation | Zod |
| Testing | Vitest, Supertest, React Testing Library |

## Project Structure

```text
job-application-tracker/
├── client/                   # React frontend
├── server/                   # Express REST API
├── docs/
│   ├── problem-definition.md
│   ├── SRS.md
│   ├── architecture.md
│   └── validation.md
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js compatible with the installed project dependencies
- npm
- Git

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd job-application-tracker
```

Install the backend dependencies:

```bash
cd server
npm ci
```

Install the frontend dependencies:

```bash
cd ../client
npm ci
```

## Environment Configuration

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5001
```

The backend uses port 5001. Configure `server/.env` if necessary:

```env
PORT=5001
DATABASE_PATH=applications.db
```

The SQLite database is initialized automatically when the backend starts.

## Running the Application

Start the backend in the first terminal:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open:

http://localhost:5173

Backend API:

http://localhost:5001/api

Health check:

http://localhost:5001/api/health

## REST API

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/applications | Retrieve applications |
| GET | /api/applications/:id | Retrieve one application |
| POST | /api/applications | Create an application |
| PATCH | /api/applications/:id | Update an application |
| DELETE | /api/applications/:id | Delete an application |

## Running Tests

Frontend:

```bash
cd client
npm test
npm run build
```

Backend:

```bash
cd server
npm test
npm run build
```

## Architecture

The system uses a client-server architecture.

The React frontend communicates with the Express backend over HTTP. The backend validates incoming requests and stores application records in SQLite.

The architecture prioritizes simplicity, maintainability, and a complete working MVP rather than unnecessary infrastructure complexity.

For additional information, see `docs/architecture.md`.

## Scope and Limitations

The first iteration is intended for local, single-user operation.

Authentication, multi-user support, notifications, email synchronization, and production hosting are intentionally excluded.

The application should not be publicly deployed without additional access controls and security measures.

## Engineering Documentation

- `docs/problem-definition.md` — problem, users, value, and scope.
- `docs/SRS.md` — functional and non-functional requirements.
- `docs/architecture.md` — architecture and technology decisions.
- `docs/validation.md` — implementation verification.
- `docs/retrospective.md` — development reflections and future work.

## Future Improvements

Potential improvements include authentication, user accounts, interview reminders, analytics, and external integrations.

## AI-Assisted Development

AI tools were used to support requirements drafting, architecture exploration, implementation, debugging, and test generation.

Generated outputs were reviewed and verified through development builds, application testing, and engineering decisions.

The developer remained responsible for defining scope, selecting technologies, integrating components, and validating the resulting application.