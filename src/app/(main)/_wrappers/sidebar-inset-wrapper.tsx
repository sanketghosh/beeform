"use client";

// packages
import Link from "next/link";
import { usePathname } from "next/navigation";

// local modules
import { cn } from "@/lib/utils";
import extractSingleFormUrlID from "@/app/(main)/_utils/extract-single-form-url-id";

// components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

type SidebarInsetWrapperProps = {
  children: React.ReactNode;
};

export default function SidebarInsetWrapper({
  children,
}: SidebarInsetWrapperProps) {
  const pathname = usePathname();

  let isOnDashboard = pathname === "/dashboard";
  let isOnCreateForm = pathname.startsWith("/create-form/");
  let isOnSingleFormData = pathname.startsWith("/single-form-data/");

  return (
    <SidebarInset className="relative">
      {!isOnCreateForm && (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <Link href={"/dashboard"} className="font-semibold">
                    Dashboard
                  </Link>
                </BreadcrumbItem>
                {isOnDashboard ? null : (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="font-semibold capitalize">
                        {!isOnSingleFormData ? (
                          <>{pathname?.slice(1)}</>
                        ) : (
                          <>{extractSingleFormUrlID(pathname?.slice(1))}</>
                        )}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      )}

      <main
        className={cn(
          isOnCreateForm
            ? "min-h-screen"
            : "min-h-[calc(100vh-64px)] p-4 md:p-6 lg:p-8",
        )}
      >
        {children}
      </main>
    </SidebarInset>
  );
}

/* 

write a TS function which will return," Single Form Data - cm7ozablw0005lcb6rvaz61vf", on giving a string like "single-form-data/cm7ozablw0005lcb6rvaz61vf"

*/
