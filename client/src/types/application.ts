export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface JobApplication {
  id: number;
  companyName: string;
  jobTitle: string;
  status: ApplicationStatus;
  applicationDate: string;
  jobUrl: string | null;
  interviewDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationInput {
  companyName: string;
  jobTitle: string;
  status?: ApplicationStatus;
  applicationDate: string;
  jobUrl?: string | null;
  interviewDate?: string | null;
  notes?: string | null;
}