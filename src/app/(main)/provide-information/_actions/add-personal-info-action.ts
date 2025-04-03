"use server";

import { v4 as uniqueId } from "uuid";
import {
  UserInformationSchema,
  UserInformationSchemaType,
} from "@/app/(main)/provide-information/_schemas";
import { prisma } from "@/lib/prisma";
import { getSessionData } from "@/utils/get-session";

export const addPersonalInfoAction = async (
  values: UserInformationSchemaType,
) => {
  const validateFields = UserInformationSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }

  const {
    name,
    activityLevel,
    age,
    bodyFatCategory,
    fitnessGoal,
    height,
    neck,
    sex,
    usedMeasuringTape,
    waist,
    weight,
    workoutDays,
  } = validateFields.data;

  const { authenticatedUserId } = await getSessionData();

  try {
    /* console.log({
      activityLevel,
      age,
      bodyFatCategory,
      fitnessGoal,
      height,
      neck,
      sex,
      usedMeasuringTape,
      waist,
      weight,
      workoutDays,
    }); */

    const _data = await prisma.programInformation.create({
      data: {
        name,
        activityLevel,
        age,
        bodyFatCategory,
        fitnessGoal,
        height,
        neck,
        sex,
        usedMeasuringTape,
        waist,
        weight,
        workoutDays,
        uniqueUrlId: uniqueId(),
        userId: authenticatedUserId,
      },
    });

    return {
      success: "Data has been added to db now generating.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
