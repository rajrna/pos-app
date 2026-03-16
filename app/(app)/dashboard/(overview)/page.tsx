import SalesLocationChart from "@/components/dashboard/SalesLocationChart";
import StatBox from "@/components/dashboard/StaffStatBox";
import WinningStatBox from "@/components/dashboard/WinningStatBox";
import WeeklyRevenueChart from "@/components/dashboard/WeeklyRevenueChart";
import HourlySalesTrend from "@/components/dashboard/HourlySalesChart";
import TopItems from "@/components/dashboard/TopItems";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { StatsApiResponse } from "@/lib/dashboardstats";
import { STATS_CONFIG } from "@/lib/config/dashboard";

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

export default function Page() {
  const stats = STATS_CONFIG.map((config) => ({
    ...config,
    ...mockStats[config.key],
  }));
  return (
    <div className="w-full px-4">
      {/* ACTUAL CONTENTS */}
      <div>
        <div className="flex flex-wrap items-center justify-center my-4 gap-2">
          {stats.map(({ key, ...stat }) => (
            <StatBox key={key} {...stat} />
          ))}
        </div>

        <WinningStatBox />

        <div className="flex flex-wrap items-stretch gap-4 px-4 my-4">
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
                amount: "$28.50",
                status: "completed",
              },
              {
                id: "ORD-420",
                timestamp: "15 min ago",
                customer: "Maria Garcia",
                amount: "$14.00",
                status: "pending",
              },
              {
                id: "ORD-419",
                timestamp: "1 hr ago",
                customer: "James Lee",
                amount: "$52.75",
                status: "failed",
              },
            ]}
          />
        </div>

        <div className="flex flex-wrap items-stretch gap-4 px-4 my-4">
          <WeeklyRevenueChart />
          <SalesLocationChart />
        </div>

        <HourlySalesTrend />
      </div>
    </div>
  );
}
