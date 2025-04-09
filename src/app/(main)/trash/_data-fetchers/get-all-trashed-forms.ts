import { prisma } from "@/lib/prisma";
import { getSessionData } from "@/utils/get-session";

export const getAllTrashedForms = async (authenticatedUserId: string) => {
  if (!authenticatedUserId) {
    throw new Error("User is not found or you might not be authenticated.");
  }

  // trashed forms
  const trashedForms = await prisma.form.findMany({
    where: {
      userId: authenticatedUserId,
      isTrashed: true,
    },
  });

  // if trashed forms are not found
  if (!trashedForms) {
    throw new Error("Trashed forms are not found.");
  }

  return {
    trashedForms,
  };
};
