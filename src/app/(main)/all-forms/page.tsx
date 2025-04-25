// packages
import { Metadata } from "next";

// local modules
import { getAllForms } from "@/app/(main)/_data-fetchers/get-all-forms";

// components
import FormsList from "@/app/(main)/all-forms/_components/forms-list";
import FormCreateDialog from "@/app/(main)/_components/dialogs/form-create-dialog";

export const metadata: Metadata = {
  title: "All Forms",
  description:
    "Your all forms are listed here, you can filter according to your needs.",
};

export default async function AllFormsPage() {
  const { forms } = await getAllForms("latest");

  return (
    <div>
      <FormCreateDialog />
      <FormsList forms={forms} />
    </div>
  );
}
