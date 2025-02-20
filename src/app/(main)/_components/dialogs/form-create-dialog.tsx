// packages
import { CirclePlusIcon } from "lucide-react";

// components
import DialogContentWrapper from "@/app/(main)/_components/dialogs/dialog-content-wrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import StartFormCreationForm from "@/app/(main)/_components/forms/start-form-creation-form";

export default function FormCreateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>
          <CirclePlusIcon size={22} />
          Create Form
        </Button>
      </DialogTrigger>
      <DialogContentWrapper
        title="Start creating form"
        description="Entering a title and description will redirect you to the form creation page."
      >
        <StartFormCreationForm />
      </DialogContentWrapper>
    </Dialog>
  );
}
