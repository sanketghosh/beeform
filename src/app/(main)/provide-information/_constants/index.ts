import {
  ActivityLevelItemType,
  BodyFatItemType,
  FItnessGoalItemType,
} from "@/app/(main)/provide-information/_types";

export const BodyFatCategory: BodyFatItemType[] = [
  {
    label: "ULTRA_LEAN",
    bodyFat: "1% - 5% body fat",
  },
  {
    label: "VERY_LEAN",
    bodyFat: "6% - 10% body fat",
  },
  {
    label: "LEAN",
    bodyFat: "11% - 15% body fat",
  },
  {
    label: "MODERATELY_LEAN",
    bodyFat: "16% - 20% body fat",
  },
  {
    label: "HEALTHY",
    bodyFat: "21% - 25% body fat",
  },
  {
    label: "MODERATELY_OVERWEIGHT",
    bodyFat: "26% - 30% body fat",
  },
  {
    label: "OVERWEIGHT",
    bodyFat: "31% - 35% body fat",
  },
  {
    label: "OBESE",
    bodyFat: "36% - 40% body fat",
  },
  {
    label: "EXTREMELY_OBESE",
    bodyFat: "41% and above body fat",
  },
];

export const FitnessGoalCategory: FItnessGoalItemType[] = [
  {
    label: "BURN_FATS",
    details: "Burn fats and loose weight.",
  },
  {
    label: "CARDIOVASCULAR_HEALTH",
    details: "Better heart health and blood vessels.",
  },
  {
    label: "BUILD_MUSCLE",
    details: "Burn fats and gain muscle.",
  },
];

export const ActivityLevelCategory: ActivityLevelItemType[] = [
  {
    label: "ZERO_MOVEMENTS",
    details: "I spend almost all day on my desk.",
  },
  {
    label: "FEW_MOVEMENTS",
    details: "I take a break from time to time to do physical movements.",
  },
  {
    label: "MODERATELY_ACTIVE",
    details:
      "I spend an average of 60 minutes a day doing physical activities.",
  },
  {
    label: "VERY_ACTIVE",
    details: "I spend a big amount of time doing physical activities.",
  },
];
