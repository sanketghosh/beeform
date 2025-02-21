"use client";

// packages
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArchiveIcon, Loader2Icon } from "lucide-react";

// local modules
import { moveToTrashAction } from "@/app/(main)/_actions/move-to-trash-action";
import { useToast } from "@/hooks/use-toast";

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

export default function TrashAlert({ formId }: { formId: string }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const trashFormHandler = () => {
    startTransition(async () => {
      const result = await moveToTrashAction(formId);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.success,
        });
        setInterval(() => {}, 1000);
        router.push("/dashboard");
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
        <Button size={"sm"} variant={"destructive"}>
          <ArchiveIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Send this form to trash ?</AlertDialogTitle>
          <AlertDialogDescription>
            It will stay in trash for 30 days before it deletes permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={trashFormHandler}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/60"
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : "Trash"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
