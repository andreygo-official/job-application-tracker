import type {
    JobApplication,
    ApplicationStatus,
  } from "../types/application";
  
  interface Props {
    application: JobApplication;
    busy: boolean;
    onEdit: (application: JobApplication) => void;
    onDelete: (id: number) => void;
    onStatusChange: (
      id: number,
      status: ApplicationStatus
    ) => void;
  }
  
  export function ApplicationCard({
    application,
    busy,
    onEdit,
    onDelete,
    onStatusChange,
  }: Props) {
    return (
      <article className="application-card">
        <h2>{application.jobTitle}</h2>
        <p>{application.companyName}</p>
  
        <label className="card-status-label">
          Status
          <select
            value={application.status}
            disabled={busy}
            onChange={(e) =>
              onStatusChange(
                application.id,
                e.target.value as ApplicationStatus
              )
            }
          >
            {(["Applied", "Interview", "Offer", "Rejected"] as const)
              .map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
          </select>
        </label>
  
        <p>Applied: {application.applicationDate}</p>
  
        {application.interviewDate && (
          <p>Interview: {application.interviewDate}</p>
        )}
  
        {application.jobUrl && (
          <p>
            <a href={application.jobUrl} target="_blank"
               rel="noopener noreferrer">
              View Job Posting
            </a>
          </p>
        )}
  
        {application.notes && <p>{application.notes}</p>}
  
        <div className="card-actions">
          <button disabled={busy} onClick={() => onEdit(application)}>
            Edit
          </button>
          <button disabled={busy} onClick={() => onDelete(application.id)}>
            Delete
          </button>
        </div>
      </article>
    );
  }