import { HourlyData } from "@/components/dashboard/overviewdash/HourlySalesChart";
import {
  mockHourlySales,
  mockRecentTransactions,
  mockSalesLocation,
  mockTopProducts,
  mockWeeklyRevenue,
} from "@/components/dashboard/overviewdash/mock-overviewdata";
import { LocationData } from "@/components/dashboard/overviewdash/SalesLocationChart";

import { Transaction } from "@/components/dashboard/RecentTransactions";
import { TopProduct } from "@/components/dashboard/TopItems";
import { DataPoint } from "@/lib/types/chart";

export async function getTopProducts(): Promise<
  TopProduct[]
> {
  return mockTopProducts;
}

export async function getRecentTransactions(): Promise<
  Transaction[]
> {
  return mockRecentTransactions;
}

export async function getWeeklyRevenueData(): Promise<
  DataPoint[]
> {
  //   const res = await fetch(
  //     "https://api/weekly-revenue",
  //     {
  //       next: { revalidate: 3600 }, // ISR: revalidate every hour
  //     },
  //   );
  //   return res.json();
  return mockWeeklyRevenue;
}

export async function getSalesLocations(): Promise<
  LocationData[]
> {
  //   const res = await fetch(
  //     "https://api.com/sales-locations",
  //     {
  //       next: { revalidate: 3600 },
  //     },
  //   );
  //   return res.json();
  return mockSalesLocation;
}
export async function getHourlySalesData(): Promise<
  HourlyData[]
> {
  //   const res = await fetch(
  //     "https://api.com/sales-locations",
  //     {
  //       next: { revalidate: 3600 },
  //     },
  //   );
  //   return res.json();
  return mockHourlySales;
}
