import Link from "next/link";

import {
  CreditCard,
  DollarSign,
  Flame,
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import SalesLocationChart from "@/components/dashboard/SalesLocationChart";
import StatBox from "@/components/dashboard/StatBox";
import WinningStatBox from "@/components/dashboard/WinningStatBox";
import WeeklyRevenueChart from "@/components/dashboard/WeeklyRevenueChart";
import HourlySalesTrend from "@/components/dashboard/HourlySalesChart";
import TopItems from "@/components/dashboard/TopItems";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function Page() {
  return (
    <div className="  w-full px-4">
      <div className="flex justify-between items-center w-full  py-2">
        <div className="py-4">
          {/* FOR HEADER TEXT */}
          <h1 className="font-bold text-2xl">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome back, Ek. Here&apos;s
            what&apos;s happening with Rebuzz POS
          </p>
        </div>
        <div className="mx-3">
          {/* FOR HEADER BUTTONS*/}

          <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-2xl">
            {/* <Plus /> */}
            <Link href="/invoices/add">
              Create order
            </Link>
          </Button>
        </div>
      </div>
      <div className="px-2 flex items-center justify-between border-b-2 py-2">
        <div className="gap-2 flex">
          {/* for buttons */}
          <Button>
            <LayoutDashboard />
            Overview
          </Button>
          <Button>
            <TrendingUp />
            Growth Tracker
          </Button>
          <Button>
            <Flame />
            Heatmap
          </Button>
        </div>
        <div className="flex justify-between items-center gap-1">
          <p className="text-gray-400">
            FILTER BY:
          </p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Last week" />
            </SelectTrigger>
          </Select>
        </div>
      </div>

      {/* ACTUAL CONTENTS */}
      <div>
        <div className="flex flex-wrap items-center justify-center my-4 gap-2">
          <StatBox
            statTitle="Total Sales"
            amount={999999}
            percent={12}
            icon={DollarSign}
            iconColor={"text-blue-500"}
          />
          <StatBox
            statTitle="Total Orders"
            amount={1234}
            percent={10}
            icon={ShoppingBag}
            iconColor={"text-purple-500"}
          />
          <StatBox
            statTitle="Total Orders"
            amount={1234}
            percent={10}
            icon={Package}
            iconColor={"text-red-500"}
          />
          <StatBox
            statTitle="Total Orders"
            amount={1234}
            percent={10}
            icon={CreditCard}
            iconColor={"text-green-500"}
          />
        </div>

        <WinningStatBox />
        {/* CHARTS */}
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
