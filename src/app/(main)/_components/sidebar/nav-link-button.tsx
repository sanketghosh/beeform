"use client";

// packages
import { usePathname } from "next/navigation";

// local modules
import { cn } from "@/lib/utils";
import { MenuLinkType } from "@/app/(main)/_components/nav/nav-main";

// components
import { SidebarMenuButton } from "@/components/ui/sidebar";

type NavLinkButtonProps = {
  item: MenuLinkType;
};

export default function NavLinkButton({ item }: NavLinkButtonProps) {
  const pathname = usePathname();

  return (
    <SidebarMenuButton
      tooltip={item.text}
      className={cn(
        "hover:bg-primary hover:text-primary-foreground",
        item.href === pathname &&
          "bg-primary text-primary-foreground hover:bg-primary/90",
      )}
    >
      {item.icon && <item.icon />}
      <span>{item.text}</span>
    </SidebarMenuButton>
  );
}
