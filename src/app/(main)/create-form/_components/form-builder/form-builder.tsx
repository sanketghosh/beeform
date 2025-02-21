"use client";

import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect } from "react";

// components
import FormBuilderPad from "./form-builder-pad";
import FormBuilderNav from "./navbar/form-builder-nav";
import FormBuilderSidebar from "./sidebar/form-builder-sidebar";
import DragOverlayWrapper from "./overlay/drag-overlay-wrapper";
import FormBuilderContextProvider from "../../_contexts/form-builder-context";
import { Form } from "@prisma/client";
import { useSingleFormData } from "../../_hooks/use-single-form-data";

type FormBuilderProps = {
  formData: Form | null;
};

export default function FormBuilder({ formData }: FormBuilderProps) {
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
            <div className="bg-chequered flex h-full justify-center p-4 md:p-6 lg:p-8">
              <FormBuilderPad />
            </div>
          </div>
          <FormBuilderSidebar />
        </div>
        <DragOverlayWrapper />
      </DndContext>
    </FormBuilderContextProvider>
  );
}
