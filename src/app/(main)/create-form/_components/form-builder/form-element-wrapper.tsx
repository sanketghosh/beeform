"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useFormBuilderContext } from "../../_hooks/use-form-builder-context";
import { FormElements } from "./elements/form-builder-elements";
import { useState } from "react";
import { FormElementInstance } from "../../_types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import SingleElementBaseStyle from "./single-element-base-style";

export default function FormElementWrapper({
  element,
}: {
  element: FormElementInstance;
}) {
  const { removeElementHandler, selectedElement, setSelectedElement } =
    useFormBuilderContext();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const FormElement = FormElements[element.type].formElementComponent;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfFormElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfFormElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isFormBuilderElement: true,
    },
  });

  if (draggable.isDragging) return null;

  // console.log("@@SELECTED ELE", selectedElement);

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(
        "relative flex h-32 flex-col rounded-md text-foreground ring-1 ring-secondary hover:cursor-pointer",
        FormElements[element.type].type === "TextareaField" && "h-fit",
      )}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute h-1/2 w-full rounded-t-lg"
      ></div>
      <div
        className="absolute bottom-0 h-1/2 w-full rounded-b-lg"
        ref={bottomHalf.setNodeRef}
      ></div>
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full transition-all">
            <Button
              className="h-full"
              variant={"destructive"}
              onClick={(e) => {
                e.stopPropagation();
                removeElementHandler(element.id);
              }}
            >
              <Trash2Icon />
            </Button>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse transition-all">
            <p className="text-sm font-medium">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 h-2 w-full rounded-md rounded-b-none bg-primary" />
      )}
      <SingleElementBaseStyle
        className={cn(
          mouseIsOver && "opacity-25",
          "pointer-events-none",
          FormElements[element.type].type === "TextareaField" && "h-fit",
        )}
      >
        <FormElement elementInstance={element} />
      </SingleElementBaseStyle>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 h-2 w-full rounded-md rounded-t-none bg-primary" />
      )}
    </div>
  );
}
