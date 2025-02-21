"use client";

// packages
import { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";

// local modules
import { ElementsType } from "@/app/(main)/create-form/_types";
import { useFormBuilderContext } from "@/app/(main)/create-form/_hooks/use-form-builder-context";

// components
import { FormElements } from "@/app/(main)/create-form/_components/form-builder/elements/form-builder-elements";
import { SidebarFormElementButtonDragOverlay } from "@/app/(main)/create-form/_components/form-builder/overlay/sidebar-form-element-button-drag-overlay";

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>();
  const { elements } = useFormBuilderContext();

  useDndMonitor({
    onDragStart: (event) => {
      //   console.log(`@@DRAG ITEM`, event);
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) {
    return null;
  }

  let node = <div>No drag overlay</div>;
  const isSidebarButtonElement =
    draggedItem.data?.current?.isFormBuilderButtonElement;

  if (isSidebarButtonElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = (
      <SidebarFormElementButtonDragOverlay formElement={FormElements[type]} />
    );
  }

  const isFormBuilderElement = draggedItem.data?.current?.isFormBuilderElement;
  if (isFormBuilderElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>Element not found</div>;
    else {
      const FormBuilderElementComponent =
        FormElements[element.type].formElementComponent;
      node = (
        <div className="pointer-events-none flex h-28 w-full rounded-md border bg-sidebar px-4 py-2 opacity-80">
          <FormBuilderElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}
