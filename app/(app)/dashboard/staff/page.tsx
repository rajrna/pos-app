import CustomerSegmentationChart from "@/components/dashboard/cutomerdash/CustomerSegmentationChart";
import LoyaltyTierChart from "@/components/dashboard/cutomerdash/LoyaltyTierChart";
import StaffStatBox from "@/components/dashboard/staffdash/StaffStatBox";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center w-full  py-2 border-b-2">
        <div className="py-4">
          {/* FOR HEADER TEXT */}
          <h1 className="font-bold text-2xl">
            Staff Performance
          </h1>
          <p className="text-gray-500">
            Insights into employee productivity
            and shift efficiency.
          </p>
        </div>
        <div className="mx-3">
          {/* FOR HEADER BUTTONS*/}
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-2xl">
            <UserPlus />
            <Link href="/customers/add">
              Manage Staff
            </Link>
          </Button>
        </div>
      </div>

      {/* CONTENTS */}
      <div>
        <div className="flex flex-wrap items-center justify-center my-4 gap-2">
          <StaffStatBox
            staffInitials="AM"
            staffName="Arthur Morgan"
            staffPosition="Senior Barista"
            ordersTaken={5}
            avgTime={4.5}
            rating={4.9}
            shiftTime="Morning"
            amount={5000}
          />
          <StaffStatBox
            staffInitials="DV"
            staffName="Dutch Vadrlind"
            staffPosition="Senior Barista"
            ordersTaken={3}
            avgTime={4.8}
            rating={4.2}
            shiftTime="Morning"
            amount={2000}
          />
          <StaffStatBox
            staffInitials="JM"
            staffName="John Marston"
            staffPosition="Barista"
            ordersTaken={6}
            avgTime={4.3}
            rating={4.7}
            shiftTime="Afternoon"
            amount={3000}
          />
          <StaffStatBox
            staffInitials="CC"
            staffName="Charles"
            staffPosition="Barista"
            ordersTaken={7}
            avgTime={4.3}
            rating={4.7}
            shiftTime="Evening"
            amount={2000}
          />
          <StaffStatBox
            staffInitials="MM"
            staffName="Micah"
            staffPosition="Barista"
            ordersTaken={2}
            avgTime={5}
            rating={2.5}
            shiftTime="Evening"
            amount={1000}
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
