"use client";

// packages
import { ArrowLeftIcon, ArrowRightIcon, Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { v4 as uuidGenerator } from "uuid";
import Confetti from "react-confetti";

// local modules
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { $Enums, Form } from "@prisma/client";
import { FormSubmitActionSchemaType } from "@/app/(submit)/_schemas";
import { FormElementInstance } from "@/app/(main)/create-form/_types";
import { formSubmitAction } from "@/app/(submit)/_actions/form-submit-action";
import { getDeviceTypeFromUserAgent } from "@/app/(submit)/_utils/get-device-type";

// components
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SingleElementBaseStyle from "@/app/(main)/create-form/_components/form-builder/single-element-base-style";
import { FormElements } from "@/app/(main)/create-form/_components/form-builder/elements/form-builder-elements";
import OnlyAuthenticatedFormSubmissionAlert from "@/app/(submit)/_components/alert-dialog/only-authenticated-form-submission-alert";

type SubmitFormBodyProps = {
  form: Form;
  userId: string;
};

export default function SubmitFormBody({ form, userId }: SubmitFormBodyProps) {
  const [showAuthenticationAlert, setShowAuthenticationAlert] =
    useState<boolean>(false);

  // console.log("@@@SUBMIT FORM", data?.data);

  const dataSubAccess = form.submissionAccess as $Enums.SubmissionAccess;

  useEffect(() => {
    if (!userId && dataSubAccess === "AUTHENTICATED") {
      setShowAuthenticationAlert(true);
    }
  });

  if (form.published === false) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Oops! Form is not published yet.</CardTitle>
            <CardDescription>
              You need to publish your form after saving to view it here and
              submit.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Link
              href={"/dashboard"}
              className={cn(
                "w-full",
                buttonVariants({
                  variant: "secondary",
                  size: "sm",
                }),
              )}
            >
              <ArrowLeftIcon />
              Go Back To Dashboard
            </Link>
            <Link
              href={`/create-form/${form.id}`}
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "sm",
                }),
                "w-full",
              )}
            >
              Go To Editor
              <ArrowRightIcon />
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  /*   if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-1">
          <Loader2Icon />
          Loading...
        </div>
      </main>
    );
  } */

  /*  if (showAuthenticationAlert) {
    return <OnlyAuthenticatedFormSubmissionAlert />;
  } */

  return (
    <main className="flex h-full min-h-screen w-full items-center justify-center overflow-y-auto bg-secondary/30 p-4 md:p-6 lg:p-8">
      {showAuthenticationAlert && (
        <OnlyAuthenticatedFormSubmissionAlert
          setShowAuthenticationAlert={setShowAuthenticationAlert}
          showAuthenticationAlert={showAuthenticationAlert}
        />
      )}
      <div className="container min-h-full w-full space-y-6 overflow-y-auto rounded-lg bg-secondary px-4 py-6 shadow-lg sm:w-[550px] md:w-[600px]">
        {/* <div>
          <h2 className="text-lg font-semibold md:text-xl">
            {data?.data.title}
          </h2>
          <p className="text-sm font-medium text-muted-foreground">
            {data?.data.description}
          </p>
        </div> 
        <Separator />*/}
        <FormSubmitComponent
          props={{
            shareURL: form.shareURL,
            formSubmissionAccess: form.submissionAccess,
            content: form.content,
          }}

          // description={data?.data.description}
          // title={data?.data.title}
        />
      </div>
    </main>
  );
}

type FormSubmitComponentProps = {
  props: FormSubmitActionSchemaType;
};

function FormSubmitComponent({
  props: { formSubmissionAccess, shareURL, content },
}: FormSubmitComponentProps) {
  let parsedContent: FormElementInstance[] = [];
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const deviceType = getDeviceTypeFromUserAgent();
  // console.log(deviceType);

  try {
    parsedContent = JSON.parse(content);
  } catch (error) {
    console.error("Failed to parse content:", error);
    toast({
      variant: "destructive",
      title: "ERROR",
      description:
        "ERROR! Failed to parse, check console for details or maybe just reload the page.",
    });
  }

  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  // for re-rendering as re-rendering is off for using useRef
  const [renderKey, setRenderKey] = useState<string>(uuidGenerator());

  type ValidateFormFuncType = () => boolean;

  const validateForm: ValidateFormFuncType = useCallback(() => {
    for (const field of parsedContent) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }

      if (Object.keys(formErrors.current).length > 0) {
        return false;
      }
    }

    return true;
  }, [parsedContent]);

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  /*  const mutation = useMutation({
    mutationFn: submitFormAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      setFormSubmitted(true);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message);
    },
  }); */

  function formSubmitHandler(e: React.FormEvent) {
    e.preventDefault();

    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(uuidGenerator());
      toast({
        variant: "destructive",
        title: "ERROR",
        description: "Please check the errors and try again.",
      });
      return;
    }

    const JSONContent = JSON.stringify(formValues.current);
    /*  mutation.mutate({
      shareURL: shareUrl,
      content: JSONContent,
      device: deviceType,
    }); */

    startTransition(async () => {
      const result = await formSubmitAction({
        shareURL: shareURL,
        formSubmissionAccess: formSubmissionAccess,
        content: JSONContent,
        device: deviceType,
      });
      if (result.success) {
        toast({
          title: "SUCCESS!",
          description: result.success,
        });
        setFormSubmitted(true);
      } else {
        toast({
          variant: "destructive",
          title: "ERROR!",
          description: result.error,
        });
      }
    });
  }

  if (formSubmitted) {
    return (
      <div>
        <Confetti
          recycle={false}
          className="h-full w-full"
          numberOfPieces={1000}
        />
        <h2 className="text-2xl font-semibold">Form submitted!</h2>
        <p>Thank you for submitting your form you can close this page now.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" key={renderKey}>
      <form onSubmit={formSubmitHandler}>
        <div className="space-y-3">
          {parsedContent.map((element) => {
            const FormElement = FormElements[element.type]?.formComponent;

            if (!FormElement) {
              console.warn(`No form component found for type: ${element.type}`);

              toast({
                variant: "destructive",
                title: "ERROR",
                description: `No form component found for type: ${element.type}`,
              });
              return null;
            }

            const elemType = FormElements[element.type].type;
            const changeStyleWhen =
              elemType === "TitleField" ||
              elemType == "ParagraphField" ||
              elemType === "SubtitleField" ||
              elemType === "SeparatorField" ||
              elemType === "SpacerField";

            return (
              <SingleElementBaseStyle
                key={element.id}
                className={cn(
                  FormElements[element.type].type === "TextareaField" &&
                    "h-fit",
                  changeStyleWhen && "h-fit border-none bg-transparent p-0",
                )}
              >
                <FormElement
                  elementInstance={element}
                  submitValue={submitValue}
                  isInvalid={formErrors.current[element.id]}
                  defaultValue={formValues.current[element.id]}
                />
              </SingleElementBaseStyle>
            );
          })}
        </div>
        <Button className="mt-4 w-full" disabled={isPending}>
          {isPending ? <Loader2Icon className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}
