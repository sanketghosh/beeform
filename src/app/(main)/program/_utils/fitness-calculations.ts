import {
  weightLossFactors,
  activityMultipliers,
  bfpCategories,
  bmiCategories,
  cardioTips,
  idealWeightFactors,
  muscleGainTips,
} from "@/app/(main)/program/_data/recommendations.json";
import { workoutPlans } from "@/app/(main)/program/_data/workouts.json";
import {
  macronutrientProfiles,
  proteinPerKg,
} from "@/app/(main)/program/_data/diet-presets.json";

import { UserInformationSchemaType } from "../../provide-information/_schemas";

// Interfaces for our data structures (optional but good practice)
interface BMICategory {
  range: [number, number];
  label: string;
  recommendation: string;
}

interface BFPCategory {
  range: [number, number];
  label: string;
  enum: string; // Matches UserInformationSchema bodyFatCategory
}

interface WorkoutExercise {
  name: string;
  sets?: number | string;
  reps?: number | string;
  duration?: string;
  intensity?: string;
  notes?: string;
}

interface WorkoutDay {
  day: number | string; // e.g., 1, 2 or "Rest"
  focus: string;
  exercises?: WorkoutExercise[];
}

interface WorkoutPlan {
  [goal: string]: {
    [days: string]: WorkoutDay[]; // e.g., "3_DAYS"
  };
}

/**
 * Calculates Body Mass Index (BMI).
 */
export function calculateBMI(weight: number, height: number): number {
  if (height <= 0) return 0;
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
}

/**
 * Determines BMI Category based on BMI value.
 */
export function getBMICategory(bmi: number): BMICategory {
  // Find the category or use the last one as a fallback
  const foundCategory =
    bmiCategories.find((cat) => bmi >= cat.range[0] && bmi < cat.range[1]) ||
    bmiCategories[bmiCategories.length - 1];

  // Assert that the foundCategory object conforms to the BMICategory interface
  // This tells TypeScript to trust that 'range' will be [number, number] here
  return foundCategory as BMICategory;
}

/**
 * Calculates Body Fat Percentage (BFP) using the US Navy method (simplified).
 * NOTE: Accuracy for females is limited without hip measurement in the schema.
 * Returns calculated BFP or null if measurements are not applicable/provided.
 */
export function calculateBFP(input: UserInformationSchemaType): number | null {
  if (!input.usedMeasuringTape || !input.neck || !input.waist) {
    return null; // Cannot calculate without tape measurements
  }

  const { sex, height, neck, waist } = input;
  let bfp: number | null = null;

  try {
    if (sex === "Male") {
      // Formula: 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
      if (waist > neck && height > 0) {
        bfp =
          86.01 * Math.log10(waist - neck) -
          70.041 * Math.log10(height) +
          36.76;
      }
    } else {
      if (waist > neck && height > 0) {
        bfp =
          86.01 * Math.log10(waist - neck) -
          70.041 * Math.log10(height) +
          36.76 +
          10; // Arbitrary adjustment
      }

      bfp = null;
    }

    return bfp !== null && bfp > 0 ? parseFloat(bfp.toFixed(2)) : null;
  } catch (error) {
    console.error("Error calculating BFP:", error);
    return null;
  }
}

/**
 * Determines Body Fat Percentage Category based on BFP value and sex.
 */
export function getBFPCategory(
  bfp: number,
  sex: "Male" | "Female",
): BFPCategory | undefined {
  const categories = bfpCategories[sex];
  const foundCategory = categories.find(
    (cat) => bfp >= cat.range[0] && bfp < cat.range[1],
  );
  return foundCategory as BFPCategory | undefined;
}
/**
 * Derives approximate BFP range from the user-provided category enum.
 */
export function getBFPInfoFromCategory(
  categoryEnum: string,
  sex: "Male" | "Female",
): { label: string; range: [number, number] } {
  const category = bfpCategories[sex].find((cat) => cat.enum === categoryEnum);
  if (category) {
    // Assert the type of category.range here
    return { label: category.label, range: category.range as [number, number] };
  }
  return { label: categoryEnum.replace(/_/g, " "), range: [0, 0] };
}

/**
 * Calculates Basal Metabolic Rate (BMR) using Mifflin-St Jeor formula.
 */
export function calculateBMR(input: UserInformationSchemaType): number {
  const { weight, height, age, sex } = input;
  if (sex === "Male") {
    // (10 * weight kg) + (6.25 * height cm) - (5 * age years) + 5
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    // Female
    // (10 * weight kg) + (6.25 * height cm) - (5 * age years) - 161
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE).
 */
export function calculateTDEE(
  bmr: number,
  activityLevel: UserInformationSchemaType["activityLevel"],
): number {
  const multiplier = activityMultipliers[activityLevel] || 1.2; // Default to sedentary if invalid
  return Math.round(bmr * multiplier);
}

/**
 * Calculates adjusted daily calories based on fitness goal.
 */
export function calculateGoalCalories(
  tdee: number,
  goal: UserInformationSchemaType["fitnessGoal"],
): number {
  switch (goal) {
    case "BURN_FATS":
      return Math.round(tdee * 0.8); // 20% deficit (adjust as needed)
    case "BUILD_MUSCLE":
      return Math.round(tdee * 1.1); // 10% surplus (adjust as needed)
    case "CARDIOVASCULAR_HEALTH":
    default:
      return tdee; // Maintain
  }
}

/**
 * Calculates daily macronutrient targets in grams.
 */
export function calculateMacronutrients(
  calories: number,
  weight: number,
  goal: UserInformationSchemaType["fitnessGoal"],
): { protein: number; carbs: number; fat: number } {
  // 1. Protein (grams per kg of body weight)
  const proteinGramsPerKg = proteinPerKg[goal];
  const proteinGrams = Math.round(proteinGramsPerKg * weight);
  const proteinCalories = proteinGrams * 4;

  // 2. Fats (percentage of total calories)
  const fatPercentage = macronutrientProfiles[goal].fatRatio; // e.g., 0.25 for 25%
  const fatCalories = Math.round(calories * fatPercentage);
  const fatGrams = Math.round(fatCalories / 9);

  // 3. Carbohydrates (remaining calories)
  const carbCalories = calories - proteinCalories - fatCalories;
  const carbGrams = Math.round(carbCalories / 4);

  return {
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
  };
}

export function getWorkoutPlan(
  goal: UserInformationSchemaType["fitnessGoal"],
  days: UserInformationSchemaType["workoutDays"],
): WorkoutDay[] | null {
  // Explicitly type goalPlan based on the structure of workoutPlans
  const goalPlan: { [key: string]: WorkoutDay[] } | undefined =
    workoutPlans[goal];
  if (!goalPlan) return null;

  const availableDays = Object.keys(goalPlan)
    .map((d) => parseInt(d.split("_")[0]))
    .sort((a, b) => a - b);
  let bestMatchKey = `${days}_DAYS`;

  // Check if the key exists before potentially reassigning
  if (!(bestMatchKey in goalPlan) && availableDays.length > 0) {
    const closestDays = availableDays.reduce((prev, curr) =>
      Math.abs(curr - days) < Math.abs(prev - days) ? curr : prev,
    );
    bestMatchKey = `${closestDays}_DAYS`;
  }

  // Type assertion for the key access
  return goalPlan[bestMatchKey as keyof typeof goalPlan] || null;
}

/**
 * Calculates Ideal Body Weight range using a simple formula (e.g., Robinson).
 */
export function calculateIdealWeightRange(
  height: number,
  sex: "Male" | "Female",
): { min: number; max: number } {
  const heightInInches = height / 2.54;
  const heightAbove5FeetInInches = Math.max(0, heightInInches - 60); // 5 feet = 60 inches

  let baseWeightKg: number;
  let factorKgPerInch: number;

  if (sex === "Male") {
    baseWeightKg = idealWeightFactors.Male.baseKg;
    factorKgPerInch = idealWeightFactors.Male.kgPerInch;
  } else {
    baseWeightKg = idealWeightFactors.Female.baseKg;
    factorKgPerInch = idealWeightFactors.Female.kgPerInch;
  }

  const idealWeightKg =
    baseWeightKg + factorKgPerInch * heightAbove5FeetInInches;

  // Provide a range (e.g., +/- 10%)
  const minWeight = parseFloat((idealWeightKg * 0.9).toFixed(1));
  const maxWeight = parseFloat((idealWeightKg * 1.1).toFixed(1));

  return { min: minWeight, max: maxWeight };
}

/**
 * Gets relevant tips based on the goal.
 */
export function getGoalSpecificTips(
  goal: UserInformationSchemaType["fitnessGoal"],
): string[] {
  switch (goal) {
    case "BURN_FATS":
      return weightLossFactors;
    case "BUILD_MUSCLE":
      return muscleGainTips;
    case "CARDIOVASCULAR_HEALTH":
      return cardioTips;
    default:
      return [];
  }
}
