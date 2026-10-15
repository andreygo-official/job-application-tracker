import { useEffect, useState } from "react";
import { applicationApi } from "./services/api";
import type {
  JobApplication,
  ApplicationStatus,
} from "./types/application";
import "./App.css";

const statuses: ApplicationStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filter, setFilter] = useState<ApplicationStatus | "All">("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadApplications() {
      setLoading(true);
      setError("");

      try {
        const data = await applicationApi.getAll(
          filter === "All" ? undefined : filter
        );

        if (active) setApplications(data);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Failed to load applications"
          );
          setApplications([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadApplications();

    return () => {
      active = false;
    };
  }, [filter]);

  return (
    <main className="dashboard">
      <header>
        <h1>Job Application Tracker</h1>
        <p>Manage your job applications in one place.</p>
      </header>

      <section className="toolbar">
        <label htmlFor="status-filter">Filter by status:</label>

        <select
          id="status-filter"
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value as ApplicationStatus | "All")
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

      {loading && <p>Loading applications...</p>}

      {error && <p role="alert" className="error">{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <p>No applications found.</p>
      )}

      {!loading && !error && applications.length > 0 && (
        <section className="application-grid">
          {applications.map((application) => (
            <article key={application.id} className="application-card">
              <h2>{application.jobTitle}</h2>
              <p>{application.companyName}</p>

              <span className="status">{application.status}</span>

              <p>
                Applied: {application.applicationDate}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default App;