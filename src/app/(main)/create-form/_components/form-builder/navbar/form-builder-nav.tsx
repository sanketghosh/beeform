import { SidebarTrigger } from "@/components/ui/sidebar";
import FormPreviewDialog from "@/app/(main)/create-form/_components/form-builder/dialog/form-preview-dialog";

export default function FormBuilderNav() {
  return (
    <nav className="sticky top-0 z-20 h-14 w-full border-b border-sidebar-border bg-sidebar">
      <div className="flex h-full items-center justify-between gap-3 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h2 className="truncate font-medium">Lorem ipsum dolor sit amet.</h2>
        </div>

        <FormPreviewDialog />
      </div>
    </nav>
  );
}
