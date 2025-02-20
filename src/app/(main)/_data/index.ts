import { StatsCardsType } from "@/types";

type StatsCardsArrProps = {
  visits: number;
  submissions: number;
  submissionRate: number;
  bounceRate: number;
};

export const statsCardsArr = ({
  visits,
  submissions,
  submissionRate,
  bounceRate,
}: StatsCardsArrProps) => {
  const statsCards: StatsCardsType[] = [
    {
      title: "Forms visits",
      desc: "Number of the total of forms visits.",
      statsNumber: visits,
      isPercentage: false,
    },
    {
      title: "Submissions",
      desc: "Number of the total forms has been submitted.",
      statsNumber: submissions,
      isPercentage: false,
    },
    {
      title: "Response percentage",
      desc: "Percentage of response received.",
      statsNumber: submissionRate,
      isPercentage: true,
    },
    {
      title: "Bounce rate",
      desc: "Rate of forms have not been submitted.",
      statsNumber: bounceRate,
      isPercentage: true,
    },
  ];

  return {
    statsCards,
  };
};
