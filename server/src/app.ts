import express from "express";
import cors from "cors";
import { applicationRouter } from "./routes/application.routes.js";

export const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Job Application Tracker API is running",
  });
});

app.use("/api/applications", applicationRouter);

app.use((
  _err: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  res.status(500).json({
    error: "Internal server error",
  });
});