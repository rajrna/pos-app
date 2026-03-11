import SalesLocationChart from "@/components/dashboard/SalesLocationChart";
import StatBox from "@/components/dashboard/StatBox";
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

          {/* <StatBox
            statTitle="Total Sales"
            amount={999999}
            percent={12}
            icon={DollarSign}
            iconColor="text-blue-500"
          />
          <StatBox
            statTitle="Total Orders"
            amount={1234}
            percent={10}
            icon={ShoppingBag}
            iconColor="text-purple-500"
          />
          <StatBox
            statTitle="Total Orders"
            amount={1234}
            percent={10}
            icon={Package}
            iconColor="text-red-500"
          />
          <StatBox
            statTitle="Total Orders"
            amount={1234}
            percent={10}
            icon={CreditCard}
            iconColor="text-green-500"
          /> */}
        </div>

        <WinningStatBox />

        <div className="flex flex-wrap items-stretch gap-4 px-4 my-4">
          <WeeklyRevenueChart />
          <SalesLocationChart />
        </div>

        <HourlySalesTrend />

        <div className="flex flex-wrap items-stretch gap-4 px-4 my-4">
          <TopItems />
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
      </div>
    </div>
  );
}
