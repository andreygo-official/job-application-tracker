import { Router } from "express";
import { z } from "zod";
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../repositories/application.repository.js";
import {
  createApplicationSchema,
  updateApplicationSchema,
  statusSchema,
} from "../schemas/application.schema.js";

export const applicationRouter = Router();

const idSchema = z.coerce.number().int().positive();

applicationRouter.get("/", (req, res) => {
  const parsed = z.object({
    status: statusSchema.optional(),
  }).safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid status filter" });
    return;
  }

  res.json(getApplications(parsed.data.status));
});

applicationRouter.get("/:id", (req, res) => {
  const id = idSchema.safeParse(req.params.id);

  if (!id.success) {
    res.status(400).json({ error: "Invalid application ID" });
    return;
  }

  const application = getApplication(id.data);

  if (!application) {
    res.status(404).json({ error: "Application not found" });
    return;
  }

  res.json(application);
});

applicationRouter.post("/", (req, res) => {
  const parsed = createApplicationSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Validation failed",
      details: z.flattenError(parsed.error),
    });
    return;
  }

  res.status(201).json(createApplication(parsed.data));
});

applicationRouter.patch("/:id", (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) {
    res.status(400).json({ error: "Invalid application ID" });
    return;
  }

  const parsed = updateApplicationSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Validation failed",
      details: z.flattenError(parsed.error),
    });
    return;
  }

  const application = updateApplication(id.data, parsed.data);

  if (!application) {
    res.status(404).json({ error: "Application not found" });
    return;
  }

  res.json(application);
});

applicationRouter.delete("/:id", (req, res) => {
  const id = idSchema.safeParse(req.params.id);

  if (!id.success) {
    res.status(400).json({ error: "Invalid application ID" });
    return;
  }

  if (!deleteApplication(id.data)) {
    res.status(404).json({ error: "Application not found" });
    return;
  }

  res.status(204).send();
});