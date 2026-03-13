import AtRiskCustomer from "@/components/dashboard/cutomerdash/AtRiskCustomer";
import CustomerSegmentationChart from "@/components/dashboard/cutomerdash/CustomerSegmentationChart";
import CustomerStatBox from "@/components/dashboard/cutomerdash/CustomerStatBox";
import CustomerTrendChart from "@/components/dashboard/cutomerdash/CustomerTrendChart";
import LoyaltyTierChart from "@/components/dashboard/cutomerdash/LoyaltyTierChart";
import TopCustomer from "@/components/dashboard/cutomerdash/TopCustomer";
import { Button } from "@/components/ui/button";
import { CUSTOMER_STAT_CONFIG } from "@/lib/config/dashboard";
import { CustomerApiResponse } from "@/lib/dashboardstats";
import { UserPlus } from "lucide-react";
import Link from "next/link";

const mockStats: CustomerApiResponse = {
  totalMembers: { value: "50" },
  activeCustomers: { value: "100" },
  pointsRedeemed: { value: "5000" },
  pointsPerMember: { value: "120" },
};

export default function Page() {
  const stats = CUSTOMER_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...mockStats[config.key],
    }),
  );
  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center w-full  py-2 border-b-2">
        <div className="py-4">
          {/* FOR HEADER TEXT */}
          <h1 className="font-bold text-2xl">
            Customer Analytics
          </h1>
          <p className="text-gray-500">
            Insights into customer behavior and
            retention.
          </p>
        </div>
        <div className="mx-3">
          {/* FOR HEADER BUTTONS*/}
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-2xl">
            <UserPlus />
            <Link href="/customers/add">
              New Customer
            </Link>
          </Button>
        </div>
      </div>

      {/* CONTENTS */}
      <div>
        <div className="flex flex-wrap items-center justify-center my-4 gap-2">
          {stats.map(({ key, ...stat }) => (
            <CustomerStatBox
              key={key}
              {...stat}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-stretch gap-4 px-4 my-4">
          <CustomerSegmentationChart />
          <LoyaltyTierChart />
        </div>
        <CustomerTrendChart />
        <AtRiskCustomer
          riskCustomers={[
            {
              rank: 1,
              name: "Mary Linton",
              lastVisit: 15,
              spendLevel: "High",
            },
            {
              rank: 2,
              name: "Strauss",
              lastVisit: 2,
              spendLevel: "Medium",
            },
          ]}
        />
        <TopCustomer
          topCustomers={[
            {
              rank: 1,
              name: "Lenny",
              numVisits: 11,
              totalSpent: 60,
              loyaltyTier: "Gold",
              loyaltyPoints: 60,
            },
            {
              rank: 2,
              name: "Sadie Adler",
              numVisits: 10,
              totalSpent: 50,
              loyaltyTier: "Gold",
              loyaltyPoints: 50,
            },
            {
              rank: 3,
              name: "Uncle",
              numVisits: 5,
              totalSpent: 30,
              loyaltyTier: "Silver",
              loyaltyPoints: 30,
            },
          ]}
        />
      </div>
    </div>
  );
}
