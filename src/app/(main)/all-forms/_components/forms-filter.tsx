"use client";

// packages
import { Form } from "@prisma/client";
import { useState } from "react";

// local modules
import { SortOrderType, SortStatusType } from "@/types";

// components
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormsFilterProps = {
  forms: Form[];
};

export default function FormsFilter({ forms }: FormsFilterProps) {
  const [sortOrder, setSortOrder] = useState<SortOrderType>("latest");
  const [filterStatus, setFilterStatus] = useState<SortStatusType>("all");

  // Filter the forms based on the selected status
  const filteredForms = forms.filter((form: Form) => {
    if (form.isTrashed) return false;

    if (filterStatus === "all") return true;
    if (filterStatus === "published") return form.published === true;
    if (filterStatus === "unpublished") return form.published === false;
    return true;
  });

  // Apply sorting to the filtered forms
  const sortedForms = filteredForms?.sort((a: Form, b: Form) => {
    if (sortOrder === "latest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortOrder === "oldest")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });

  const handleSortChange = (order: SortOrderType) => {
    setSortOrder(order);
  };

  const handleFilterChange = (status: SortStatusType) => {
    setFilterStatus(status);
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center">
      <Select
        onValueChange={(value) => handleSortChange(value as SortOrderType)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by creation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
      <RadioGroup
        defaultValue={filterStatus}
        onValueChange={(value) =>
          handleFilterChange(value as "all" | "published" | "unpublished")
        }
        className="flex items-center gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="radio-all" />
          <Label htmlFor="radio-all">All</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="published" id="radio-published" />
          <Label htmlFor="radio-published">Published</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="unpublished" id="radio-unpublished" />
          <Label htmlFor="radio-unpublished">Unpublished</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
