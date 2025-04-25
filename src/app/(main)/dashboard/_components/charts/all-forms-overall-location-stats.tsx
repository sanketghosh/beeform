"use client";

// packages
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useMemo, useState } from "react";

// local modules
import {
  DateWiseLocationStats,
  LocationDataType,
} from "@/app/(main)/dashboard/_types";

// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// props type
type AllFormsOverallLocationStatsProps = {
  cities: DateWiseLocationStats[];
  countries: DateWiseLocationStats[];
  continents: DateWiseLocationStats[];
  devices: DateWiseLocationStats[];
};

export default function AllFormsOverallLocationStats({
  cities,
  continents,
  countries,
  devices,
}: AllFormsOverallLocationStatsProps) {
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const [continentSearchQuery, setContinentSearchQuery] = useState("");

  const [selectedTimeRange, setSelectedTimeRange] = useState("3d");

  const referenceDate = new Date();
  const filterDataByTimeRange = (
    data: DateWiseLocationStats[],
    timeRange: string,
  ) => {
    let hoursToSubtract = 72; // Default to last 3 days

    if (timeRange === "24h") hoursToSubtract = 24;
    if (timeRange === "2d") hoursToSubtract = 48;
    if (timeRange === "3d") hoursToSubtract = 72;
    if (timeRange === "30d") hoursToSubtract = 30 * 24; // 30 days in hours
    if (timeRange === "90d") hoursToSubtract = 90 * 24; // 90 days in hours

    // Normalize reference date to match backend date format (UTC, no time)
    const startTime = new Date();
    startTime.setUTCHours(0, 0, 0, 0);
    startTime.setUTCDate(startTime.getUTCDate() - hoursToSubtract / 24);

    // console.log("🔍 Filtering from:", startTime.toISOString());

    /*  const filteredData = data.filter(
      (entry) => new Date(entry.date) >= startTime,
    ); */

    const filteredData = data.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (isNaN(entryDate.getTime())) {
        console.error("Invalid date found", entry.date);
        return false;
      }
      return entryDate >= startTime;
    });

    // console.log("✅ Filtered Data:", filteredData);

    return filteredData;
  };

  // ✅ Step 2: Aggregate locations properly
  const aggregateLocations = (filteredData: DateWiseLocationStats[]) => {
    const locationMap = new Map<string, number>();

    filteredData.forEach((entry) => {
      entry.locations.forEach(({ label, submissions }) => {
        locationMap.set(label, (locationMap.get(label) || 0) + submissions);
      });
    });

    return Array.from(locationMap.entries()).map(([label, submissions]) => ({
      label,
      submissions,
    }));
  };

  // Apply filter and aggregation to each category
  const filteredCities = aggregateLocations(
    filterDataByTimeRange(cities, selectedTimeRange),
  );
  const filteredCountries = aggregateLocations(
    filterDataByTimeRange(countries, selectedTimeRange),
  );
  const filteredContinents = aggregateLocations(
    filterDataByTimeRange(continents, selectedTimeRange),
  );

  const handleTimeRangeChange = (value: string) => {
    // console.log("⏳ Time range changed to:", value);
    setSelectedTimeRange(value);
  };

  /*   const chartData = useMemo(() => {
    const deviceTypes = ["desktop", "laptop", "tablet", "mobile", "other"];
    const deviceMap = new Map<string, number>();

    deviceTypes.forEach((type) => deviceMap.set(type, 0));

    devices.forEach((dateData) => {
      dateData.locations.forEach((location) => {
        deviceMap.set(
          location.label,
          (deviceMap.get(location.label) || 0) + location.submissions,
        );
      });
    });


    return deviceTypes.map((type) => ({
      deviceType: type,
      submissions: deviceMap.get(type) || 0,
      fill: `var(--color-${type})`,
    }));
  }, [devices]); */
  const chartData = useMemo(() => {
    const filteredDevices = filterDataByTimeRange(devices, selectedTimeRange); // Filter device data

    const deviceTypes = ["desktop", "laptop", "tablet", "mobile", "other"];
    const deviceMap = new Map<string, number>();

    deviceTypes.forEach((type) => deviceMap.set(type, 0));

    filteredDevices.forEach((dateData) => {
      // Use filtered data
      dateData.locations.forEach((location) => {
        deviceMap.set(
          location.label,
          (deviceMap.get(location.label) || 0) + location.submissions,
        );
      });
    });

    return deviceTypes.map((type) => ({
      deviceType: type,
      submissions: deviceMap.get(type) || 0,
      fill: `var(--color-${type})`,
    }));
  }, [devices, selectedTimeRange]);

  const chartConfig = {
    submissions: {
      label: "Submissions",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    laptop: {
      label: "Laptop",
      color: "hsl(var(--chart-2))",
    },
    tablet: {
      label: "Tablet",
      color: "hsl(var(--chart-3))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>All Forms Overall Statistics</CardTitle>
          <CardDescription>
            Showing overall stats for all forms created. You can selected time
            range to filter.
          </CardDescription>
        </div>
        <Select value={selectedTimeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select Time Range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="24h" className="rounded-lg">
              Last 24 hours
            </SelectItem>
            <SelectItem value="2d" className="rounded-lg">
              Last 2 days
            </SelectItem>
            <SelectItem value="3d" className="rounded-lg">
              Last 3 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 90 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 px-2 pt-4 sm:px-6 sm:pt-6 xl:grid-cols-2">
        <ChartContainer config={chartConfig} className="rounded-md border p-6">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="deviceType"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="submissions" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="submissions" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
        <div>
          <Tabs defaultValue="city" className="w-full">
            <TabsList>
              <TabsTrigger value="city">City</TabsTrigger>
              <TabsTrigger value="country">Country</TabsTrigger>
              <TabsTrigger value="continent">Continent</TabsTrigger>
            </TabsList>
            <TabsContent
              value="city"
              className="w-full space-y-4 rounded-md border p-4"
            >
              <Input
                className="w-full"
                placeholder="Search cities..."
                onChange={(e) => setCitySearchQuery(e.target.value)}
              />
              {/* <DataTable dataArr={filteredCities} tableHeadColOne="City" /> */}
              <DataTable
                dataArr={filteredCities.filter((item) =>
                  item.label
                    .toLowerCase()
                    .includes(citySearchQuery.toLowerCase()),
                )}
                tableHeadColOne="City"
              />
            </TabsContent>
            <TabsContent
              value="country"
              className="w-full space-y-4 rounded-md border p-4"
            >
              <Input className="w-full" placeholder="Search countries..." />
              {/* <DataTable
                dataArr={filteredCountries}
                tableHeadColOne="Country"
              /> */}
              <DataTable
                dataArr={filteredCountries.filter((item) =>
                  item.label
                    .toLowerCase()
                    .includes(countrySearchQuery.toLowerCase()),
                )}
                tableHeadColOne="Country"
              />
            </TabsContent>
            <TabsContent
              value="continent"
              className="w-full space-y-4 rounded-md border p-4"
            >
              <Input className="w-full" placeholder="Search continents..." />
              {/*  <DataTable
                dataArr={filteredContinents}
                tableHeadColOne="Continent"
              /> */}
              <DataTable
                dataArr={filteredContinents.filter((item) =>
                  item.label
                    .toLowerCase()
                    .includes(continentSearchQuery.toLowerCase()),
                )}
                tableHeadColOne="Continent"
              />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}

type DataTableProps = {
  dataArr: LocationDataType[];
  tableHeadColOne: string;
  tableHeadColTwo?: string;
};

function DataTable({
  dataArr,
  tableHeadColOne,
  tableHeadColTwo = "Visitors",
}: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-full">{tableHeadColOne}</TableHead>
          <TableHead className="shrink-0 text-left">Visitors</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataArr.slice(0, 7).map((data) => (
          <TableRow key={data.label}>
            <TableCell className="font-medium">{data.label}</TableCell>
            <TableCell className="text-right">{data.submissions}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
