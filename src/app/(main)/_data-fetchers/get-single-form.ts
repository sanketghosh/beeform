// local modules
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

  // calculate the stats for a specific form
  const stats = await prisma.form.aggregate({
    where: {
      id: formId,
      userId: authenticatedUserId,
    },
    _sum: {
      visitsCount: true,
      submissionsCount: true,
    },
  });

  // extract and calculate stats
  const visits = stats._sum.visitsCount || 0;
  const submissions = stats._sum.submissionsCount || 0;
  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;

  const statsData = {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };

  return {
    form,
    statsData,
  };
};
