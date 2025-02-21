"use client";

import { Separator } from "@/components/ui/separator";
import { useFormBuilderContext } from "../../../_hooks/use-form-builder-context";
import ElementsButtonsSidebar from "./elements-buttons-sidebar";
import ElementsPropertiesSidebar from "./elements-properties-sidebar";

export default function FormBuilderSidebar() {
  const { selectedElement, setSelectedElement } = useFormBuilderContext();

  return (
    <aside className="sticky top-0 hidden h-screen w-[400px] overflow-y-auto border-l border-sidebar-border bg-sidebar lg:block">
      <div className="space-y-6 px-5 py-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {/* <PublishFormAlert />
            <SaveFormAlert /> */}
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            *Make sure to save the latest change before making it public.
          </p>
          <Separator />
        </div>
        {!selectedElement && <ElementsButtonsSidebar />}
        {selectedElement && <ElementsPropertiesSidebar />}
      </div>
    </aside>
  );
}
