/* import { prisma } from "@/lib/prisma";
import { DateWiseLocationStats } from "../_types";

export async function getLocationWiseSubmissionStats() {
  // Fetch aggregated submission counts grouped by date and location
  const countryStats = await prisma.formSubmission.groupBy({
    by: ["submittedAt", "country"],
    _count: { country: true },
    where: { country: { not: null } },
  });

  const cityStats = await prisma.formSubmission.groupBy({
    by: ["submittedAt", "city"],
    _count: { city: true },
    where: { city: { not: null } },
  });

  const continentStats = await prisma.formSubmission.groupBy({
    by: ["submittedAt", "continent"],
    _count: { continent: true },
    where: { continent: { not: null } },
  });


  const groupByDate = (
    stats: {
      submittedAt: Date;
      country?: string | null;
      city?: string | null;
      continent?: string | null;
      _count: { country?: number; city?: number; continent?: number };
    }[],
  ) => {
    const result: Record<string, Record<string, number>> = {}; // { date: { location: submissions } }

    stats.forEach((stat) => {
      // Normalize date (remove time portion and ensure UTC format)
      const date = new Date(stat.submittedAt);
      const normalizedDate = date.toISOString().split("T")[0]; // "YYYY-MM-DD"

      const label = stat.country ?? stat.city ?? stat.continent ?? "Unknown";
      const submissions =
        stat._count.country ?? stat._count.city ?? stat._count.continent ?? 0;

      if (!result[normalizedDate]) result[normalizedDate] = {};
      if (!result[normalizedDate][label]) {
        result[normalizedDate][label] = submissions;
      } else {
        result[normalizedDate][label] += submissions; // Aggregate submissions for the same location
      }
    });

    return Object.entries(result).map(([date, locations]) => ({
      date,
      locations: Object.entries(locations).map(([label, submissions]) => ({
        label,
        submissions,
      })),
    }));
  };

  const countries: DateWiseLocationStats[] = groupByDate(countryStats);
  const cities: DateWiseLocationStats[] = groupByDate(cityStats);
  const continents: DateWiseLocationStats[] = groupByDate(continentStats);

  return { countries, cities, continents };
}
 */

/* // local modules
import { prisma } from "@/lib/prisma";
import { DateWiseLocationStats } from "@/app/(main)/dashboard/_types";

interface FormSubmissionWithLocation {
  submittedAt: Date | null;
  city: string | null;
  country: string | null;
  continent: string | null;
}

export async function getLocationWiseSubmissionStats() {
  const getAggregatedStats = async (
    locationType: "city" | "country" | "continent",
  ) => {
    const rawStats: FormSubmissionWithLocation[] =
      await prisma.formSubmission.findMany({
        select: {
          submittedAt: true,
          city: true,
          country: true,
          continent: true,
        },
        where: {
          [locationType]: { not: null }, // Ensure we only process valid locations
        },
      });

    const aggregatedMap = new Map<string, Map<string, number>>();

    rawStats.forEach((stat) => {
      if (stat.submittedAt instanceof Date) {
        const date = stat.submittedAt.toISOString().split("T")[0]; // Get date part only
        const location = stat[locationType] as string;

        if (!aggregatedMap.has(date)) {
          aggregatedMap.set(date, new Map());
        }

        const locationMap = aggregatedMap.get(date)!;
        locationMap.set(location, (locationMap.get(location) || 0) + 1);
      }
    });

    // Convert Map to an array of objects
    return Array.from(aggregatedMap.entries()).map(([date, locations]) => ({
      date,
      locations: Array.from(locations.entries()).map(
        ([label, submissions]) => ({
          label,
          submissions,
        }),
      ),
    }));
  };

  const countries: DateWiseLocationStats[] =
    await getAggregatedStats("country");
  const cities: DateWiseLocationStats[] = await getAggregatedStats("city");
  const continents: DateWiseLocationStats[] =
    await getAggregatedStats("continent");

  return { countries, cities, continents };
}
 */

// local modules
import { prisma } from "@/lib/prisma";
import { DateWiseLocationStats } from "@/app/(main)/dashboard/_types";

interface FormSubmissionWithLocation {
  submittedAt: Date | null;
  city: string | null;
  country: string | null;
  continent: string | null;
  device: string | null;
}

export async function getLocationWiseSubmissionStats(userId: string) {
  const getAggregatedStats = async (
    locationType: "city" | "country" | "continent" | "device",
  ) => {
    const rawStats: FormSubmissionWithLocation[] =
      await prisma.formSubmission.findMany({
        select: {
          submittedAt: true,
          city: true,
          country: true,
          continent: true,
          device: true,
        },
        where: {
          form: {
            userId: userId,
          },
          [locationType]: { not: null }, // Ensure we only process valid locations
        },
      });

    const aggregatedMap = new Map<string, Map<string, number>>();

    rawStats.forEach((stat) => {
      if (stat.submittedAt instanceof Date) {
        const date = stat.submittedAt.toISOString().split("T")[0]; // Get date part only
        const location = stat[locationType] as string;

        if (!aggregatedMap.has(date)) {
          aggregatedMap.set(date, new Map());
        }

        const locationMap = aggregatedMap.get(date)!;
        locationMap.set(location, (locationMap.get(location) || 0) + 1);
      }
    });

    // Convert Map to an array of objects
    return Array.from(aggregatedMap.entries()).map(([date, locations]) => ({
      date,
      locations: Array.from(locations.entries()).map(
        ([label, submissions]) => ({
          label,
          submissions,
        }),
      ),
    }));
  };

  const countries: DateWiseLocationStats[] =
    await getAggregatedStats("country");
  const cities: DateWiseLocationStats[] = await getAggregatedStats("city");
  const continents: DateWiseLocationStats[] =
    await getAggregatedStats("continent");
  const devices: DateWiseLocationStats[] = await getAggregatedStats("device");

  return { countries, cities, continents, devices };
}
