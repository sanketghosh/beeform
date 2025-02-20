// packages
import Link from "next/link";

// local modules
import { NAVBAR_DATA } from "@/constants";
import { NavbarDataType } from "@/types";
import { cn } from "@/lib/utils";

// components
import MainLink from "@/components/main-link";
import { buttonVariants } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-14 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <MainLink />
        <nav className="space-x-4">
          {NAVBAR_DATA.map((data: NavbarDataType) => (
            <Link
              key={data.href}
              href={data.href}
              className={cn(
                buttonVariants({
                  variant: `${data.variant ?? "default"}`,
                  size: "sm",
                }),
                "capitalize",
              )}
            >
              {data.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
