import Link from "next/link";

import { UserPlus } from "lucide-react";

import { CUSTOMER_STAT_CONFIG } from "@/lib/config/dashboard";

import { Button } from "@/components/ui/button";
import TopCustomer from "@/components/dashboard/cutomerdash/TopCustomer";
import AtRiskCustomer from "@/components/dashboard/cutomerdash/AtRiskCustomer";
import CustomerStatBox from "@/components/dashboard/cutomerdash/CustomerStatBox";
import LoyaltyTierChart from "@/components/dashboard/cutomerdash/LoyaltyTierChart";
import CustomerTrendChart from "@/components/dashboard/cutomerdash/CustomerTrendChart";
import { mockCustomerStats } from "@/components/dashboard/cutomerdash/mock-customer-data";
import CustomerSegmentationChart from "@/components/dashboard/cutomerdash/CustomerSegmentationChart";
import {
  getAtRiskCustomers,
  getTopCustomers,
} from "@/services/dashboard/apiCustomerDash";

export default async function Page() {
  const stats = CUSTOMER_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...mockCustomerStats[config.key],
    }),
  );

  const [topCustomers, atRiskCustomers] =
    await Promise.all([
      getTopCustomers(),
      getAtRiskCustomers(),
    ]);
  return (
    <div className="p-3 md:p-6">
      <div className="flex justify-between items-center w-full  py-2 border-b-2">
        <div className="py-2 min-w-0">
          {/* FOR HEADER TEXT */}
          <h1 className="font-bold text-xl md:text-2xl truncate">
            Customer Analytics
          </h1>
          <p className="text-gray-500 text-sm md:text-base hidden sm:block">
            Insights into customer behavior and
            retention.
          </p>
        </div>
        <div className="shrink-0">
          {/* FOR HEADER BUTTONS*/}
          <Button className="bg-blue-600 hover:bg-blue-700 px-3 md:px-6 py-3 text-white rounded-2xl">
            <UserPlus className="shrink-0" />
            <Link href="/customers/add">
              New Customer
            </Link>
          </Button>
        </div>
      </div>

      {/* CONTENTS */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 my-4">
          {stats.map(({ key, ...stat }) => (
            <CustomerStatBox
              key={key}
              {...stat}
            />
          ))}
        </div>
        {/* <div className="flex flex-wrap items-stretch gap-4 px-4 my-4"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomerSegmentationChart />
          <LoyaltyTierChart />
        </div>
        <CustomerTrendChart />
        <AtRiskCustomer
          riskCustomers={atRiskCustomers}
        />
        <TopCustomer
          topCustomers={topCustomers}
        />
      </div>
    </div>
  );
}
