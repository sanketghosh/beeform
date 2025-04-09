import { getSessionData } from "@/utils/get-session";
import { prisma } from "@/lib/prisma";

export const getFormWithSubmissions = async (formId: string) => {
  const { authenticatedUserId } = await getSessionData();

  // if in case user is not authenticated
  if (!authenticatedUserId) {
    throw new Error("User is not authenticated.");
  }

  if (!formId) {
    throw new Error("Form ID is not provided.");
  }

  const formWithSubmissions = await prisma.form.findUnique({
    where: {
      id: formId,
      userId: authenticatedUserId,
    },
    include: {
      formSubmissions: true,
    },
  });

  return {
    formWithSubmissions,
  };
};
