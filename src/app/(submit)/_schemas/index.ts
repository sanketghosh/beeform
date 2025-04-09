import { $Enums } from "@prisma/client";
import { z } from "zod";

export const FormSubmitActionSchema = z.object({
  shareURL: z.string(),
  content: z.string(),
  device: z.string().optional(),
  formSubmissionAccess: z.nativeEnum($Enums.SubmissionAccess),
});

export type FormSubmitActionSchemaType = z.infer<typeof FormSubmitActionSchema>;
