"use server";

import { getSessionData } from "@/utils/get-session";
import {
  StartFormCreationSchema,
  StartFormCreationSchemaType,
} from "@/app/(main)/_schemas";
import { prisma } from "@/lib/prisma";

export const startFormCreationHandler = async (
  values: StartFormCreationSchemaType,
) => {
  const validateFields = StartFormCreationSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }

  const { title, description } = validateFields.data;

  try {
    const { authenticatedUserId } = await getSessionData();

    // if user is not authenticated
    if (!authenticatedUserId) {
      return {
        error: "User not authenticated.",
      };
    }

    // start form creation
    const form = await prisma.form.create({
      data: {
        userId: authenticatedUserId,
        title: title,
        description: description,
      },
    });

    // if fails to create form
    if (!form) {
      return {
        error: "Failed to create form.",
      };
    }

    return {
      /*  formId: form.id,
      title: form.title,
      description: form.description, */
      success: "Form has been created successfully.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
