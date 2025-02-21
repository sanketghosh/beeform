// packages
import { Columns2Icon } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FormPreviewDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="" variant={"secondary"} size={"sm"}>
          <Columns2Icon />
          <p className="hidden lg:block">Preview</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[99%] max-h-[99%] w-[99%] max-w-full flex-grow flex-col gap-0">
        <DialogHeader className="px-2 py-3">
          <DialogTitle>Form Preview</DialogTitle>
          <DialogDescription>
            This is how your form will look like to users.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
