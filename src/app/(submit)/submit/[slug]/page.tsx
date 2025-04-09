// components
import SubmitFormBody from "@/app/(submit)/_components/submit-form-body";

// local modules
import { getFormDataByShareUrl } from "@/app/(submit)/_data-fetchers/get-form-data-by-share-url";
import { getSessionData } from "@/utils/get-session";

type SubmitFormProps = {
  params: {
    slug: string;
  };
};

export default async function SubmitFormPage({ params }: SubmitFormProps) {
  const { slug } = await params;
  const { form } = await getFormDataByShareUrl(slug);
  const { authenticatedUserId } = await getSessionData();
  //   console.log(slug);
  return (
    <div>
      <SubmitFormBody form={form} userId={authenticatedUserId!} />
    </div>
  );
}
