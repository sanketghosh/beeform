import { $Enums } from "@prisma/client";
import { z } from "zod";

// publish form schema
export const PublishFormSchema = z.object({
  formId: z.string().cuid(),
  submissionAccess: z.nativeEnum($Enums.SubmissionAccess),
});

export type PublishFormSchemaType = z.infer<typeof PublishFormSchema>;

// save form schema
export const SaveFormSchema = z.object({
  formId: z.string().cuid(),
  formContent: z.string(),
});

export type SaveFormSchemaType = z.infer<typeof SaveFormSchema>;
