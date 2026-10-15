import type {
    JobApplication,
    ApplicationInput,
    ApplicationStatus,
  } from "../types/application";
  
  const API_URL = import.meta.env.VITE_API_URL;
  
  async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  
    if (!response.ok) {
      let message = "Something went wrong";
  
      try {
        const error = await response.json();
        message = error.error || message;
      } catch {
        // The server returned a non-JSON response.
      }
  
      throw new Error(message);
    }
  
    if (response.status === 204) {
      return undefined as T;
    }
  
    return response.json();
  }
  
  export const applicationApi = {
    getAll: (status?: ApplicationStatus) => {
      const query = status
        ? `?status=${encodeURIComponent(status)}`
        : "";
  
      return apiRequest<JobApplication[]>(
        `/api/applications${query}`
      );
    },
  
    getById: (id: number) =>
      apiRequest<JobApplication>(`/api/applications/${id}`),
  
    create: (data: ApplicationInput) =>
      apiRequest<JobApplication>("/api/applications", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  
    update: (id: number, data: Partial<ApplicationInput>) =>
      apiRequest<JobApplication>(`/api/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  
    delete: (id: number) =>
      apiRequest<void>(`/api/applications/${id}`, {
        method: "DELETE",
      }),
  };