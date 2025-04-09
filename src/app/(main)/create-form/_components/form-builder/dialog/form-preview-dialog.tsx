"use client";

// packages
import { Columns2Icon } from "lucide-react";

// local modules
import { cn } from "@/lib/utils";
import { useSingleFormData } from "@/app/(main)/create-form/_hooks/use-single-form-data";
import { useFormBuilderContext } from "@/app/(main)/create-form/_hooks/use-form-builder-context";

// components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SingleElementBaseStyle from "@/app/(main)/create-form/_components/form-builder/single-element-base-style";
import { FormElements } from "@/app/(main)/create-form/_components/form-builder/elements/form-builder-elements";

export default function FormPreviewDialog() {
  const { elements } = useFormBuilderContext();
  const { formData } = useSingleFormData();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="" variant={"secondary"} size={"sm"}>
          <Columns2Icon />
          <p className="hidden lg:block">Preview</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0">
        {/*  <div className="border-b px-2 py-2">
          <h2 className="text-lg font-semibold">Form Preview</h2>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to users.
          </p>
        </div> */}
        <DialogHeader className="px-2 py-3">
          <DialogTitle>Form Preview</DialogTitle>
          <DialogDescription>
            This is how your form will look like to users.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-chequered-size flex h-full w-full items-center justify-center overflow-y-auto bg-chequered p-4 md:p-6 lg:p-8">
          <div className="max-h-[650px] min-h-[800px] w-[650px] space-y-6 overflow-y-auto rounded-lg bg-secondary p-3">
            <div>
              <h2 className="text-lg font-semibold">{formData?.title}</h2>
              <p className="text-sm font-medium text-muted-foreground">
                {formData?.description}
              </p>
            </div>
            <div className="w-full space-y-3">
              {elements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent;

                const elemType = FormElements[element.type].type;
                const changeStyleWhen =
                  elemType === "TitleField" ||
                  elemType === "ParagraphField" ||
                  elemType === "SubtitleField" ||
                  elemType === "SeparatorField" ||
                  elemType === "SpacerField";

                return (
                  <SingleElementBaseStyle
                    key={element.id}
                    className={cn(
                      changeStyleWhen && "h-fit border-none bg-transparent p-0",
                      elemType === "TextareaField" && "h-fit",
                    )}
                  >
                    <FormComponent elementInstance={element} />
                  </SingleElementBaseStyle>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* 

   <div className="w-full space-y-3">
              {elements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent;

                const elemType = FormElements[element.type].type;
                const changeStyleWhen =
                  elemType === "TitleField" ||
                  elemType === "ParagraphField" ||
                  elemType === "SubtitleField" ||
                  elemType === "SeparatorField" ||
                  elemType === "SpacerField";

                return (
                  <SingleElementBaseStyle
                    key={element.id}
                    className={cn(
                      changeStyleWhen && "h-fit border-none bg-transparent p-0",
                      elemType === "TextareaField" && "h-fit",
                    )}
                  >
                    <FormComponent elementInstance={element} />
                  </SingleElementBaseStyle>
                );
              })}
            </div>


*/
