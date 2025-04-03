import { z } from "zod";

export const UserInformationSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name of the user for whom we are generating program is needed.",
    })
    .max(100, {
      message: "Maximum 100 characters allowed.",
    }),
  age: z
    .number()
    .min(10, { message: "Must be at least 10 years old" })
    .max(100, {
      message: "Maximum 100 years of age allowed.",
    }),
  sex: z.enum(["Male", "Female"], {
    message: "Invalid sex preference.",
  }),
  height: z
    .number()
    .min(70, {
      message: "Height must be 70cm at least",
    })
    .max(400, { message: "Max height cannot be more than 400cm." }),
  weight: z.number().min(15, { message: "Must be at least 15 kg" }).max(700, {
    message: "Maximum 700 Kgs allowed",
  }),
  usedMeasuringTape: z.boolean().default(false),
  neck: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number()
      .min(10, {
        message: "At least 10cm of neck size is required.",
      })
      .max(100, {
        message: "Cannot be more than 100cm",
      }),
  ),
  waist: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number()
      .min(30, {
        message: "Waist have to be at least 30cm.",
      })
      .max(350, {
        message: "Waist size cannot be more than 350cm",
      }),
  ),
  bodyFatCategory: z.enum(
    [
      "ULTRA_LEAN",
      "VERY_LEAN",
      "LEAN",
      "MODERATELY_LEAN",
      "HEALTHY",
      "MODERATELY_OVERWEIGHT",
      "OVERWEIGHT",
      "OBESE",
      "EXTREMELY_OBESE",
    ],
    {
      message: "Invalid body fat category.",
    },
  ),
  fitnessGoal: z.enum(["BURN_FATS", "CARDIOVASCULAR_HEALTH", "BUILD_MUSCLE"], {
    message: "Invalid fitness goal argument.",
  }),
  workoutDays: z
    .number()
    .min(1, {
      message: "At least one day workout is required.",
    })
    .max(7, {
      message: "There is only 7 days a week.",
    }),
  activityLevel: z.enum(
    ["ZERO_MOVEMENTS", "FEW_MOVEMENTS", "MODERATELY_ACTIVE", "VERY_ACTIVE"],
    {
      message: "Activity level is not valid.",
    },
  ),
});

export type UserInformationSchemaType = z.infer<typeof UserInformationSchema>;
