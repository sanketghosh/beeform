import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getSessionData } from "@/utils/get-session";
import { FlagIcon, ListChecksIcon } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const { name, authenticatedUserId } = await getSessionData();

  const data = await prisma.programInformation.findMany({
    where: {
      userId: authenticatedUserId,
    },
  });

  return (
    <div className="w-full space-y-6">
      <div className="max-w-2xl">
        <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
          Welcome back, {name}.
        </h1>
        <p className="font-medium text-muted-foreground">
          Here you can access all your created programs and create new fitness
          programs.
        </p>
        <Link
          href={"/provide-information"}
          className={cn(
            buttonVariants({
              size: "default",
            }),
            "mt-3",
          )}
        >
          <FlagIcon />
          Start Creating New Plan
        </Link>
      </div>
      <Separator className="w-full" />
      <div className="space-y-6">
        {data.map((i) => (
          <div
            key={i.id}
            className="w-full cursor-pointer space-y-1 rounded-xl border-2 px-3 py-4 transition-all hover:border-primary/30 hover:bg-secondary/30"
          >
            <h2 className="text-lg font-semibold">{i.name}</h2>
            <div className="space-x-5 text-sm font-medium">
              <span>
                Age: <b>{i.age}years</b>
              </span>
              <span>
                Height: <b>{i.height}cm</b>
              </span>
              <span>
                Weight: <b>{i.weight}kg</b>
              </span>
            </div>
            <p className="line-clamp-1 w-fit cursor-pointer text-sm font-medium text-muted-foreground underline underline-offset-4 transition-all hover:text-indigo-500">
              http://localhost:3000/{i.id + i.uniqueUrlId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
