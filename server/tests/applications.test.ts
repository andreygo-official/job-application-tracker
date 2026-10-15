import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import db from "../src/db/database.js";

const validApplication = {
  companyName: "Google",
  jobTitle: "Software Engineer",
  applicationDate: "2026-10-15",
  status: "Applied",
};

beforeEach(() => {
  db.prepare("DELETE FROM applications").run();
});

describe("Job Applications API", () => {
  it("creates an application", async () => {
    const response = await request(app)
      .post("/api/applications")
      .send(validApplication);

    expect(response.status).toBe(201);
    expect(response.body.companyName).toBe("Google");
    expect(response.body.id).toBeDefined();
  });

  it("retrieves all applications", async () => {
    await request(app)
      .post("/api/applications")
      .send(validApplication);

    const response = await request(app)
      .get("/api/applications");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("retrieves an application by ID", async () => {
    const created = await request(app)
      .post("/api/applications")
      .send(validApplication);

    const response = await request(app)
      .get(`/api/applications/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.jobTitle).toBe("Software Engineer");
  });

  it("updates application status", async () => {
    const created = await request(app)
      .post("/api/applications")
      .send(validApplication);

    const response = await request(app)
      .patch(`/api/applications/${created.body.id}`)
      .send({ status: "Interview" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Interview");
  });

  it("filters applications by status", async () => {
    await request(app)
      .post("/api/applications")
      .send(validApplication);

    await request(app)
      .post("/api/applications")
      .send({
        ...validApplication,
        companyName: "Microsoft",
        status: "Rejected",
      });

    const response = await request(app)
      .get("/api/applications?status=Applied");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].companyName).toBe("Google");
  });

  it("deletes an application", async () => {
    const created = await request(app)
      .post("/api/applications")
      .send(validApplication);

    const response = await request(app)
      .delete(`/api/applications/${created.body.id}`);

    expect(response.status).toBe(204);

    const missing = await request(app)
      .get(`/api/applications/${created.body.id}`);

    expect(missing.status).toBe(404);
  });

  it("rejects invalid application data", async () => {
    const response = await request(app)
      .post("/api/applications")
      .send({
        companyName: "",
        jobTitle: "Developer",
      });

    expect(response.status).toBe(400);
  });

  it("rejects unsupported statuses", async () => {
    const response = await request(app)
      .post("/api/applications")
      .send({
        ...validApplication,
        status: "Unknown",
      });

    expect(response.status).toBe(400);
  });

  it("returns 404 for nonexistent applications", async () => {
    const response = await request(app)
      .get("/api/applications/999999");

    expect(response.status).toBe(404);
  });
});