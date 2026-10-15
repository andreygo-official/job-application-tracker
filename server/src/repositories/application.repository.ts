import db from "../db/database.js";
import type { CreateApplication } from "../schemas/application.schema.js";

export interface Application {
  id: number;
  companyName: string;
  jobTitle: string;
  status: string;
  applicationDate: string;
  jobUrl: string | null;
  interviewDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

type ApplicationRow = {
  id: number;
  company_name: string;
  job_title: string;
  status: string;
  application_date: string;
  job_url: string | null;
  interview_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

function mapRow(row: ApplicationRow): Application {
  return {
    id: row.id,
    companyName: row.company_name,
    jobTitle: row.job_title,
    status: row.status,
    applicationDate: row.application_date,
    jobUrl: row.job_url,
    interviewDate: row.interview_date,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function getApplications(status?: string): Application[] {
  const rows = status
    ? db.prepare(
        `SELECT * FROM applications
         WHERE status = ?
         ORDER BY application_date DESC, id DESC`
      ).all(status)
    : db.prepare(
        `SELECT * FROM applications
         ORDER BY application_date DESC, id DESC`
      ).all();

  return (rows as ApplicationRow[]).map(mapRow);
}

export function getApplication(id: number): Application | null {
  const row = db.prepare(
    "SELECT * FROM applications WHERE id = ?"
  ).get(id) as ApplicationRow | undefined;

  return row ? mapRow(row) : null;
}

export function createApplication(data: CreateApplication): Application {
  const result = db.prepare(`
    INSERT INTO applications (
      company_name, job_title, status, application_date,
      job_url, interview_date, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    data.companyName,
    data.jobTitle,
    data.status,
    data.applicationDate,
    data.jobUrl ?? null,
    data.interviewDate ?? null,
    data.notes ?? null
  );

  return getApplication(Number(result.lastInsertRowid))!;
}

export function updateApplication(
  id: number,
  data: Partial<CreateApplication>
): Application | null {
  const current = getApplication(id);
  if (!current) return null;

  const updated = { ...current, ...data };

  db.prepare(`
    UPDATE applications SET
      company_name = ?,
      job_title = ?,
      status = ?,
      application_date = ?,
      job_url = ?,
      interview_date = ?,
      notes = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    updated.companyName,
    updated.jobTitle,
    updated.status,
    updated.applicationDate,
    updated.jobUrl ?? null,
    updated.interviewDate ?? null,
    updated.notes ?? null,
    id
  );

  return getApplication(id);
}

export function deleteApplication(id: number): boolean {
  const result = db.prepare(
    "DELETE FROM applications WHERE id = ?"
  ).run(id);

  return result.changes > 0;
}