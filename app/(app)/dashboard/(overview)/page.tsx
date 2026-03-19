import {
  StatsApiResponse,
  WinningApiResponse,
} from "@/lib/dashboardstats";
import {
  STATS_CONFIG,
  WINNING_STAT_CONFIG,
} from "@/lib/config/dashboard";

import TopItems from "@/components/dashboard/TopItems";
import WinningStatBox from "@/components/dashboard/WinningStatBox";
import OverviewStatBox from "@/components/dashboard/OverviewStatBox";
import HourlySalesTrend from "@/components/dashboard/HourlySalesChart";
import SalesLocationChart from "@/components/dashboard/SalesLocationChart";
import WeeklyRevenueChart from "@/components/dashboard/WeeklyRevenueChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

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

export default function Page() {
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

        <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3 my-4">
          {winningStats.map(
            ({ key, ...stat }) => (
              <WinningStatBox
                key={key}
                {...stat}
              />
            ),
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          <TopItems
            topProducts={[
              {
                rank: 1,
                productName: "Black Coffee",
                noOfSale: 10,
                totalRevenue: 500,
              },
              {
                rank: 2,
                productName: "Sandwich",
                noOfSale: 5,
                totalRevenue: 300,
              },
              {
                rank: 3,
                productName: "Latte",
                noOfSale: 8,
                totalRevenue: 250,
              },
            ]}
          />
          <RecentTransactions
            transactions={[
              {
                id: "ORD-421",
                timestamp: "2 min ago",
                customer: "Alex Johnson",
                amount: 28.5,
                status: "completed",
              },
              {
                id: "ORD-420",
                timestamp: "15 min ago",
                customer: "Maria Garcia",
                amount: 14.0,
                status: "pending",
              },
              {
                id: "ORD-419",
                timestamp: "1 hr ago",
                customer: "James Lee",
                amount: 52.75,
                status: "failed",
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WeeklyRevenueChart />
          <SalesLocationChart />
        </div>

        <HourlySalesTrend />
      </div>
    </div>
  );
}
