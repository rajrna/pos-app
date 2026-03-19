import {
  StatsApiResponse,
  WinningApiResponse,
} from "@/lib/dashboardstats";
import {
  STATS_CONFIG,
  WINNING_STAT_CONFIG,
} from "@/lib/config/dashboard";

import TopItems from "@/components/dashboard/TopItems";
import WinningStatBox from "@/components/dashboard/overviewdash/WinningStatBox";
import OverviewStatBox from "@/components/dashboard/overviewdash/OverviewStatBox";
import HourlySalesTrend from "@/components/dashboard/overviewdash/HourlySalesChart";
import SalesLocationChart from "@/components/dashboard/overviewdash/SalesLocationChart";
import WeeklyRevenueChart from "@/components/dashboard/overviewdash/WeeklyRevenueChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  getHourlySalesData,
  getRecentTransactions,
  getSalesLocations,
  getTopProducts,
  getWeeklyRevenueData,
} from "@/services/dashboard/apiOverview";
import { DataPoint } from "@/lib/types/chart";

const mockStats: StatsApiResponse = {
  totalSales: {
    value: "$999,999",
    percent: 12,
  },
  totalOrders: {
    value: "1234",
    percent: 10,
  },
  productsSold: {
    value: "123",
    percent: 10,
  },
  netProfit: {
    value: "$12000",
    percent: -10,
  },
};

const mockWinningStats: WinningApiResponse = {
  topSellingProduct: {
    value: "Classic Latte",
  },
  peakHour: {
    value: "10AM - 11AM",
  },
  bestDay: {
    value: "Sunday",
  },
};

function computePeakDay(
  data: DataPoint[],
): string {
  return data.reduce((peak, curr) =>
    curr.revenue > peak.revenue ? curr : peak,
  ).day;
}

export default async function Page() {
  const stats = STATS_CONFIG.map((config) => ({
    ...config,
    ...mockStats[config.key],
  }));
  const winningStats = WINNING_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...mockWinningStats[config.key],
    }),
  );

  const [
    topProducts,
    recentTransactions,
    weeklyRevenue,
    locationData,
    hourlySalesData,
  ] = await Promise.all([
    getTopProducts(),
    getRecentTransactions(),
    getWeeklyRevenueData(),
    getSalesLocations(),
    getHourlySalesData(),
  ]);
  const peakDay = computePeakDay(weeklyRevenue);
  return (
    <div className="w-full px-4">
      {/* ACTUAL CONTENTS */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 my-4">
          {stats.map(({ key, ...stat }) => (
            <OverviewStatBox
              key={key}
              {...stat}
            />
          ))}
        </div>

        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full my-4"
        >
          <CarouselContent className="-ml-3">
            {winningStats.map(
              ({ key, ...stat }) => (
                <CarouselItem
                  key={key}
                  className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <WinningStatBox
                    key={key}
                    {...stat}
                  />
                </CarouselItem>
              ),
            )}
          </CarouselContent>
        </Carousel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          <TopItems topProducts={topProducts} />
          <RecentTransactions
            transactions={recentTransactions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4">
          <WeeklyRevenueChart
            data={weeklyRevenue}
            peakDay={peakDay}
          />
          <SalesLocationChart
            data={locationData}
          />
        </div>

        <HourlySalesTrend
          data={hourlySalesData}
        />
      </div>
    </div>
  );
}
