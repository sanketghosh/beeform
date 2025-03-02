// local modules
import { getLocationWiseSubmissionStats } from "@/app/(main)/dashboard/_data-fetchers/get-location-wise-submission-stats";
import { getDailyStats } from "@/app/(main)/dashboard/_data-fetchers/get-daily-stats";

// components
import AllFormsOverallStatistics from "@/app/(main)/dashboard/_components/charts/all-forms-overall-statistics";
import AllFormsOverallLocationStats from "@/app/(main)/dashboard/_components/charts/all-forms-overall-location-stats";

type AllFormsStatsChartsProps = {
  userId: string;
};

export default async function AllFormsStatsCharts({
  userId,
}: AllFormsStatsChartsProps) {
  const { chartData } = await getDailyStats(userId);
  const { cities, continents, countries, devices } =
    await getLocationWiseSubmissionStats(userId);

  /*   console.log("@@@->> ALL FORMS STATS COMPONENT ->> DASHBOARD : ", {
    cities,
    continents,
    countries,
  });
 */
  return (
    <section className="space-y-4">
      <AllFormsOverallStatistics chartData={chartData} />
      <AllFormsOverallLocationStats
        cities={cities}
        continents={continents}
        countries={countries}
        devices={devices}
      />
    </section>
  );
}
