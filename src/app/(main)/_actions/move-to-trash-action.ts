"use server";

import { getSessionData } from "@/utils/get-session";
import { prisma } from "@/lib/prisma";

export const moveToTrashAction = async (formId: string) => {
  const { authenticatedUserId } = await getSessionData();

  // if user is not authenticated
  if (!authenticatedUserId) {
    return {
      error: "User is not authenticated.",
    };
  }
  try {
    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });

    // if form is not found
    if (!form) {
      return {
        error: "Form has not been not found.",
      };
    }

    const trashedForm = await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        isTrashed: true,
        trashedAt: new Date(),
      },
    });

    if (!trashedForm) {
      return {
        error: "",
      };
    }

    return {
      success: "Form has been trashed.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
