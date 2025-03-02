// packages
import { Form } from "@prisma/client";
import { AlertTriangleIcon } from "lucide-react";

// local modules
import { getSessionData } from "@/utils/get-session";
import { getAllTrashedForms } from "@/app/(main)/trash/_data-fetchers/get-all-trashed-forms";

// components
import FormCard from "@/app/(main)/_components/cards/form-card";

export default async function TrashPage() {
  const { authenticatedUserId } = await getSessionData();
  const { trashedForms } = await getAllTrashedForms(authenticatedUserId!);

  return (
    <div className="space-y-6">
      {/* <div className="flex w-full items-center gap-3 rounded-md border-2 border-red-700 bg-red-500/50 px-3 py-2 lg:w-fit">
        <AlertTriangleIcon size={25} />
        <p className="text-base font-medium text-destructive-foreground lg:text-lg">
          Form will be permanently deleted from trash after 2 mins of moving the
          form into trash.
        </p>
      </div> */}
      {trashedForms.length <= 0 ? (
        <div>
          <p>Trash is empty.</p>
        </div>
      ) : (
        <>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {trashedForms?.map((form: Form) => (
              <FormCard key={form.id} data={form} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
