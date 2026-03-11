import GrowthTrackCard from "@/components/dashboard/growthtracker/GrowthTrackCard";
import { GROWTH_STAT_CONFIG } from "@/lib/config/dashboard";
import { GrowthStatsApiResponse } from "@/lib/dashboardstats";

const mockGrowthStats: GrowthStatsApiResponse = {
  revenue: {
    value: "$124,500",
    prev: "$116,900",
    percent: 6.4,
  },
  orders: {
    value: "1,420",
    prev: "1,342",
    percent: 5.8,
  },
  avgOrder: {
    value: "$88.60",
    prev: "$86.40",
    percent: 2.1,
  },
  customers: {
    value: "700",
    prev: "641",
    percent: 9.2,
  },
  margin: {
    value: "34.0%",
    prev: "34.8%",
    percent: -0.8,
  },
  refunds: {
    value: "3.1%",
    prev: "3.4%",
    percent: -0.3,
  },
};

// const apiData: GrowthStatsApiResponse = await fetchGrowthStats();

export default function Page() {
  const stats = GROWTH_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...mockGrowthStats[config.key],
    }),
  );
  return (
    <div className="py-8 px-4">
      <h1 className="font-semibold text-xl">
        Growth Tracker
      </h1>
      <p className="text-gray-600">
        Month-over-month and year-over-year
        performance analysis
      </p>

      <div className="flex flex-wrap items-center justify-center my-4 gap-2">
        {stats.map(({ key, ...stat }) => (
          <GrowthTrackCard key={key} {...stat} />
        ))}
      </div>
    </div>
  );
}
