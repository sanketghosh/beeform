// packages
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from "lucide-react";

// local modules
import { cn } from "@/lib/utils";
import { StatsCardsType } from "@/types";
import { statsCardsArr } from "@/app/(main)/_data";
import { getSingleForm } from "@/app/(main)/_data-fetchers/get-single-form";
import { buttonVariants } from "@/components/ui/button";
import { getFormWithSubmissions } from "@/app/(main)/single-form-data/_data-fetchers/get-form-with-submissions";

// components
import StatsCard from "@/app/(main)/_components/cards/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SharableLinkElement from "@/app/(main)/single-form-data/_components/shareable-link-element";
import FormSubmissionsTable from "@/app/(main)/single-form-data/_components/form-submissions-table";

type SingleFormDataProps = {
  params: {
    slug: string;
  };
};

export default async function SingleFormData({ params }: SingleFormDataProps) {
  const { slug } = await params;
  const { form, statsData } = await getSingleForm(slug);
  const { visits, submissions, submissionRate, bounceRate } = statsData;
  const { formWithSubmissions } = await getFormWithSubmissions(slug);

  // console.log("@@@--> FORM SUBMISSIONS: ", formWithSubmissions);

  const { statsCards } = statsCardsArr({
    visits,
    submissions,
    submissionRate,
    bounceRate,
  });

  // console.log("@@@SINGLE FORM DATA -->> FORM ID: ", slug);

  if (!form?.published) {
    return (
      <main className="flex min-h-[calc(100vh-150px)] items-center justify-center p-4">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Oops! Form is not published yet.</CardTitle>
            <CardDescription>
              You need to publish your form after saving to view it here and
              submit.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Link
              href={"/dashboard"}
              className={cn(
                "w-full",
                buttonVariants({
                  variant: "secondary",
                  size: "sm",
                }),
              )}
            >
              <ArrowLeftIcon />
              Go Back To Dashboard
            </Link>
            <Link
              href={`/create-form/${form?.id}`}
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "sm",
                }),
                "w-full",
              )}
            >
              Go To Editor
              <ArrowRightIcon />
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
          {form.title}
        </h1>
        <p className="text-sm font-medium text-muted-foreground md:text-base">
          {form.description}
        </p>
      </div>
      <div className="flex w-full items-center gap-2">
        <SharableLinkElement sharableUrl={form.shareURL} />
        <Link
          href={`/submit/${form.shareURL}`}
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "secondary",
            }),
          )}
        >
          Checkout Form
          <ArrowRightCircleIcon />
        </Link>
      </div>
      <Separator />
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
      <FormSubmissionsTable
        formSubmissions={formWithSubmissions?.formSubmissions}
        formContent={formWithSubmissions?.content}
      />
    </div>
  );
}
