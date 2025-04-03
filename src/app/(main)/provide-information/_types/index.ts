import { UserInformationSchemaType } from "../_schemas";

export type BodyFatItemType = {
  label: UserInformationSchemaType["bodyFatCategory"];
  bodyFat: string;
};

export type FItnessGoalItemType = {
  label: UserInformationSchemaType["fitnessGoal"];
  details: string;
};

export type ActivityLevelItemType = {
  label: UserInformationSchemaType["activityLevel"];
  details: string;
};

export type MetricsValueNamesTypes =
  | "age"
  | "height"
  | "weight"
  | "neck"
  | "waist"
  | "workoutDays";

export type HandleMetricsValueSliderType = {
  name: MetricsValueNamesTypes;
  value: number[];
};

export type HandleMetricsDataType = {
  name: MetricsValueNamesTypes;
  valueProp: number;
};
