import { useState, type FormEvent } from "react";
import type {
  ApplicationInput,
  ApplicationStatus,
  JobApplication,
} from "../types/application";

interface Props {
  application?: JobApplication | null;
  onSave: (data: ApplicationInput) => Promise<void>;
  onCancel: () => void;
}

const statuses: ApplicationStatus[] = [
  "Applied", "Interview", "Offer", "Rejected",
];

export function ApplicationForm({
  application,
  onSave,
  onCancel,
}: Props) {
  const [form, setForm] = useState<ApplicationInput>({
    companyName: application?.companyName ?? "",
    jobTitle: application?.jobTitle ?? "",
    applicationDate:
      application?.applicationDate ??
      new Date().toLocaleDateString("en-CA"),
    status: application?.status ?? "Applied",
    jobUrl: application?.jobUrl ?? "",
    interviewDate: application?.interviewDate ?? "",
    notes: application?.notes ?? "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    setError("");

    try {
      await onSave({
        ...form,
        companyName: form.companyName.trim(),
        jobTitle: form.jobTitle.trim(),
        jobUrl: form.jobUrl?.trim() || null,
        interviewDate: form.interviewDate || null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <h2>{application ? "Edit Application" : "Add Application"}</h2>

      {error && <p role="alert" className="error">{error}</p>}

      <label>
        Company Name *
        <input
          required
          maxLength={100}
          value={form.companyName}
          onChange={(e) =>
            setForm({ ...form, companyName: e.target.value })
          }
        />
      </label>

      <label>
        Job Title *
        <input
          required
          maxLength={150}
          value={form.jobTitle}
          onChange={(e) =>
            setForm({ ...form, jobTitle: e.target.value })
          }
        />
      </label>

      <label>
        Application Date *
        <input
          type="date"
          required
          value={form.applicationDate}
          onChange={(e) =>
            setForm({ ...form, applicationDate: e.target.value })
          }
        />
      </label>

      <label>
        Status
        <select
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value as ApplicationStatus,
            })
          }
        >
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </label>

      <label>
        Job URL
        <input
          type="url"
          value={form.jobUrl ?? ""}
          onChange={(e) =>
            setForm({ ...form, jobUrl: e.target.value })
          }
        />
      </label>

      <label>
        Interview Date
        <input
          type="date"
          value={form.interviewDate ?? ""}
          onChange={(e) =>
            setForm({ ...form, interviewDate: e.target.value })
          }
        />
      </label>

      <label>
        Notes
        <textarea
          maxLength={2000}
          rows={3}
          value={form.notes ?? ""}
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
        />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Application"}
        </button>
        <button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}