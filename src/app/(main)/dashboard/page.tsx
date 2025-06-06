// packages
import Link from "next/link";
import { LibraryIcon } from "lucide-react";

// local modules
import { cn } from "@/lib/utils";
import { getSessionData } from "@/utils/get-session";
import { StatsCardsType } from "@/types";
import { statsCardsArr } from "@/app/(main)/_data";
import { fetchFormsStats } from "@/app/(main)/_data-fetchers/get-forms-stats";

// components
import { Separator } from "@/components/ui/separator";
import StatsCard from "@/app/(main)/_components/cards/stats-card";
import { buttonVariants } from "@/components/ui/button";
import FormCreateDialog from "@/app/(main)/_components/dialogs/form-create-dialog";
import AllFormsStatsCharts from "@/app/(main)/dashboard/_components/all-forms-stats-charts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to the dashboard of the zapform.",
};

export default async function Dashboard() {
  const { name, authenticatedUserId } = await getSessionData();
  const { bounceRate, submissionRate, submissions, visits } =
    await fetchFormsStats();
  const { statsCards } = statsCardsArr({
    visits,
    submissions,
    submissionRate,
    bounceRate,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl">
          Hi! <span className="text-primary">{name}</span>. Whassup ?
        </h1>
        <p className="font-medium leading-tight text-muted-foreground md:text-lg xl:text-xl">
          Welcome to your dashboard. You can create, manage, organize and check
          form stats here.
        </p>
      </div>

      <Separator />

      <div className="flex items-center space-x-3">
        <FormCreateDialog />
        <Link
          className={cn(
            buttonVariants({
              size: "default",
              variant: "secondary",
            }),
          )}
          href={"/all-forms"}
        >
          <LibraryIcon size={22} />
          View All Forms
        </Link>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((item: StatsCardsType, idx) => (
          <StatsCard
            key={idx}
            description={item.desc}
            title={item.title}
            itemSerialNo={idx}
            statsNumber={item.statsNumber}
            /*  error={error}
            isError={isError}
            isLoading={isLoading} */
            isPercentage={item.isPercentage}
          />
        ))}
      </div>

      <Separator />
      <AllFormsStatsCharts userId={authenticatedUserId!} />
    </div>
  );
}
