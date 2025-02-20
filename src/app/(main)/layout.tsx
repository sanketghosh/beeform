import type { Metadata } from "next";
import "@/app/globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import SidebarInsetWrapper from "./_wrappers/sidebar-inset-wrapper";

export const metadata: Metadata = {
  title: "beeform",
  description:
    "Create forms in minutes by just dragging and dropping components.",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInsetWrapper>{children}</SidebarInsetWrapper>
    </SidebarProvider>
  );
}
