import { z } from "zod";

export const jobSearchSchema = z.object({
  jobTitle: z
    .string()
    .min(1, "Job title is required!"),
  jobLocation: z.string(),
  jobExperience: z.string(),
});
