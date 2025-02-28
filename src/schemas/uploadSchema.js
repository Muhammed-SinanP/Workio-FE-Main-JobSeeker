import { z } from "zod";

const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const resumeSchema = z.object({
  resume: z
    .any()
    .refine((file) => file?.length > 0, "No file is selected.")
    .refine(
      (file) => file[0]?.size <= 5 * 1024 * 1024,
      "File size must be under 5MB.",
    )
    .refine(
      (file) => allowedMimeTypes.includes(file[0]?.type),
      "Only PDF and DOCX files are allowed.",
    ),
});
