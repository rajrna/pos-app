import CustomerSegmentationChart from "@/components/dashboard/cutomerdash/CustomerSegmentationChart";
import CustomerStatBox from "@/components/dashboard/cutomerdash/CustomerStatBox";
import LoyaltyTierChart from "@/components/dashboard/cutomerdash/LoyaltyTierChart";
import { Button } from "@/components/ui/button";
import {
  Award,
  Gift,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
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
          <CustomerStatBox
            statTitle="Total Members"
            amount={50}
            icon={Users}
            iconColor={"text-blue-500"}
            bgColor={"blue"}
          />
          <CustomerStatBox
            statTitle="Active This Month"
            amount={20}
            icon={User}
            iconColor={"text-green-500"}
            bgColor={"green"}
          />
          <CustomerStatBox
            statTitle="Points Redeemed"
            amount={1100}
            icon={Gift}
            iconColor={"text-purple-500"}
            bgColor={"purple"}
          />
          <CustomerStatBox
            statTitle="Avg Points / Member"
            amount={50}
            icon={Award}
            iconColor={"text-orange-500"}
            bgColor={"orange"}
          />
        </div>
        <div className="flex flex-wrap items-stretch gap-4 px-4 my-4">
          <CustomerSegmentationChart />
          <LoyaltyTierChart />
        </div>
      </div>
    </div>
  );
}
