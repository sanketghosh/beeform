"use client";

// packages
import Link from "next/link";
import { Loader2Icon, LogOutIcon, UserIcon } from "lucide-react";

// local modules
import { FormEvent, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { useSidebar } from "@/components/ui/sidebar";

// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type NavUserDropdownProps = {
  name: string;
  email: string;
};

const MENU_DATA = [
  {
    icon: <UserIcon className="size-5" />,
    url: "/account",
    title: "account",
  },
];

export default function NavUserDropdown({ email, name }: NavUserDropdownProps) {
  const [isPending, setTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const { isMobile } = useSidebar();

  const signOutHandler = async (e: FormEvent) => {
    e.preventDefault();
    setTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast({
              title: "SUCCESS!",
              description: "User has been signed out successfully.",
            });
            setInterval(() => {}, 1000);
            router.push("/sign-up");
          },
          onError: (ctx) => {
            toast({
              variant: "destructive",
              title: "ERROR!",
              description: ctx.error.message,
            });
          },
        },
      });
    });
  };

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      side={isMobile ? "bottom" : "right"}
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            {/* <AvatarImage src={user?.avatar} alt={user?.username} /> */}
            <AvatarFallback className="rounded-lg bg-teal-800 text-xl font-bold text-white">
              {name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{name}</span>
            <span className="truncate text-xs">{email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="space-y-2">
        {MENU_DATA.map((item) => (
          <DropdownMenuItem key={item.url} asChild>
            <Link
              href={item.url}
              className="flex cursor-pointer items-center gap-1 capitalize"
            >
              {item.icon}
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <form onSubmit={signOutHandler} className="w-full">
          <Button
            className="flex w-full cursor-pointer items-center justify-start gap-2"
            variant={"destructive"}
            disabled={isPending}
            type="submit"
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <>
                <LogOutIcon className="size-5" />
                Log out
              </>
            )}
          </Button>
        </form>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
