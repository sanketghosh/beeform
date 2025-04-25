import FormBuilder from "@/app/(main)/create-form/_components/form-builder/form-builder";
import { getSingleForm } from "@/app/(main)/_data-fetchers/get-single-form";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CreateForm({ params }: PageProps) {
  const { slug } = await params;

  console.log("@@@DEBUGGING ->> SLUG OF **/create-form/[slug]** :::", slug);

  const { form } = await getSingleForm(slug);

  // console.log(form);

  return (
    <div className="h-full">
      <FormBuilder formData={form} />
    </div>
  );
}
