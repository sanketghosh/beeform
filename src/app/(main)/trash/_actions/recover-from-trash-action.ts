"use server";

import { getSessionData } from "@/utils/get-session";
import { prisma } from "@/lib/prisma";

export default async function recoverFromTrashAction(formId: string) {
  const { authenticatedUserId } = await getSessionData();

  // if form id is not given
  if (!formId) {
    return {
      error: "Form Id not found",
    };
  }

  // if user not authenticated
  if (!authenticatedUserId) {
    return {
      error: "User is not authenticated.",
    };
  }

  try {
    // find the form
    const form = await prisma.form.findUnique({
      where: {
        id: formId,
        userId: authenticatedUserId,
      },
    });

    // if form not found
    if (!form) {
      return {
        error: "Form has not been found.",
      };
    }

    // if form is not trashed
    if (!form.isTrashed) {
      return {
        error: "Form is not in trash",
      };
    }

    // recover form
    const recoverForm = await prisma.form.update({
      where: {
        id: formId,
        userId: authenticatedUserId,
      },
      data: {
        isTrashed: false,
        trashedAt: null,
      },
    });

    // if fails to recover form
    if (!recoverForm) {
      return {
        error: "Failed to recover form.",
      };
    }

    return {
      success: "Form has been recovered.",
      data: recoverForm,
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
