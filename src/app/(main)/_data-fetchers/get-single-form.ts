import { getSessionData } from "@/utils/get-session";
import { prisma } from "@/lib/prisma";

export const getSingleForm = async (formId: string) => {
  const { authenticatedUserId } = await getSessionData();

  if (!authenticatedUserId) {
    throw new Error("User is not authenticated.");
  }

  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      userId: authenticatedUserId,
    },
    select: {
      id: true,
      user: true,
      userId: true,
      title: true,
      description: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      visitsCount: true,
      submissionsCount: true,
      content: true,
      shareURL: true,
      dailyStats: true,
      isTrashed: true,
      submissionAccess: true,
      trashedAt: true,
      formSubmissions: true,
    },
  });

  return {
    form,
  };
};
