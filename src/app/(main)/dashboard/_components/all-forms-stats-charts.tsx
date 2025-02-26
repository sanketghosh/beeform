// local modules
import getDailyStats from "@/app/(main)/dashboard/_data-fetchers/get-daily-stats";

// components
import AllFormsOverallStatistics from "@/app/(main)/dashboard/_components/charts/all-forms-overall-statistics";
import AllFormsOverallLocationStats from "@/app/(main)/dashboard/_components/charts/all-forms-overall-location-stats";
import { getLocationWiseSubmissionStats } from "../_data-fetchers/get-location-wise-submission-stats";

export default async function AllFormsStatsCharts() {
  const { chartData } = await getDailyStats();
  const { cities, continents, countries, devices } =
    await getLocationWiseSubmissionStats();

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
