"use client";

// packages
import { Loader2Icon, RotateCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

// local modules
import { useToast } from "@/hooks/use-toast";
import recoverFromTrashAction from "@/app/(main)/trash/_actions/recover-from-trash-action";

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

type RecoverFromTrashAlertProps = {
  formId: string;
};

export default function RecoverFromTrashAlert({
  formId,
}: RecoverFromTrashAlertProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const recoverFromTrashHandler = () => {
    startTransition(async () => {
      const result = await recoverFromTrashAction(formId);
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
        <Button className="w-full" size={"sm"} variant={"secondary"}>
          <RotateCwIcon />
          Recover
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
            onClick={recoverFromTrashHandler}
            disabled={isPending}
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : "Recover"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
