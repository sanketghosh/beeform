import { prisma } from "@/lib/prisma";

export const getFormDataByShareUrl = async (shareURL: string) => {
  // if no share url is not found
  if (!shareURL) {
    throw new Error("ERROR! Share URL is not found.");
  }

  // find the form using the unique shareURL
  const form = await prisma.form.findUnique({
    where: {
      shareURL: shareURL,
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

  // if form is not found
  if (!form) {
    throw new Error("ERROR!  Form not found with the provided Share URL.");
  }

  // today's date
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  // start a transaction to update visitsCount in both form and FormDailyStats
  await prisma.$transaction(async (tx) => {
    // increment visitsCount in the form model
    await tx.form.update({
      where: {
        id: form.id,
      },
      data: {
        visitsCount: {
          increment: 1,
        },
      },
    });

    // increment visitsCount in the formDailyStats
    await tx.formDailyStats.upsert({
      where: {
        formId_date: {
          formId: form.id,
          date: todayStart,
        },
      },
      create: {
        formId: form.id,
        date: todayStart,
        visitsCount: 1,
        cities: {},
        countries: {},
        continents: {},
        devices: {},
      },
      update: {
        visitsCount: {
          increment: 1,
        },
      },
    });
  });

  return { form };
};
