"use client";

// packages
import { LayoutGridIcon } from "lucide-react";

// local modules
import { useFormBuilderContext } from "@/app/(main)/create-form/_hooks/use-form-builder-context";

// components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import PublishFormAlert from "@/app/(main)/create-form/_components/form-builder/alert-dialog/publish-form-alert";
import SaveFormAlert from "@/app/(main)/create-form/_components/form-builder/alert-dialog/save-form-alert";
import ElementsButtonsSidebar from "@/app/(main)/create-form/_components/form-builder/sidebar/elements-buttons-sidebar";
import ElementsPropertiesSidebar from "@/app/(main)/create-form/_components/form-builder/sidebar/elements-properties-sidebar";
import { Button } from "@/components/ui/button";

export default function MobileFormBuilderSidebar() {
  const { selectedElement } = useFormBuilderContext();

  return (
    <Sheet>
      <SheetTrigger className="block lg:hidden" asChild>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="flex items-center justify-center"
        >
          <LayoutGridIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <PublishFormAlert />
              <SaveFormAlert />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              *Make sure to save the latest change before making it public.
            </p>
            <Separator />
          </div>
          {!selectedElement && <ElementsButtonsSidebar />}
          {selectedElement && <ElementsPropertiesSidebar />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
