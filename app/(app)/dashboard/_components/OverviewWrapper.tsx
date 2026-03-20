import HourlySalesTrend from "@/components/dashboard/overviewdash/HourlySalesChart";
import OverviewStatBoxGrid from "@/components/dashboard/overviewdash/OverviewStatGrid";
import SalesLocationChart from "@/components/dashboard/overviewdash/SalesLocationChart";
import WeeklyRevenueChart from "@/components/dashboard/overviewdash/WeeklyRevenueChart";
import WinningStatBox from "@/components/dashboard/overviewdash/WinningStatBox";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import TopItems from "@/components/dashboard/TopItems";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  MergedSerializableConfig,
  STATS_CONFIG,
  WINNING_STAT_CONFIG,
} from "@/lib/config/dashboard";
import { DataPoint } from "@/lib/types/chart";
import {
  getHourlySalesData,
  getRecentTransactions,
  getSalesLocations,
  getStatsData,
  getTopProducts,
  getWeeklyRevenueData,
  getWinningStats,
} from "@/services/dashboard/apiOverview";

export async function OverviewStatsWrapper() {
  const overViewStat = await getStatsData();
  const stats: MergedSerializableConfig[] =
    STATS_CONFIG.map((config) => ({
      ...config,
      ...overViewStat[config.key],
    }));
  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 my-4">
      <OverviewStatBoxGrid stats={stats} />
    </div>
  );
}

export async function WinningStatsWrapper() {
  const winningStat = await getWinningStats();
  const winningStats = WINNING_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...winningStat[config.key],
    }),
  );

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full my-4"
    >
      <CarouselContent className="-ml-3">
        {winningStats.map(({ key, ...stat }) => (
          <CarouselItem
            key={key}
            className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <WinningStatBox key={key} {...stat} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export async function TopItemsWrapper() {
  const data = await getTopProducts();
  return <TopItems topProducts={data} />;
}

export async function RecentTransactionWrapper() {
  const data = await getRecentTransactions();
  return (
    <RecentTransactions transactions={data} />
  );
}

export async function WeeklyRevenueChartWrapper() {
  const data = await getWeeklyRevenueData();
  function computePeakDay(
    data: DataPoint[],
  ): string {
    return data.reduce((peak, curr) =>
      curr.revenue > peak.revenue ? curr : peak,
    ).day;
  }
  const peakDay = computePeakDay(data);
  return (
    <WeeklyRevenueChart
      data={data}
      peakDay={peakDay}
    />
  );
}

export async function SalesLocationChartWrapper() {
  const data = await getSalesLocations();
  return <SalesLocationChart data={data} />;
}

export async function HourlySalesTrendWrapper() {
  const data = await getHourlySalesData();
  return <HourlySalesTrend data={data} />;
}
