// local modules
import FormPreviewDialog from "@/app/(main)/create-form/_components/form-builder/dialog/form-preview-dialog";
import { useSingleFormData } from "@/app/(main)/create-form/_hooks/use-single-form-data";

// components
import { SidebarTrigger } from "@/components/ui/sidebar";
import MobileFormBuilderSidebar from "../sidebar/mobile-form-builder-sidebar";

export default function FormBuilderNav() {
  const { formData } = useSingleFormData();

  // console.log("@@@CLIENT->>Form Builder Nav: ", formData);

  return (
    <nav className="sticky top-0 z-20 h-14 w-full border-b border-sidebar-border bg-sidebar">
      <div className="flex h-full items-center justify-between gap-3 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h2 className="truncate font-medium">{formData?.title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <FormPreviewDialog />
          <MobileFormBuilderSidebar />
        </div>
      </div>
    </nav>
  );
}
