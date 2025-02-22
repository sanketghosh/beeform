"use server";

import { prisma } from "@/lib/prisma";
import { getSessionData } from "@/utils/get-session";
import {
  SaveFormSchema,
  SaveFormSchemaType,
} from "@/app/(main)/create-form/_schemas";

export const saveFormAction = async (values: SaveFormSchemaType) => {
  // console.log(values);

  const validateFields = SaveFormSchema.safeParse(values);

  // if fields are not validated
  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }

  // extract the fields
  const { formContent, formId } = validateFields.data;

  const { authenticatedUserId } = await getSessionData();

  // if user is not authenticated
  if (!authenticatedUserId) {
    return {
      error: "User is not authenticated.",
    };
  }

  try {
    // fetch the form to ensure it exists and belongs to the user
    const existingForm = await prisma.form.findFirst({
      where: {
        id: formId,
        userId: authenticatedUserId,
      },
    });

    // if form does not exist and / or not have any access
    if (!existingForm) {
      return {
        error: "Form not found or you do not have access to it.",
      };
    }

    // if form content is missing
    if (!formContent) {
      return {
        error: "Form content is invalid or missing",
      };
    }

    console.log("@@@RECEIVED ->> FORM CONTENT: ", formContent);

    // update the form with new data
    const updateForm = await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        ...(formContent && {
          content: formContent,
        }),
      },
    });

    // if fails to update form
    if (!updateForm) {
      return {
        error: "Failed to update the form.",
      };
    }

    return {
      success: "Form updated successfully.",
      data: updateForm,
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
