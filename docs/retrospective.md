# Development Retrospective

## 1. Project Overview

Job Application Tracker was developed as a full-stack MVP to simplify the process of managing job applications.

The project followed a structured development process: problem definition, requirements specification, architecture design, implementation, testing, and validation.

## 2. What Was Implemented

The application provides a complete CRUD workflow for job applications.

Users can create applications, update their details, change recruitment statuses, filter records, and delete applications.

The system uses React and TypeScript for the frontend, Express for the REST API, and SQLite for persistent storage.

## 3. Important Engineering Decisions

**SQLite instead of PostgreSQL**

SQLite was selected because the MVP targets a single local user. It provides persistence without requiring a separate database server.

**REST API instead of GraphQL**

REST was selected because the application has straightforward resource-based operations and does not require complex querying.

**Monolithic backend instead of microservices**

A small Express backend reduces operational complexity and makes the system easier to understand and maintain.

**Limited MVP scope**

Authentication, email integrations, and advanced analytics were excluded to prioritize reliable core functionality.

## 4. Changes During Implementation

The initial architecture considered separate service and repository layers.

During implementation, direct route-to-repository interaction was sufficient for the application's simple business logic. A dedicated service layer was therefore deferred.

The backend development port was also changed from 5000 to 5001. The frontend environment configuration was updated accordingly.

## 5. Technical Debt

The current implementation has several limitations:

- No authentication or authorization.
- Limited automated frontend coverage.
- No database migration framework.
- Minimal logging and observability.
- No automated deployment pipeline.

These compromises were accepted to keep the first iteration appropriately scoped.

## 6. Production Risks

Public deployment would require authentication, authorization, secure configuration, backup and recovery procedures, improved logging, and additional security testing.

Database migration management would also become important as the data model evolves.

## 7. AI Usage

AI-assisted tools supported the following activities:

- Structuring requirements and technical documentation.
- Comparing architecture alternatives.
- Generating initial implementation examples.
- Troubleshooting TypeScript and Vite build errors.
- Developing validation logic and test cases.
- Preparing documentation.

AI-generated code was integrated into the project and checked against the specified requirements. Build errors and integration problems were investigated and corrected during development.

The main benefit of AI assistance was accelerating repetitive implementation and documentation tasks while keeping the engineering decisions focused on the MVP's requirements.

## 8. Next Iteration

The next development cycle would prioritize:

1. Expanding automated test coverage.
2. Improving UI accessibility and error reporting.
3. Introducing database migrations.
4. Adding authentication before multi-user or public deployment.
5. Implementing optional interview reminders.

## 9. Lessons Learned

The project demonstrated the importance of establishing clear requirements before implementation.

A limited MVP scope made it possible to implement the central user