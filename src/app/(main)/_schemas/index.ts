import { z } from "zod";

// start form creation
export const StartFormCreationSchema = z.object({
  title: z
    .string()
    .min(6, { message: "Minimum six characters are needed" })
    .max(100, {
      message: "Maximum 100 characters are allowed",
    }),
  description: z
    .string()
    .max(500, { message: "Maximum 500 characters are allowed." }),
});

export type StartFormCreationSchemaType = z.infer<
  typeof StartFormCreationSchema
>;
