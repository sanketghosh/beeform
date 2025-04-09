// packages
import * as React from "react";
import { CircleIcon, ZapIcon } from "lucide-react";

// components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavMain from "../nav/nav-main";
import Link from "next/link";
import MainLink from "@/components/main-link";
import Beehive from "@/assets/beehive";
import NavProjects from "../nav/nav-projects";
import NavUser from "../nav/nav-user";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} variant="sidebar">
      <SidebarHeader className="">
        <SidebarMenu>
          <Link href={"/dashboard"}>
            <SidebarMenuItem>
              <SidebarMenuButton size={"lg"}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg border">
                  <ZapIcon className="size-6" />
                </div>
                <span className="font-boldonse text-lg">zapform</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
