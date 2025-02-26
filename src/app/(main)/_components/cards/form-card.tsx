// packages
import { EyeIcon, GlobeIcon, LockIcon, PenIcon } from "lucide-react";
import Link from "next/link";
import { formatDate } from "date-fns";
import { Form } from "@prisma/client";

// local modules
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TrashFormAlert from "@/app/(main)/all-forms/_components/alert-dialog/trash-form-alert";
import DeleteFromTrashAlert from "@/app/(main)/trash/_components/alert-dialog/delete-from-trash-alert";
import RecoverFromTrashAlert from "@/app/(main)/trash/_components/alert-dialog/recover-from-trash-alert";
/* import TrashAlert from "@/components/alert-dialog/trash-alert";
import RecoverFromTrashAlert from "@/components/alert-dialog/recover-from-trash-alert";
import DeleteFromTrashAlert from "@/components/alert-dialog/delete-from-trash-alert"; */

type FormCardProps = {
  data: Form;
};

export default function FormCard({
  data: {
    createdAt,
    visitsCount,
    description,
    submissionsCount,
    title,
    published,
    id,
    isTrashed,
    trashedAt,
  },
}: FormCardProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="absolute right-2 top-2 space-x-2 text-muted-foreground">
          {published ? <GlobeIcon size={15} /> : <LockIcon size={15} />}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex h-24 flex-col items-center justify-center rounded-lg bg-secondary">
            <h2 className="text-2xl font-semibold md:text-3xl">
              {visitsCount}
            </h2>
            <p>Visits</p>
          </div>
          <div className="flex h-24 flex-col items-center justify-center rounded-lg bg-secondary">
            <h2 className="text-2xl font-semibold md:text-3xl">
              {submissionsCount}
            </h2>
            <p>Submissions</p>
          </div>
        </div>

        <div className="text-sm font-medium text-muted-foreground">
          {/* {published ? "Published" : "Last updated"} on {formattedDate} */}
          {isTrashed ? (
            <div>
              <p>Trashed on {formatDate(trashedAt!, "yyyy-MM-dd")}</p>
              {/* {timeLeft! > 0 && (
                <p>
                  Will be deleted in {minutes}:
                  {seconds.toString().padStart(2, "0")}
                </p>
              )} */}
            </div>
          ) : (
            <p>Created {formatDate(createdAt!, "yyyy-MM-dd")}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-end gap-3 lg:justify-between">
        {isTrashed ? (
          <>
            <RecoverFromTrashAlert formId={id} />
            <DeleteFromTrashAlert formId={id} />
          </>
        ) : (
          <>
            {!published ? (
              <div className="flex w-full items-center gap-3">
                <Link
                  href={`/create-form/${id}`}
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: "sm",
                    }),
                    "w-full",
                  )}
                >
                  <PenIcon size={17} />
                  <p>Edit Form</p>
                </Link>
                <TrashFormAlert formId={id} />
              </div>
            ) : (
              <div className="flex w-full items-center gap-3">
                <Link
                  href={`/single-form-data/${id}`}
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: "sm",
                    }),
                    "w-full",
                  )}
                >
                  <EyeIcon size={17} />
                  <p>Form Data</p>
                </Link>
                <TrashFormAlert formId={id} />
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
