// packages
import { Loader2Icon } from "lucide-react";

// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatsCardProps = {
  title: string;
  description?: string;
  isError?: boolean;
  isLoading?: boolean;
  error?: Error | null;
  itemSerialNo: number;
  statsNumber: number;
  isPercentage: boolean;
};

export default function StatsCard({
  description,
  error,
  itemSerialNo,
  isError,
  isLoading,
  title,
  statsNumber,
  isPercentage,
}: StatsCardProps) {
  return (
    <Card className="cursor-pointer transition-all hover:bg-secondary/30">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-2xl font-semibold md:text-3xl lg:text-4xl">
        {isError ? (
          <p className="text-sm text-destructive">{error?.message}</p>
        ) : (
          <>
            {isLoading ? (
              <Loader2Icon className="animate-spin text-muted-foreground" />
            ) : (
              <>
                {!isPercentage ? statsNumber : statsNumber.toFixed(1)}
                {isPercentage ? "%" : ""}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
