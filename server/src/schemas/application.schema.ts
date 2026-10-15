import { z } from "zod";

const dateSchema = z.iso.date();

const optionalNullable = <T extends z.ZodTypeAny>(schema: T) =>
  schema.nullable().optional();

export const statusSchema = z.enum([
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
]);

export const createApplicationSchema = z.object({
  companyName: z.string().trim().min(1).max(100),
  jobTitle: z.string().trim().min(1).max(150),
  status: statusSchema.default("Applied"),
  applicationDate: dateSchema,
  jobUrl: optionalNullable(z.url().refine(
    (url) => ["http:", "https:"].includes(new URL(url).protocol),
    "Only HTTP and HTTPS URLs are allowed"
  )),
  interviewDate: optionalNullable(dateSchema),
  notes: optionalNullable(z.string().max(2000)),
}).strict();

export const updateApplicationSchema =
  createApplicationSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided"
  );

export type CreateApplication = z.infer<
  typeof createApplicationSchema
>;