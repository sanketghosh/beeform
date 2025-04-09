import { prisma } from "@/lib/prisma";

export async function getDailyStats(userId: string) {
  /*  const userForms = await prisma.form.findMany({
    where: { userId: userId },
    select: { id: true }, // Only fetch IDs
  });

  const userFormIds = userForms.map((form) => form.id); */

  const dailyStats = await prisma.formDailyStats.groupBy({
    by: ["date"],
    _sum: {
      visitsCount: true,
      submissions: true,
    },
    _avg: {
      responsePercentage: true,
      bounceRate: true,
    },
    where: {
      form: {
        userId: userId,
      },
    },
    orderBy: {
      date: "asc", // Sort by date ascending
    },
  });

  const chartData = dailyStats.map((stat) => {
    const visits = stat._sum.visitsCount || 0;
    const submissions = stat._sum.submissions || 0;
    const responsePercentage = visits ? (submissions / visits) * 100 : 0;
    const bounceRate = 100 - responsePercentage;

    return {
      date: new Date(stat.date).toLocaleDateString(),
      visits,
      submissions,
      responsePercentage,
      bounceRate,
    };
  });

  return { chartData };
}
