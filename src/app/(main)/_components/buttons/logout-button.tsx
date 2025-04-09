"use client";

// packages
import React, { FormEvent, useTransition } from "react";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

// local modules
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";

// components
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const [isPending, setTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

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
  );
}
