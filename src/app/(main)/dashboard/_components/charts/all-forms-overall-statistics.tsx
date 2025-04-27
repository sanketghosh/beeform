"use client";

// packages
import * as React from "react";
import { parse, format, isValid } from "date-fns";
import { enGB } from "date-fns/locale";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// local modules

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ChartData = {
  date: string;
  visits: number;
  submissions: number;
  responsePercentage: number;
  bounceRate: number;
};

type ChartProps = {
  chartData: ChartData[];
};

const chartConfig: ChartConfig = {
  visits: { label: "Visits", color: "hsl(var(--chart-1))" },
  submissions: { label: "Submissions", color: "hsl(var(--chart-2))" },
  responsePercentage: { label: "Response %", color: "hsl(var(--chart-3))" },
  bounceRate: { label: "Bounce Rate", color: "hsl(var(--chart-4))" },
};

export default function AllFormsOverallStatistics({ chartData }: ChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d");

  /*  const formattedChartData = chartData.map((item) => ({
    ...item,
    date: format(parse(item.date, "dd/MM/yyyy", new Date()), "yyyy-MM-dd"),
    responsePercentage: parseFloat(item.responsePercentage.toFixed(1)),
    bounceRate: parseFloat(item.bounceRate.toFixed(1)),
  })); */

  /*  const filteredData = formattedChartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  }); */

  const formattedChartData = chartData.map((item) => ({
    ...item,
    date: format(
      parse(item.date, "dd/MM/yyyy", new Date(), { locale: enGB }),
      "yyyy-MM-dd",
    ),
    responsePercentage: parseFloat(item.responsePercentage.toFixed(1)),
    bounceRate: parseFloat(item.bounceRate.toFixed(1)),
  }));

  const filteredData = formattedChartData.filter((item) => {
    if (!item) return false;

    const date = new Date(item.date);
    if (isNaN(date.getTime())) {
      console.error(`Invalid date value: ${item.date}`);
      return false;
    }
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

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
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillVisits" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-visits)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-visits)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSubmissions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-submissions)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-submissions)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillResponse" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-responsePercentage)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-responsePercentage)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillBounceRate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-bounceRate)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-bounceRate)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => format(new Date(value), "MMM d")}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => format(new Date(value), "MMM d")}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="visits"
              type="natural"
              fill="url(#fillVisits)"
              stroke="var(--color-visits)"
              stackId="a"
            />
            <Area
              dataKey="submissions"
              type="natural"
              fill="url(#fillSubmissions)"
              stroke="var(--color-submissions)"
              stackId="a"
            />
            <Area
              dataKey="responsePercentage"
              type="natural"
              fill="url(#fillResponse)"
              stroke="var(--color-responsePercentage)"
              stackId="a"
            />
            <Area
              dataKey="bounceRate"
              type="natural"
              fill="url(#fillBounceRate)"
              stroke="var(--color-bounceRate)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
