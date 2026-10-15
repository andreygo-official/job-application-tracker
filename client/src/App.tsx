import { useEffect, useState } from "react";
import { applicationApi } from "./services/api";
import {ApplicationForm} from "./components/ApplicationForm";
import { ApplicationCard } from "./components/ApplicationCard";
import type {
  JobApplication,
  ApplicationInput,
  ApplicationStatus,
} from "./types/application";
import "./App.css";

const statuses: ApplicationStatus[] = [
  "Applied", "Interview", "Offer", "Rejected",
];

function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filter, setFilter] = useState<ApplicationStatus | "All">("All");
  const [editing, setEditing] = useState<JobApplication | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await applicationApi.getAll(
          filter === "All" ? undefined : filter
        );

        if (active) setApplications(data);
      } catch (err) {
        if (active) {
          setApplications([]);
          setError(
            err instanceof Error ? err.message : "Failed to load"
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [filter, revision]);

  function refresh() {
    setRevision((value) => value + 1);
  }

  async function handleSave(data: ApplicationInput) {
    if (editing) {
      await applicationApi.update(editing.id, data);
    } else {
      await applicationApi.create(data);
    }

    setShowForm(false);
    setEditing(null);
    refresh();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this application?")) return;

    setBusyId(id);
    setError("");

    try {
      await applicationApi.delete(id);
      refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Delete failed"
      );
    } finally {
      setBusyId(null);
    }
  }

  async function handleStatusChange(
    id: number,
    status: ApplicationStatus
  ) {
    setBusyId(id);
    setError("");

    try {
      await applicationApi.update(id, { status });
      refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Update failed"
      );
    } finally {
      setBusyId(null);
    }
  }

  function startEdit(application: JobApplication) {
    setEditing(application);
    setShowForm(true);
  }

  function startCreate() {
    setEditing(null);
    setShowForm(true);
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Job Application Tracker</h1>
          <p>Manage your job applications in one place.</p>
        </div>

        <button
          onClick={startCreate}
          disabled={showForm}
          className="primary-button"
        >
          + Add Application
        </button>
      </header>

      {showForm && (
        <ApplicationForm
          key={editing?.id ?? "new"}
          application={editing}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      <section className="toolbar">
        <label htmlFor="status-filter">Filter by status:</label>
        <select
          id="status-filter"
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as ApplicationStatus | "All")
          }
        >
          <option value="All">All Applications</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </section>

      {error && <p role="alert" className="error">{error}</p>}
      {loading && <p>Loading applications...</p>}

      {!loading && !error && applications.length === 0 && (
        <p>No applications found.</p>
      )}

      {!loading && applications.length > 0 && (
        <section className="application-grid">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              busy={busyId === application.id}
              onEdit={startEdit}
              onDelete={(id) => void handleDelete(id)}
              onStatusChange={(id, status) =>
                void handleStatusChange(id, status)
              }
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default App;