// packages
import { z } from "zod";

// local modules
import { MetricsValueNamesTypes } from "@/app/(main)/provide-information/_types";
import { UserInformationSchema } from "@/app/(main)/provide-information/_schemas";

const getMinMax = (schema: z.ZodNumber) => {
  const def = schema._def;
  return {
    min: def.checks.find((check) => check.kind === "min")?.value ?? 0,
    max: def.checks.find((check) => check.kind === "max")?.value ?? Infinity,
  };
};

export const metricsLimits = Object.fromEntries(
  Object.entries(UserInformationSchema.shape).map(([key, schema]) => {
    if (schema instanceof z.ZodNumber) {
      return [key, getMinMax(schema)];
    }
    return [
      key,
      {
        min: 0,
        max: Infinity,
      },
    ];
  }),
) as Record<MetricsValueNamesTypes, { min: number; max: number }>;
