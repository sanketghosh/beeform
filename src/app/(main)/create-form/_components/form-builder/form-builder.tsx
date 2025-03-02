"use client";

// packages
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect } from "react";
import Confetti from "react-confetti";

// local modules
import { Form } from "@prisma/client";
import FormBuilderContextProvider from "@/app/(main)/create-form/_contexts/form-builder-context";
import { useSingleFormData } from "@/app/(main)/create-form/_hooks/use-single-form-data";

// components
import FormBuilderPad from "@/app/(main)/create-form/_components/form-builder/form-builder-pad";
import FormBuilderNav from "@/app/(main)/create-form/_components/form-builder/navbar/form-builder-nav";
import FormBuilderSidebar from "@/app/(main)/create-form/_components/form-builder/sidebar/form-builder-sidebar";
import DragOverlayWrapper from "@/app/(main)/create-form/_components/form-builder/overlay/drag-overlay-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SharableLinkElement from "@/app/(main)/single-form-data/_components/shareable-link-element";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

type FormBuilderProps = {
  formData: Form | null;
};

export default function FormBuilder({ formData }: FormBuilderProps) {
  const { setFormData } = useSingleFormData();

  useEffect(() => {
    if (formData) {
      setFormData(formData);
      console.log("Form data set in store automatically.");
    }
  }, [formData, setFormData]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  if (formData?.published) {
    return (
      <FormPublishedScreen formId={formData.id} shareURL={formData.shareURL} />
    );
  }

  return (
    <FormBuilderContextProvider>
      <DndContext sensors={sensors}>
        <div className="flex h-full min-h-full">
          <div className="flex h-full flex-1 flex-col">
            <FormBuilderNav />
            {/* main builder */}
            <div className="flex h-full justify-center bg-chequered p-4 md:p-6 lg:p-8">
              <FormBuilderPad formData={formData} />
            </div>
          </div>
          <FormBuilderSidebar />
        </div>
        <DragOverlayWrapper />
      </DndContext>
    </FormBuilderContextProvider>
  );
}

function FormPublishedScreen({
  shareURL,
  formId,
}: {
  shareURL?: string;
  formId: string;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-sidebar p-4">
      <Confetti
        className="h-full w-full"
        numberOfPieces={2000}
        recycle={false}
      />
      <Card className="lg:w-[500px]">
        <CardHeader>
          <CardTitle className="text-xl">Form Published</CardTitle>
          <CardDescription>
            Your form has been published, you cannot edit the form anymore.{" "}
            <br />{" "}
            <span className="text-foreground">
              *Share this link with users so that they can access the form.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SharableLinkElement sharableUrl={shareURL} />
        </CardContent>
        <CardFooter className="flex flex-col text-sm font-medium leading-tight text-muted-foreground">
          {/*  <Button className="w-full" onClick={handleNativeShare}>
            Share Form
          </Button> */}

          <div className="flex w-full items-center justify-between">
            <Link
              href={"/dashboard"}
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
              })}
            >
              <ArrowLeftIcon size={17} />
              Dashboard
            </Link>
            <Link
              href={`/single-form-data/${formId}`}
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
              })}
            >
              Form Data
              <ArrowRightIcon size={17} />
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
