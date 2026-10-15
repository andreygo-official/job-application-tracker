import express from "express";
import cors from "cors";

export const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Job Application Tracker API is running"
  });
});