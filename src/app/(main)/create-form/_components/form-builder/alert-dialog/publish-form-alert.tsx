"use client";

// packages
import { $Enums } from "@prisma/client";
import { useState, useTransition } from "react";
import { Globe2Icon, Loader2Icon } from "lucide-react";

// local modules
import { useToast } from "@/hooks/use-toast";
import { useSingleFormData } from "@/app/(main)/create-form/_hooks/use-single-form-data";
import { useFormBuilderContext } from "@/app/(main)/create-form/_hooks/use-form-builder-context";
import { publishFormAction } from "@/app/(main)/create-form/_actions/publish-form-action";

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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function PublishFormAlert() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { formData } = useSingleFormData();
  const { elements } = useFormBuilderContext();
  const [selectedValue, setSelectedValue] =
    useState<$Enums.SubmissionAccess>("EVERYONE");

  // console.log("@@PUBLISH FORM ALERT: ", formData?.content);

  // const contentArray = JSON.parse(formData?.content!) || [];

  let contentArray: any[] = [];

  try {
    if (formData?.content) {
      contentArray = JSON.parse(formData.content) as any[];
    }
  } catch (error) {
    console.error("JSON Parse Error:", error, formData?.content);
    contentArray = []; // Fallback to an empty array if parsing fails
  }

  function publishFormHandler() {
    if (elements.length === 0) {
      toast({
        variant: "destructive",
        title: "ERROR!",
        description: "Sorry you must add at least one element to publish form.",
      });
    } else if (Array.isArray(contentArray) && contentArray.length === 0) {
      toast({
        variant: "destructive",
        title: "ERROR!",
        description:
          "Sorry, you must add at least one element to publish the form.",
      });
    } else {
      startTransition(async () => {
        const result = await publishFormAction({
          formId: formData?.id!,
          submissionAccess: selectedValue,
        });

        /*   console.log("@@@PUBLISH FORM ALERT -->> CLIENT: ", {
          formId: formData?.id!,
          submissionAccess: selectedValue,
        }); */

        if (result.success) {
          toast({
            title: "SUCCESS!",
            description: result.success,
          });
        } else {
          toast({
            variant: "destructive",
            title: "ERROR!",
            description: result.error,
          });
        }
      });
    }
  }

  const handleSubmissionTypeChange = (value: $Enums.SubmissionAccess) => {
    setSelectedValue(value);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {!formData?.published && (
          <Button
            className="w-full"
            variant={"default"}
            size={"sm"}
            disabled={contentArray.length === 0}
          >
            <Globe2Icon />
            Public
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you'll not be able to
            edit this form.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-3 rounded-md bg-secondary/30 px-4 py-6">
          <div className="text-sm">
            Choose who can submit your form. Think wisely as you cannot undone
            it.
          </div>
          <div className="flex items-center gap-1">
            <RadioGroup
              className="flex items-center gap-5"
              defaultValue={selectedValue}
              onValueChange={handleSubmissionTypeChange}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="AUTHENTICATED" />
                <Label>Authenticated Users</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="EVERYONE" />
                <Label>Everyone</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={publishFormHandler}>
            {isPending ? <Loader2Icon className="animate-spin" /> : "Publish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
