// packages
import Link from "next/link";

// local modules
import { cn } from "@/lib/utils";

// components
import SignInForm from "@/app/(auth)/_components/forms/sign-in-form";
import { buttonVariants } from "@/components/ui/button";
import MainLink from "@/components/main-link";

export default function SignIn() {
  return (
    <div className="h-screen">
      <div className="flex h-full">
        <div className="relative hidden h-full flex-1 lg:block">
          <img
            src="/assets/alien_three.jpeg"
            alt="alien"
            className="z-0 h-full object-cover brightness-75"
          />
          <div className="absolute left-4 top-4 z-20 text-white">
            <MainLink className="z-20" />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-xl text-white">
              Don't get stung by boring, clunky forms. With BeeForm, you'll
              create forms that are as smooth as honey, as flexible as a bee in
              flight, and as effective as a hive on a mission. So, what are you
              waiting for? Join the buzz and start building forms that sting the
              competition!
            </h1>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col items-center justify-center space-y-6">
          <Link
            href={"/sign-up"}
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "absolute right-4 top-4",
            )}
          >
            Sign Up
          </Link>

          <SignInForm />
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
