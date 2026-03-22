import {
  mockShiftAnalysisData,
  mockStaffData,
  mockStaffHourlyOrderData,
  mockStaffRevenue,
} from "@/components/dashboard/staffdash/mock-staffdata";
import { Shift } from "@/components/dashboard/staffdash/ShiftAnalysisReport";
import { StaffRevenue } from "@/components/dashboard/staffdash/RevenueStaffChart";
import { StaffBoxProps } from "@/components/dashboard/staffdash/StaffStatBox";
import { StaffHourlyData } from "@/components/dashboard/staffdash/StaffOrdersChart";

export async function getStaffRevenue(): Promise<
  StaffRevenue[]
> {
  return mockStaffRevenue;
}

export async function getStaffOrdersPerHour(): Promise<
  StaffHourlyData[]
> {
  return mockStaffHourlyOrderData;
}

export async function getShiftAnalysisData(): Promise<
  Shift[]
> {
  return mockShiftAnalysisData;
}

export async function getStaffData(): Promise<
  StaffBoxProps[]
> {
  return mockStaffData;
}
// async function getShifts(): Promise<Shift[]> {
//   const res = await fetch("https://api", {
//     next: { revalidate: 3600 }
//   });
//   if (!res.ok) throw new Error("Failed to fetch shifts");
//   return res.json();
// }
