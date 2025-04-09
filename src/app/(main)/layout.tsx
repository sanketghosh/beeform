// packages
import type { Metadata } from "next";

// local modules
import "@/app/globals.css";

// components
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(main)/_components/sidebar/app-sidebar";
import SidebarInsetWrapper from "@/app/(main)/_wrappers/sidebar-inset-wrapper";

export const metadata: Metadata = {
  title: "zapform",
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
