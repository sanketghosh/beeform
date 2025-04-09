// local modules
import { SortOrderType } from "@/types";
import { getSessionData } from "@/utils/get-session";
import { prisma } from "@/lib/prisma";

export const getAllForms = async (sort: SortOrderType) => {
  const { authenticatedUserId } = await getSessionData();

  if (!authenticatedUserId) {
    throw new Response("User not authenticated.");
  }

  const forms = await prisma.form.findMany({
    where: {
      userId: authenticatedUserId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      visitsCount: true,
      submissionsCount: true,
      isTrashed: true,
      content: true,
      dailyStats: true,
      formSubmissions: true,
      shareURL: true,
      submissionAccess: true,
      trashedAt: true,
      user: true,
      userId: true,
    },
    orderBy: {
      createdAt: sort === "latest" ? "desc" : "asc",
    },
  });

  return {
    forms,
  };
};
