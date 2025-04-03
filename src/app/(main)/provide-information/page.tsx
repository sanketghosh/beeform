"use client";

// packages
import { ListChecksIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PersonalInfoForm from "./_components/personal-info-form";

export default function FitnessForm() {
  return (
    <div className="h-full w-full space-y-6">
      <div>
        <span className="flex items-center gap-2 text-xl font-semibold md:text-2xl">
          <ListChecksIcon size={25} />
          <p>We need few information</p>
        </span>
        <p className="font-medium text-muted-foreground">
          Please fill all your fields to get the perfect program for you.
        </p>
      </div>
      <Separator className="w-full" />
      <PersonalInfoForm />
    </div>
  );
}
