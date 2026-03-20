import { Suspense } from "react";
import ChartSkeleton from "@/components/ui/chartskeleton";
import {
  GrowthStatsWrapper,
  TargetVsActualWrapper,
  YearOverYearWrapper,
} from "../../_components/GrowthWrapper";
import ChartErrorBoundary from "@/components/ui/charterrorboundary";

export default async function Page() {
  // const [
  //   targetVsActualData,
  //   yoyData,
  //   growthStat,
  // ] = await Promise.all([
  //   getTargetActualData(),
  //   getYoYData(),
  //   getGrowthData(),
  // ]);

  // const stats = GROWTH_STAT_CONFIG.map(
  //   (config) => ({
  //     ...config,
  //     ...growthStat[config.key],
  //   }),
  // );

  return (
    <div className="py-4 md:py-8 px-2 md:px-4">
      <h1 className="font-bold text-xl md:text-2xl truncate">
        Growth Tracker
      </h1>
      <p className="text-gray-500 text-sm md:text-base">
        Month-over-month and year-over-year
        performance analysis
      </p>

      <ChartErrorBoundary>
        <Suspense fallback={<ChartSkeleton />}>
          <GrowthStatsWrapper />
        </Suspense>
      </ChartErrorBoundary>

      <div className="flex flex-wrap">
        <ChartErrorBoundary>
          <Suspense fallback={<ChartSkeleton />}>
            <TargetVsActualWrapper />
          </Suspense>
        </ChartErrorBoundary>
        <ChartErrorBoundary>
          <Suspense fallback={<ChartSkeleton />}>
            <YearOverYearWrapper />
          </Suspense>
        </ChartErrorBoundary>
        {/* <YearOverYearChart data={yoyData} /> */}
      </div>
    </div>
  );
}
