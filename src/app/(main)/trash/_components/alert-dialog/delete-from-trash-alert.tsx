"use client";

// packages
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon, TrashIcon } from "lucide-react";

// local modules
import { useToast } from "@/hooks/use-toast";
import deleteFormPermanentlyAction from "@/app/(main)/trash/_actions/delete-form-permanently-action";

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

type DeleteFromTrashAlertProps = {
  formId: string;
};

export default function DeleteFromTrashAlert({
  formId,
}: DeleteFromTrashAlertProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleDeleteFormPermanently = () => {
    startTransition(async () => {
      const result = await deleteFormPermanentlyAction(formId);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.success,
        });
        setInterval(() => {}, 1000);
        router.push("/trash");
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          description: result.error,
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" size={"sm"} variant={"destructive"}>
          <TrashIcon />
          Delete Permanently
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Recover your form from trash ?</AlertDialogTitle>
          <AlertDialogDescription>
            Continuing this will recover your form from trash.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteFormPermanently}
            disabled={isPending}
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
