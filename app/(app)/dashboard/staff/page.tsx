import RevenueStaffChart from "@/components/dashboard/staffdash/RevenueStaffChart";
import ShiftAnalysisReport from "@/components/dashboard/staffdash/ShiftAnalysisReport";
import StaffOrdersChart from "@/components/dashboard/staffdash/StaffOrdersChart";
import StaffStatBox from "@/components/dashboard/staffdash/StaffStatBox";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { UserPlus } from "lucide-react";
import Link from "next/link";

// async function getShifts(): Promise<Shift[]> {
//   const res = await fetch("https://api", {
//     next: { revalidate: 3600 }
//   });
//   if (!res.ok) throw new Error("Failed to fetch shifts");
//   return res.json();
// }
const staffData = [
  {
    staffInitials: "AM",
    staffName: "Arthur Morgan",
    staffPosition: "Senior Barista",
    ordersTaken: 5,
    avgTime: 4.5,
    rating: 4.9,
    shiftTime: "Morning",
    amount: 5000,
  },
  {
    staffInitials: "DV",
    staffName: "Dutch Vadrlind",
    staffPosition: "Senior Barista",
    ordersTaken: 3,
    avgTime: 4.8,
    rating: 4.2,
    shiftTime: "Morning",
    amount: 2000,
  },
  {
    staffInitials: "JM",
    staffName: "John Marston",
    staffPosition: "Barista",
    ordersTaken: 6,
    avgTime: 4.3,
    rating: 4.7,
    shiftTime: "Afternoon",
    amount: 3000,
  },
  {
    staffInitials: "CC",
    staffName: "Charles",
    staffPosition: "Barista",
    ordersTaken: 7,
    avgTime: 4.3,
    rating: 4.7,
    shiftTime: "Evening",
    amount: 2000,
  },
  {
    staffInitials: "MM",
    staffName: "Micah",
    staffPosition: "Barista",
    ordersTaken: 2,
    avgTime: 5,
    rating: 2.5,
    shiftTime: "Evening",
    amount: 1000,
  },
];

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
          <Button className="bg-blue-600 hover:bg-blue-700 px-4 md:px-6 py-3 text-white rounded-2xl">
            <UserPlus />
            <Link href="/customers/add">
              Manage Staff
            </Link>
          </Button>
        </div>
      </div>

      {/* CONTENTS */}
      <div>
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full my-4"
        >
          <CarouselContent className="-ml-3">
            {staffData.map((staff) => (
              <CarouselItem
                key={staff.staffName}
                className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <StaffStatBox {...staff} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className=" my-4">
          <StaffOrdersChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          <ShiftAnalysisReport
            shifts={[
              {
                label: "Morning (7–1pm)",
                orders: 680,
                avgTime: "4.2m",
                revenue: "$1600",
                staff: 3,
              },
              {
                label: "Afternoon (1–5pm)",
                orders: 520,
                avgTime: "3.8m",
                revenue: "$1200",
                staff: 2,
              },
              {
                label: "Evening (5–9pm)",
                orders: 310,
                avgTime: "5.1m",
                revenue: "$900",
                staff: 2,
              },
            ]}
          />
          <RevenueStaffChart />
        </div>
      </div>
    </div>
  );
}
