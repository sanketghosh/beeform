"use client";

// packages
import { useTransition } from "react";
import { Loader2Icon, SaveIcon } from "lucide-react";

// local modules
import { useToast } from "@/hooks/use-toast";
import { saveFormAction } from "@/app/(main)/create-form/_actions/save-form-action";
import { useSingleFormData } from "@/app/(main)/create-form/_hooks/use-single-form-data";
import { useFormBuilderContext } from "@/app/(main)/create-form/_hooks/use-form-builder-context";

// components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function SaveFormAlert() {
  const { formData } = useSingleFormData();
  const { elements } = useFormBuilderContext();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // console.log(elements);

  const saveFormHandler = () => {
    if (elements.length > 0) {
      const jsonStringifiedDataOfForm = JSON.stringify(elements);
      startTransition(async () => {
        const result = await saveFormAction({
          formId: formData?.id!,
          formContent: jsonStringifiedDataOfForm,
        });
        /* console.log({
          formId: formData?.id!,
          formContent: jsonStringifiedDataOfForm,
        }); */

        if (result.success) {
          toast({
            title: "SUCCESS !",
            description: result.success,
          });
        } else {
          toast({
            variant: "destructive",
            title: "ERROR !",
            description: result.error,
          });
        }
      });
    } else {
      toast({
        variant: "destructive",
        title: "ERROR!",
        description: "Sorry you must add at least one element to save form.",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant={"secondary"} size={"sm"}>
          <SaveIcon />
          Save
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save your form</AlertDialogTitle>
          <AlertDialogDescription>
            Saving form will make sure your progress is saved so that next time
            you come back and start from where you left.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={saveFormHandler} disabled={isPending}>
            {isPending ? <Loader2Icon className="animate-spin" /> : "Save"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
