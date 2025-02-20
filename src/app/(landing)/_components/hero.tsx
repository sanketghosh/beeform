import GridPattern from "@/components/ui/magic-ui/grid-pattern";
import RainbowButton from "@/components/ui/magic-ui/rainbow-button";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { CircleCheckIcon, StarIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="mx-auto mb-10 mt-24 flex max-w-7xl items-center justify-center px-4">
      {/*  <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20"></div> */}
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "-z-10 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
        <Link
          href={"https://github.com/sanketghosh/beeform"}
          className="flex items-center gap-1 rounded-full border bg-secondary px-3 py-1 text-sm font-medium"
        >
          <StarIcon size={15} className="fill-primary stroke-primary" />
          Give us a star on Github
        </Link>
        <h1 className="mx-auto max-w-3xl text-center font-instrumentSerif text-4xl leading-tight md:text-5xl lg:text-5xl xl:text-6xl">
          Forms so easy, even your <br className="max-md:hidden" />{" "}
          <span className="text-primary">cat can build</span> one.
        </h1>
        <p className="mx-auto max-w-3xl text-center text-xs font-medium text-muted-foreground sm:text-sm">
          Make data collection easy with beeform. Create beautiful, interactive
          forms and surveys that capture more responses. From feedback to
          registrations, beeform’s intuitive design makes it simple to engage
          and collect.
        </p>
        <Link href={"/sign-up"}>
          <RainbowButton className="mb-10 rounded-lg px-5 py-2 text-sm text-background">
            Get Started
          </RainbowButton>
        </Link>
        <div className="w-full rounded-lg bg-primary p-1">
          <img
            src="/assets/hero-img.png"
            alt="hero image"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
