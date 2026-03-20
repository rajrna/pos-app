import { GROWTH_STAT_CONFIG } from "@/lib/config/dashboard";

import GrowthTrackCard from "@/components/dashboard/growthtracker/GrowthTrackCard";
import YearOverYearChart from "@/components/dashboard/growthtracker/YearOverYearChart";
import TargetVsActualChart from "@/components/dashboard/growthtracker/TargetVsActualChart";
import {
  getGrowthData,
  getTargetActualData,
  getYoYData,
} from "@/services/dashboard/apiGrowth";

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

      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3 my-4">
        {stats.map(({ key, ...stat }) => (
          <GrowthTrackCard key={key} {...stat} />
        ))}
      </div>

      <div className="flex flex-wrap">
        <TargetVsActualChart
          data={targetVsActualData}
        />
        <YearOverYearChart data={yoyData} />
      </div>
    </div>
  );
}
