// packages
import Link from "next/link";

// local modules
import { cn } from "@/lib/utils";

// components
import SignUpForm from "@/app/(auth)/_components/forms/sign-up-form";
import MainLink from "@/components/main-link";
import { buttonVariants } from "@/components/ui/button";

export default function SignUp() {
  return (
    <div className="h-screen">
      <div className="flex h-full flex-row-reverse">
        <div className="relative hidden h-full flex-1 lg:block">
          <img
            src="/assets/alien_two.jpeg"
            alt="alien"
            className="z-0 h-full object-cover brightness-75"
          />
          <div className="absolute right-4 top-4 z-20 text-white">
            <MainLink className="z-20" />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-xl text-white">
              Create forms that are as sweet as honey, without getting stuck in
              a hive of complexity. With BeeForm, you'll be buzzing with
              excitement as you drag, drop, and design your way to form
              perfection.
            </h1>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col items-center justify-center space-y-6">
          <Link
            href={"/sign-in"}
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "absolute left-4 top-4",
            )}
          >
            Sign In
          </Link>

          <SignUpForm />
          <p className="max-w-sm px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
