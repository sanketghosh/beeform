// components/FitnessProgramDisplay.tsx

// /types/fitness.ts (or adjust path as needed)

export interface WorkoutExercise {
  name: string;
  sets?: number | string;
  reps?: number | string;
  duration?: string;
  intensity?: string;
  notes?: string;
}

export interface WorkoutDay {
  day: number | string;
  focus: string;
  exercises: WorkoutExercise[]; // Ensure this is not optional based on previous fix
}

export interface GeneratedProgram {
  userName: string;
  weightAssessment: {
    bmi: number;
    category: string;
    recommendation: string;
  };
  bodyCompositionAnalysis: {
    method: string;
    bodyFatPercentage: number | null;
    category: string;
    categoryEnum: string; // Keep if needed, maybe not for display
    range: [number, number];
    note?: string;
  };
  totalWeightRecommendation: string;
  bodyCompositionRecommendation: string;
  goalSpecificFactors: string[];
  dietPlan: {
    estimatedTDEE: number;
    targetDailyCalories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    notes: string[];
  };
  workoutPlan: {
    planFocus: string;
    schedule: WorkoutDay[] | null; // Allow null just in case API returns it
    note?: string;
  };
}

import React from "react";
/* import { GeneratedProgram, WorkoutDay, WorkoutExercise } from "@/types/fitness"; // Adjust path if needed
 */
interface Props {
  programData: GeneratedProgram | null;
}

const FitnessProgramDisplay: React.FC<Props> = ({ programData }) => {
  if (!programData) {
    // Optional: Show a loading state or message if data isn't ready
    return <div className="p-4 text-center">Loading program data...</div>;
  }

  const {
    userName,
    weightAssessment,
    bodyCompositionAnalysis,
    totalWeightRecommendation,
    bodyCompositionRecommendation,
    goalSpecificFactors,
    dietPlan,
    workoutPlan,
  } = programData;

  // Helper function to format exercise details
  const formatExerciseDetails = (ex: WorkoutExercise): string => {
    let details = "";
    if (ex.sets && ex.reps) {
      details += `Sets: ${ex.sets}, Reps: ${ex.reps}`;
    } else if (ex.duration) {
      details += `Duration: ${ex.duration}`;
      if (ex.intensity) {
        details += `, Intensity: ${ex.intensity}`;
      }
    }
    if (ex.notes) {
      details += ` (${ex.notes})`;
    }
    return details || "No specific details";
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-lg bg-gray-50 p-4 shadow-md md:p-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-indigo-700">
        Your FitFusion Program, {userName}!
      </h1>

      {/* --- Assessments Section --- */}
      <section className="space-y-4 rounded-md bg-white p-4 shadow">
        <h2 className="border-b pb-2 text-xl font-semibold text-gray-800">
          Assessments
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Weight Assessment */}
          <div className="rounded border p-3">
            <h3 className="text-lg font-medium text-indigo-600">
              Weight Assessment
            </h3>
            <p>
              <span className="font-semibold">BMI:</span> {weightAssessment.bmi}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {weightAssessment.category}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {weightAssessment.recommendation}
            </p>
          </div>
          {/* Body Composition */}
          <div className="rounded border p-3">
            <h3 className="text-lg font-medium text-indigo-600">
              Body Composition
            </h3>
            <p>
              <span className="font-semibold">Method:</span>{" "}
              {bodyCompositionAnalysis.method}
            </p>
            {bodyCompositionAnalysis.bodyFatPercentage !== null && (
              <p>
                <span className="font-semibold">Body Fat %:</span>{" "}
                {bodyCompositionAnalysis.bodyFatPercentage.toFixed(1)}%
              </p>
            )}
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {bodyCompositionAnalysis.category} (
              {bodyCompositionAnalysis.range[0]}% -{" "}
              {bodyCompositionAnalysis.range[1]}%)
            </p>
            {bodyCompositionAnalysis.note && (
              <p className="mt-1 text-xs italic text-red-600">
                {bodyCompositionAnalysis.note}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* --- Recommendations Section --- */}
      <section className="space-y-4 rounded-md bg-white p-4 shadow">
        <h2 className="border-b pb-2 text-xl font-semibold text-gray-800">
          Recommendations
        </h2>
        <div className="mb-3 rounded border p-3">
          <h3 className="text-lg font-medium text-indigo-600">
            Weight & Body Composition
          </h3>
          <p className="text-sm">{totalWeightRecommendation}</p>
          <p className="mt-1 text-sm">{bodyCompositionRecommendation}</p>
        </div>
        <div className="rounded border p-3">
          <h3 className="text-lg font-medium text-indigo-600">
            Tips for Your Goal ({programData.fitnessGoal.replace(/_/g, " ")})
          </h3>
          <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-gray-700">
            {goalSpecificFactors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Diet Plan Section --- */}
      <section className="space-y-3 rounded-md bg-white p-4 shadow">
        <h2 className="border-b pb-2 text-xl font-semibold text-gray-800">
          Diet Plan
        </h2>
        <p className="text-sm">
          <span className="font-semibold">
            Estimated Maintenance Calories (TDEE):
          </span>{" "}
          {dietPlan.estimatedTDEE} kcal
        </p>
        <p className="text-sm">
          <span className="font-semibold">Target Daily Calories:</span>{" "}
          {dietPlan.targetDailyCalories} kcal
        </p>
        <div className="grid grid-cols-1 gap-3 pt-2 text-center sm:grid-cols-3">
          <div className="rounded bg-blue-100 p-2">
            <p className="font-semibold text-blue-800">Protein</p>
            <p>{dietPlan.proteinGrams}g</p>
          </div>
          <div className="rounded bg-green-100 p-2">
            <p className="font-semibold text-green-800">Carbohydrates</p>
            <p>{dietPlan.carbsGrams}g</p>
          </div>
          <div className="rounded bg-yellow-100 p-2">
            <p className="font-semibold text-yellow-800">Fats</p>
            <p>{dietPlan.fatGrams}g</p>
          </div>
        </div>
        {dietPlan.notes && dietPlan.notes.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-600">Notes:</h4>
            <ul className="list-inside list-disc space-y-1 text-xs text-gray-500">
              {dietPlan.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* --- Workout Plan Section --- */}
      <section className="space-y-4 rounded-md bg-white p-4 shadow">
        <h2 className="border-b pb-2 text-xl font-semibold text-gray-800">
          Workout Plan
        </h2>
        <h3 className="text-center text-lg font-medium text-indigo-600">
          {workoutPlan.planFocus}
        </h3>
        {workoutPlan.note && (
          <p className="mt-1 text-center text-xs italic text-red-600">
            {workoutPlan.note}
          </p>
        )}

        <div className="space-y-4">
          {workoutPlan.schedule && workoutPlan.schedule.length > 0 ? (
            workoutPlan.schedule.map((day, index) => (
              <div
                key={index}
                className="rounded border border-gray-200 bg-gray-50 p-3"
              >
                <h4 className="text-md font-semibold text-gray-700">
                  {typeof day.day === "number" ? `Day ${day.day}` : day.day} -{" "}
                  {day.focus}
                </h4>
                {day.exercises && day.exercises.length > 0 ? (
                  <ul className="mt-2 space-y-1 pl-4">
                    {day.exercises.map((exercise, exIndex) => (
                      <li key={exIndex} className="text-sm">
                        <span className="font-medium">{exercise.name}:</span>{" "}
                        <span className="text-gray-600">
                          {formatExerciseDetails(exercise)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 pl-4 text-sm italic text-gray-500">
                    Rest or light activity as prescribed.
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No workout schedule found for this plan.
            </p>
          )}
        </div>
      </section>

      <footer className="pt-4 text-center text-xs text-gray-400">
        Generated by FitFusion | {new Date().toLocaleDateString()} | Remember to
        consult a healthcare professional before starting any new fitness or
        diet program.
      </footer>
    </div>
  );
};

export default FitnessProgramDisplay;
