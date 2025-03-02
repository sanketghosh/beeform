import FormCard from "../_components/cards/form-card";
import FormCreateDialog from "../_components/dialogs/form-create-dialog";
import { getAllForms } from "../_data-fetchers/get-all-forms";
import FormsFilter from "./_components/forms-filter";
import FormsList from "./_components/forms-list";

export default async function AllFormsPage() {
  const { forms } = await getAllForms("latest");

  return (
    <div>
      <FormCreateDialog />
      <FormsList forms={forms} />
    </div>
  );
}
