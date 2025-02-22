"use client";

// packages
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect } from "react";

// local modules
import { Form } from "@prisma/client";
import FormBuilderContextProvider from "@/app/(main)/create-form/_contexts/form-builder-context";
import { useSingleFormData } from "@/app/(main)/create-form/_hooks/use-single-form-data";

// components
import FormBuilderPad from "@/app/(main)/create-form/_components/form-builder/form-builder-pad";
import FormBuilderNav from "@/app/(main)/create-form/_components/form-builder/navbar/form-builder-nav";
import FormBuilderSidebar from "@/app/(main)/create-form/_components/form-builder/sidebar/form-builder-sidebar";
import DragOverlayWrapper from "@/app/(main)/create-form/_components/form-builder/overlay/drag-overlay-wrapper";

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

  const touchSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

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
