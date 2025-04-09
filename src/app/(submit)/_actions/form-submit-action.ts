"use server";

// local modules
import { prisma } from "@/lib/prisma";
import { getSessionData } from "@/utils/get-session";
import {
  FormSubmitActionSchema,
  FormSubmitActionSchemaType,
} from "@/app/(submit)/_schemas";

export const formSubmitAction = async (values: FormSubmitActionSchemaType) => {
  const validateFields = FormSubmitActionSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }

  const { shareURL, formSubmissionAccess, content, device } =
    validateFields.data;

  const { authenticatedUserId } = await getSessionData();

  // if by chance user is not authenticated
  if (formSubmissionAccess === "AUTHENTICATED") {
    if (!authenticatedUserId) {
      return {
        error: "User is not authenticated.",
      };
    }
  }

  const location = await fetch(`http://ip-api.com/json`);
  const { city, country, timezone } = await location.json();

  let extractContinent = timezone.split("/");
  const continent = extractContinent.length > 1 ? extractContinent[0] : null;

  try {
    // find the form
    const form = await prisma.form.findUnique({
      where: {
        shareURL: shareURL,
        published: true,
      },
    });

    // if form is not found or published
    if (!form || !form.published) {
      return {
        error: "Form has not been found.",
      };
    }

    // enforce submission access rules based on the form's submissionAccess
    if (formSubmissionAccess === "AUTHENTICATED" && !authenticatedUserId) {
      return {
        error: "Only authenticated users can submit this form.",
      };
    }

    // checking if the authenticated user has already submitted the form
    if (authenticatedUserId) {
      const existingSubmissionByUser = await prisma.formSubmission.findFirst({
        where: {
          formId: form.id,
          userId: authenticatedUserId,
        },
      });

      // if a submission exists, prevent duplicate submission
      if (existingSubmissionByUser) {
        return {
          error: "You already have submitted this form.",
        };
      }
    }

    // today
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const submission = await prisma.$transaction(async (tx) => {
      // save the form submission
      const newSubmission = await tx.formSubmission.create({
        data: {
          formId: form.id,
          userId: authenticatedUserId || null,
          content: content!,
          city: city || null,
          country: country || null,
          continent: continent || null,
          device: device || null,
        },
      });

      // if not submitted
      if (!newSubmission) {
        return {
          error: "ERROR! Failed to submit the form.",
        };
      }

      // increment cumulative submission count in form
      await tx.form.update({
        where: {
          id: form.id,
        },
        data: {
          submissionsCount: {
            increment: 1,
          },
        },
      });

      // update form daily stats
      const dailyStats = await tx.formDailyStats.upsert({
        where: {
          formId_date: {
            formId: form.id,
            date: todayStart,
          },
        },
        create: {
          formId: form.id,
          date: todayStart,
          submissions: 1,
          cities: city ? { [city]: 1 } : {},
          countries: country ? { [country]: 1 } : {},
          continents: continent ? { [continent]: 1 } : {},
          devices: device ? { [device]: 1 } : {},
        },
        update: {
          submissions: { increment: 1 },
          cities: city
            ? {
                increment: {
                  [city]: 1,
                },
              }
            : undefined,
          countries: country
            ? {
                increment: {
                  [country]: 1,
                },
              }
            : undefined,
          continents: continent
            ? {
                increment: {
                  [continent]: 1,
                },
              }
            : undefined,
          devices: device
            ? {
                increment: {
                  [device]: 1,
                },
              }
            : undefined,
        },
      });

      if (!dailyStats) {
        return {
          error: "Failed to update daily stats.",
        };
      }
      return newSubmission;
    });

    if (!submission) {
      return {
        error: "Failed to submit the form.",
      };
    }

    return {
      success: "Form submitted successfully.",
      data: submission,
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
