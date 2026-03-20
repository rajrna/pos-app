import { GROWTH_STAT_CONFIG } from "@/lib/config/dashboard";
import YearOverYearChart from "@/components/dashboard/growthtracker/YearOverYearChart";
import TargetVsActualChart from "@/components/dashboard/growthtracker/TargetVsActualChart";
import {
  getGrowthData,
  getTargetActualData,
  getYoYData,
} from "@/services/dashboard/apiGrowth";
import { Suspense } from "react";
import ChartSkeleton from "@/components/ui/chartskeleton";
import {
  GrowthStatsWrapper,
  TargetVsActualWrapper,
  YearOverYearWrapper,
} from "../../_components/GrowthWrapper";
import ChartErrorBoundary from "@/components/ui/charterrorboundary";

export default async function Page() {
  const [
    targetVsActualData,
    yoyData,
    growthStat,
  ] = await Promise.all([
    getTargetActualData(),
    getYoYData(),
    getGrowthData(),
  ]);

  const stats = GROWTH_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...growthStat[config.key],
    }),
  );

  return (
    <div className="py-4 md:py-8 px-2 md:px-4">
      <h1 className="font-bold text-xl md:text-2xl truncate">
        Growth Tracker
      </h1>
      <p className="text-gray-500 text-sm md:text-base">
        Month-over-month and year-over-year
        performance analysis
      </p>

      {/* <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3 my-4">
        {stats.map(({ key, ...stat }) => (
          <GrowthTrackCard key={key} {...stat} />
        ))}
      </div> */}

      <ChartErrorBoundary>
        <Suspense fallback={<ChartSkeleton />}>
          <GrowthStatsWrapper />
        </Suspense>
      </ChartErrorBoundary>

      <div className="flex flex-wrap">
        {/* <TargetVsActualChart
          data={targetVsActualData}
        /> */}
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
