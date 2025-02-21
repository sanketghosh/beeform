"use client";

import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useFormBuilderContext } from "../../_hooks/use-form-builder-context";
import { ElementsType } from "../../_types";
import { FormElements } from "./elements/form-builder-elements";
import { v4 as uuidGenerator } from "uuid";

export default function FormBuilderPad() {
  const {
    addElementHandler,
    removeElementHandler,
    setSelectedElement,
    selectedElement,
    elements,
  } = useFormBuilderContext();

  const droppable = useDroppable({
    id: "form-builder-drop-area",
    data: {
      isFormBuilderDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isFormBuilderButtonElement =
        active.data?.current?.isFormBuilderButtonElement;
      const isDroppingOverFormBuilderDropArea =
        over.data?.current?.isFormBuilderDropArea;

      // first scenario
      if (isFormBuilderButtonElement && isDroppingOverFormBuilderDropArea) {
        const type = active?.data?.current?.type;
        const newElement =
          FormElements[type as ElementsType].construct(uuidGenerator());

        //  add a new element
        addElementHandler(elements.length, newElement);
        return;
      }
      // console.log("@@EVENT --> DRAG END", event);

      const isDroppingOverFormBuilderElementTopHalf =
        over.data?.current?.isTopHalfFormElement;

      const isDroppingOverFormBuilderElementBottomHalf =
        over.data?.current?.isBottomHalfFormElement;

      const isDroppingOverFormBuilderElement =
        isDroppingOverFormBuilderElementTopHalf ||
        isDroppingOverFormBuilderElementBottomHalf;

      // second scenario
      if (isFormBuilderButtonElement && isDroppingOverFormBuilderElement) {
        const type = active?.data?.current?.type;
        const newElement =
          FormElements[type as ElementsType].construct(uuidGenerator());

        const overId = over.data?.current?.elementId;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("ERROR! Element not found.");
        }

        let indexForNewElement = overElementIndex;
        if (isDroppingOverFormBuilderElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        //  add a new element
        addElementHandler(indexForNewElement, newElement);
        return;
      }

      // third scenario
      const isDraggingFormElement = active.data?.current?.isFormBuilderElement;

      if (isDraggingFormElement && isDroppingOverFormBuilderElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId,
        );

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("ERROR! Element not found.");
        }
        const activeElement = { ...elements[activeElementIndex] };
        removeElementHandler(activeId);

        let indexForNewElement = overElementIndex;
        if (isDroppingOverFormBuilderElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElementHandler(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div
      ref={droppable.setNodeRef}
      onClick={() => {
        if (selectedElement) {
          setSelectedElement(null);
        }
      }}
      className={cn(
        "flex h-full max-w-3xl flex-grow flex-col rounded-lg bg-sidebar p-2",
        droppable.isOver && "ring-2 ring-primary",
      )}
    ></div>
  );
}

/* 

<div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
          <div key={i} className="h-40 border">
            <p>hello</p>
          </div>
        ))}
      </div>

*/
