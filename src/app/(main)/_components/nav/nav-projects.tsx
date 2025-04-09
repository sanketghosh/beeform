// packages
import Link from "next/link";

// local modules
import { getAllForms } from "@/app/(main)/_data-fetchers/get-all-forms";

// components
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default async function NavProjects() {
  const { forms } = await getAllForms("latest");

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Latest Created Forms</SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {forms.slice(0, 5).map((form) => (
          <SidebarMenuItem key={form.id}>
            <SidebarMenuButton size={"lg"} className="hover:bg-secondary">
              <Link
                href={`/single-form-data/${form.id}`}
                className="flex w-full flex-col"
              >
                <h1 className="truncate text-left text-sm font-medium">
                  {form.title}
                </h1>
                <p className="line-clamp-1 text-left text-muted-foreground">
                  {form.description}
                </p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
