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

export default async function Dashboard() {
  const { name } = await getSessionData();
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
      <div>
        <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl xl:text-4xl">
          Hi! <span className="text-primary">{name}</span>. Whassup ?
        </h1>
        <p className="font-medium text-muted-foreground">
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
              size: "lg",
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
    </div>
  );
}
