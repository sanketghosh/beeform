"use client";

// packages
import { useState } from "react";
import { format, formatDate } from "date-fns";
import { ArrowUpDownIcon, DownloadIcon } from "lucide-react";

// local modules
import {
  ElementsType,
  FormElementInstance,
} from "@/app/(main)/create-form/_types";
import { FormSubmission } from "@prisma/client";
import { ColumnType, RowType, SortOrderType } from "@/types";
import { exportToExcel } from "@/app/(main)/single-form-data/_utils/export-to-excel";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const excludedTypes = [
  "TitleField",
  "SubtitleField",
  "ParagraphField",
  "SeparatorField",
  "SpacerField",
];

type FormSubmissionsTableProps = {
  formSubmissions?: FormSubmission[] | null;
  formContent?: string;
};

export default function FormSubmissionsTable({
  formSubmissions,
  formContent,
}: FormSubmissionsTableProps) {
  const [sortOrder, setSortOrder] = useState<SortOrderType>("latest");

  if (!formSubmissions || formSubmissions.length === 0) {
    return <div>No submissions found</div>;
  }

  if (!formSubmissions || formSubmissions.length === 0) {
    return <div>No submissions found</div>;
  }

  if (!formContent) {
    return <div>No form structure found</div>;
  }

  const columns: ColumnType[] = JSON.parse(formContent)
    .filter(
      (element: FormElementInstance) => !excludedTypes.includes(element.type),
    )
    .map((element: FormElementInstance) => ({
      id: element.id,
      label: element.extraAttributes?.label || `Field ${element.id}`,
      required: element.extraAttributes?.required || false,
      type: element.type,
    }));

  let rows: RowType[] = [];
  formSubmissions.forEach((submission: FormSubmission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.submittedAt,
    });
  });

  if (columns.length === 0) {
    return <div>No valid columns found in form structure</div>;
  }

  rows.sort((a, b) => {
    const dateA = new Date(a.submittedAt).getTime();
    const dateB = new Date(b.submittedAt).getTime();

    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "latest" ? "oldest" : "latest"));
  };

  const exportToXlsxHandler = () => {
    exportToExcel(columns, rows, "Form Submissions");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Submissions</h2>
        <div className="flex items-center gap-3">
          <Button onClick={toggleSortOrder} size="sm" variant="secondary">
            {sortOrder === "latest" ? "Earliest" : "Latest"}
            <ArrowUpDownIcon />
          </Button>
          <Button
            onClick={exportToXlsxHandler}
            size={"sm"}
            variant={"secondary"}
          >
            Download data
            <DownloadIcon />
          </Button>
        </div>
      </div>
      <div className="rounded-md border p-2">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((item) => (
                <TableHead key={item.id} className="uppercase">
                  {item.label}
                </TableHead>
              ))}
              <TableHead className="uppercase">Submitted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell>
                  {formatDate(row.submittedAt, "yyyy-MM-dd")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: React.ReactNode = value;

  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value);
      node = <p>{format(date, "dd/MM/yyyy")}</p>;
      break;
    case "CheckboxField":
      const checked = value === "true";
      //      node = checked?"true":"false";
      node = <Checkbox checked={checked} disabled />;
      break;
  }

  return <TableCell>{node}</TableCell>;
}
