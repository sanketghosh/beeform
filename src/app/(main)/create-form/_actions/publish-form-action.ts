"use server";

// local modules
import { prisma } from "@/lib/prisma";
import { getSessionData } from "@/utils/get-session";
import {
  PublishFormSchema,
  PublishFormSchemaType,
} from "@/app/(main)/create-form/_schemas";

export const publishFormAction = async (values: PublishFormSchemaType) => {
  const validateFields = PublishFormSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }

  // extract the fields
  const { formId, submissionAccess } = validateFields.data;

  const { authenticatedUserId } = await getSessionData();

  // if user is not authenticated
  if (!authenticatedUserId) {
    return {
      error: "User is not authenticated.",
    };
  }

  try {
    const existingForm = await prisma.form.findFirst({
      where: {
        id: formId,
        userId: authenticatedUserId,
      },
    });

    // if form does not exist
    if (!existingForm) {
      return {
        error: "ERROR! Form not found or you do not have access to it.",
      };
    }

    // check if form content is empty
    if (
      !existingForm.content ||
      JSON.parse(existingForm.content).length === 0
    ) {
      return {
        error: "ERROR! Form content cannot be empty.",
      };
    }

    // publish the form
    const publishedForm = await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        published: true,
        submissionAccess: submissionAccess || "EVERYONE",
      },
    });

    if (!publishedForm) {
      return {
        error: "ERROR! Failed to publish the form.",
      };
    }

    return {
      data: publishedForm,
      success: "Form has been published.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
