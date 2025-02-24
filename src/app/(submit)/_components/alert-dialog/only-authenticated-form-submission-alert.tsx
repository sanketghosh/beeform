// packages
import Link from "next/link";

// local modules
import { cn } from "@/lib/utils";

// components
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

type OnlyAuthenticatedFormSubmissionAlertProps = {
  setShowAuthenticationAlert: React.Dispatch<React.SetStateAction<boolean>>;
  showAuthenticationAlert: boolean;
};

export default function OnlyAuthenticatedFormSubmissionAlert({
  showAuthenticationAlert,
}: OnlyAuthenticatedFormSubmissionAlertProps) {
  return (
    <AlertDialog open={showAuthenticationAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Only authenticated user can submit.
          </AlertDialogTitle>
          <AlertDialogDescription>
            You need to register or login in order to submit the form.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center space-x-4">
          <Link
            href={"/sign-up"}
            className={cn(
              buttonVariants({
                variant: "default",
                size: "sm",
              }),
              "w-full",
            )}
          >
            Sign Up
          </Link>
          <Link
            href={"/sign-in"}
            className={cn(
              buttonVariants({
                variant: "secondary",
                size: "sm",
              }),
              "w-full",
            )}
          >
            Sign In
          </Link>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
