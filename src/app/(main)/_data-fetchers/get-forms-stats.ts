import { getSessionData } from "@/utils/get-session";
import { prisma } from "@/lib/prisma";

export const fetchFormsStats = async () => {
  const { authenticatedUserId } = await getSessionData();

  // if user is not authenticated
  if (!authenticatedUserId) {
    throw new Error("User is not authenticated");
  }

  // stats
  const stats = await prisma.form.aggregate({
    where: {
      userId: authenticatedUserId,
    },
    _sum: {
      visitsCount: true,
      submissionsCount: true,
    },
  });

  // visits and submissions
  const visits = stats._sum.visitsCount || 0;
  const submissions = stats._sum.submissionsCount || 0;

  // submission rate
  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  // bounce rate
  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
};
