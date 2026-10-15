# Software Requirements Specification (SRS)

**Project:** Job Application Tracker  
**Version:** 1.0 — Initial MVP Specification  
**Status:** Proposed

## 1. Introduction

### 1.1 Purpose

The Job Application Tracker is a web application designed to help job seekers organize and monitor their job applications.

The purpose of this document is to define the functional and non-functional requirements for the first working iteration of the application.

### 1.2 Problem Statement

Job seekers frequently apply for multiple positions using different recruitment platforms. Tracking applications through emails, bookmarks, or spreadsheets can become inefficient and disorganized.

The application will provide a centralized interface for recording applications, updating recruitment statuses, and reviewing job search progress.

### 1.3 Target Users

The primary users are individual job seekers managing several ongoing job applications.

### 1.4 MVP Scope

The MVP will allow users to:

- Create job applications.
- View previously created applications.
- Update application details.
- Delete applications.
- Change application statuses.
- Filter applications by status.
- Persist data between application restarts.

### 1.5 Out of Scope

The first iteration will not include authentication, multi-user support, email integration, automatic job applications, AI recommendations, or notifications.

## 2. System Overview

The application will consist of a React frontend, a REST API backend, and a database for persistent storage.

The first iteration will be designed for local, single-user operation. The user will interact with the application through a browser.

## 3. Functional Requirements

### FR-01: Create Job Application

The system shall allow users to create job applications.

Required fields:

- Company name
- Job title
- Application date

Optional fields:

- Job posting URL
- Interview date
- Notes

If the user does not select a status, the system shall assign "Applied" automatically.

**Acceptance criteria:** A valid application is saved in the database and appears in the application list. Invalid submissions are rejected with explanatory validation messages.

### FR-02: View Applications

The system shall display all saved job applications.

Each application shall display its company name, job title, application date, and current status.

Applications shall be ordered by application date, newest first.

**Acceptance criteria:** Previously saved applications remain visible after refreshing the page and restarting the application.

### FR-03: Update Application

The system shall allow users to edit an existing application's details.

**Acceptance criteria:** Updated data is saved successfully and remains available after refreshing the page.

### FR-04: Delete Application

The system shall allow users to delete job applications.

The interface shall request confirmation before deletion.

**Acceptance criteria:** Once deletion is confirmed, the application is removed from persistent storage and the application list.

### FR-05: Update Application Status

The system shall support four application statuses:

- Applied
- Interview
- Offer
- Rejected

Users shall be able to change an application's status without modifying other fields.

**Acceptance criteria:** The new status is stored and displayed correctly. Unsupported statuses are rejected.

### FR-06: Filter Applications

The system shall allow users to filter applications by status.

An "All" option shall display every application.

**Acceptance criteria:** Selecting a filter displays only matching records without modifying stored data.

### FR-07: Input Validation

The system shall validate user input before storing application data.

Validation rules:

- Company name: required, 1–100 characters.
- Job title: required, 1–150 characters.
- Application date: required, valid date in YYYY-MM-DD format.
- Status: one of the four supported values.
- Job URL: optional, valid HTTP or HTTPS URL.
- Interview date: optional, valid date in YYYY-MM-DD format.
- Notes: optional, maximum 2,000 characters.

Whitespace-only company names and job titles shall be rejected.

The backend shall enforce validation independently of the frontend.

**Acceptance criteria:** Invalid data cannot be stored, even when submitted directly to the API.

### FR-08: Error Handling

The system shall display understandable messages when an operation fails.

**Acceptance criteria:** Failed requests do not incorrectly appear successful, and users receive an appropriate error message.

## 4. Non-Functional Requirements

### NFR-01: Data Persistence

Application records shall be stored in a SQLite database and remain available after restarting the application.

### NFR-02: Usability

The application shall provide a responsive interface suitable for desktop and mobile browser widths.

The core workflows shall be accessible through clearly labeled controls.

### NFR-03: Maintainability

The codebase shall use TypeScript, separate frontend and backend responsibilities, and follow a consistent folder structure.

### NFR-04: Reliability

The application shall handle validation failures, missing records, and database errors without crashing the application process during normal operation.

### NFR-05: Security

API input shall be validated on the server.

SQL statements shall use parameterized queries or equivalent protections against SQL injection.

The application shall be intended for local access only. Public deployment without authentication and access controls is outside the MVP scope.

### NFR-06: Performance

For a local dataset of up to 1,000 applications, ordinary create, view, update, delete, and filter operations should complete within two seconds under normal development-machine conditions.

## 5. Data Model

### JobApplication

| Field | Type | Description |
|---|---|---|
| id | Unique identifier | Generated by the system |
| companyName | String | Required |
| jobTitle | String | Required |
| status | Enum | Applied, Interview, Offer, Rejected |
| applicationDate | Date | Required |
| jobUrl | String / null | Optional |
| interviewDate | Date / null | Optional |
| notes | String / null | Optional |
| createdAt | Timestamp | Record creation time |
| updatedAt | Timestamp | Last modification time |

Each application shall have one unique identifier.

## 6. API Requirements

The frontend shall communicate with the backend through a JSON-based REST API.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/applications | Retrieve applications, optionally filtered by status |
| GET | /api/applications/:id | Retrieve one application |
| POST | /api/applications | Create an application |
| PATCH | /api/applications/:id | Update an application |
| DELETE | /api/applications/:id | Delete an application |

Successful requests shall use appropriate HTTP success codes.

Validation failures shall return HTTP 400, missing records HTTP 404, and unexpected server errors HTTP 500.

The API shall return JSON error responses with useful messages.

## 7. Core User Workflow

1. The user opens the application dashboard.
2. The application loads stored job applications.
3. The user selects "Add Application."
4. The user enters application details and submits the form.
5. The frontend validates the input and sends a request to the backend.
6. The backend validates the request and saves the application.
7. The new application appears on the dashboard.
8. The user can update its status, edit its details, filter the list, or delete it.

## 8. Constraints and Assumptions

- The MVP will support a single local user.
- Internet connectivity is not required for core functionality after dependencies have been installed.
- The frontend and backend will be separate components.
- SQLite will be used for persistent storage.
- User authentication is not required for the local MVP.
- Application dates and interview dates represent calendar dates, not scheduled times.

## 9. Testing and Acceptance

The first iteration shall be considered functionally complete when:

1. Users can create valid applications.
2. Invalid data is rejected.
3. Saved applications appear after refreshing the page.
4. Application updates persist.
5. Deletion permanently removes selected records.
6. Status filtering returns correct results.
7. Backend automated tests cover the primary CRUD operations and important validation failures.
8. Frontend and backend can be started using the instructions in README.md.

## 10. Future Enhancements

Potential future iterations may include authentication, multiple user accounts, interview reminders, analytics, search, and external calendar integration.

Future functionality shall be prioritized using user feedback and findings from MVP validation.