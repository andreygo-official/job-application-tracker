import Database from "better-sqlite3";

const db = new Database(
  process.env.DATABASE_PATH || "applications.db"
);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Applied'
      CHECK (status IN ('Applied', 'Interview', 'Offer', 'Rejected')),
    application_date TEXT NOT NULL,
    job_url TEXT,
    interview_date TEXT,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;