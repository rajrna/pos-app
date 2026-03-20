import GrowthTrackCard from "@/components/dashboard/growthtracker/GrowthTrackCard";
import TargetVsActualChart from "@/components/dashboard/growthtracker/TargetVsActualChart";
import YearOverYearChart from "@/components/dashboard/growthtracker/YearOverYearChart";
import { GROWTH_STAT_CONFIG } from "@/lib/config/dashboard";
import {
  getGrowthData,
  getTargetActualData,
  getYoYData,
} from "@/services/dashboard/apiGrowth";

export async function GrowthStatsWrapper() {
  const growthStat = await getGrowthData();
  const stats = GROWTH_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...growthStat[config.key],
    }),
  );
  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3 my-4">
      {stats.map(({ key, ...stat }) => (
        <GrowthTrackCard key={key} {...stat} />
      ))}
    </div>
  );
}

export async function TargetVsActualWrapper() {
  const data = await getTargetActualData();
  return <TargetVsActualChart data={data} />;
}

export async function YearOverYearWrapper() {
  const data = await getYoYData();
  return <YearOverYearChart data={data} />;
}
