"use server";

import { getSessionData } from "@/utils/get-session";
import { prisma } from "@/lib/prisma";

export default async function deleteFormPermanentlyAction(formId: string) {
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
        error: "Form is not in trash and cannot be deleted.",
      };
    }

    // recover form
    const deleteForm = await prisma.form.delete({
      where: {
        id: formId,
        userId: authenticatedUserId,
      },
    });

    // if fails to recover form
    if (!deleteForm) {
      return {
        error: "Failed to delete form permanently.",
      };
    }

    return {
      success: "Form has been deleted permanently.",
      data: deleteForm,
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
