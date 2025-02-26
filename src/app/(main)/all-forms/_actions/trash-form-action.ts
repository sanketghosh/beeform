"use server";

import { prisma } from "@/lib/prisma";
import { getSessionData } from "@/utils/get-session";

export const trashFormAction = async (formId: string) => {
  const { authenticatedUserId } = await getSessionData();

  // if form id is not provided
  if (!formId) {
    return {
      error: "Form is needed but not provided.",
    };
  }

  // if user is not authenticated
  if (!authenticatedUserId) {
    return {
      error: "User is not authenticated.",
    };
  }

  try {
    // find tne form
    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });

    // if form not found
    if (!form) {
      return {
        error: "Form has not been found.",
      };
    }

    // if found trash the form / send to trash
    const trashedForm = await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        isTrashed: true,
        trashedAt: new Date(),
      },
    });

    // if fails to send to trash
    if (!trashedForm) {
      return {
        error: "Failed to send the form to trash.",
      };
    }

    return {
      data: trashedForm,
      success: "Form has been sent to trash.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
