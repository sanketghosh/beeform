"use client";

// packages
import Link from "next/link";
import {
  AppWindowIcon,
  ArchiveIcon,
  LibraryIcon,
  LucideProps,
  SettingsIcon,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// local modules
import { cn } from "@/lib/utils";

// components
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NavLinkButton from "@/app/(main)/_components/sidebar/nav-link-button";

export type MenuLinkType = {
  href: string;
  text: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const MENU_LINKS: MenuLinkType[] = [
  {
    href: "/dashboard",
    text: "Dashboard",
    icon: AppWindowIcon,
  },
  /* {
    href: "/statistics",
    text: "Statistics",
    icon: ChartPieIcon,
  }, */
  {
    href: "/all-forms",
    text: "All Forms",
    icon: LibraryIcon,
  },
  {
    href: "/trash",
    text: "Trash",
    icon: ArchiveIcon,
  },
  /*  {
    href: "/notifications",
    text: "Notifications",
    icon: BellIcon,
  }, */
  /* {
    href: "/settings",
    text: "Settings",
    icon: SettingsIcon,
  }, */
];

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Explore Options</SidebarGroupLabel>
      <SidebarMenu>
        {MENU_LINKS.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <NavLinkButton item={item} />
            </Link>
          </SidebarMenuItem>
        ))}
        {/*   <SidebarMenuItem>
          <SidebarMenuButton>
            <CirclePlusIcon />
            Create Form
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
