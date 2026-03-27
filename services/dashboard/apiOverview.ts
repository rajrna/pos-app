import {
  mockHourlySales,
  mockRecentTransactions,
  mockSalesLocation,
  mockStats,
  mockTopProducts,
  mockWeeklyRevenue,
  mockWinningStats,
} from "@/components/dashboard/overviewdash/mock-overviewdata";
import { DataPoint } from "@/lib/types/chart";
import { HourlyData } from "@/components/dashboard/overviewdash/HourlySalesChart";
import { LocationData } from "@/components/dashboard/overviewdash/SalesLocationChart";
import { Transaction } from "@/components/dashboard/orderhistory/transaction-columns";
import { TopProduct } from "@/components/dashboard/TopItems";
import {
  StatsApiResponse,
  WinningApiResponse,
} from "@/lib/dashboardstats";
import { authHeaders } from "../auth/login/session";
import { RawReportResponse } from "@/lib/types/report";
import { mapReportToStats } from "@/lib/mappers/report";
import { RawBillListResponse } from "@/lib/types/bill";
import { mapBillsToTransactions } from "@/lib/mappers/Transaction";

const BASE = "https://appapi.rebuzzpos.com/api";

export async function getStatsData(): Promise<StatsApiResponse> {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 30);

  const params = new URLSearchParams({
    startDate: startDate
      .toISOString()
      .split("T")[0],
    endDate: today.toISOString().split("T")[0],
    limit: "25",
  });

  const res = await fetch(
    `${BASE}/business/report?${params}`,
    {
      headers: await authHeaders(),
    },
  );

  if (!res.ok)
    throw new Error(
      `Failed to fetch stats: ${res.status}`,
    );

  const data: RawReportResponse =
    await res.json();
  return mapReportToStats(data);
}

export async function getWinningStats(): Promise<WinningApiResponse> {
  return mockWinningStats;
}

export async function getTopProducts(): Promise<
  TopProduct[]
> {
  return mockTopProducts;
}

// export async function getRecentTransactions(): Promise<
//   Transaction[]
// > {
//   return mockRecentTransactions;
// }
export async function getRecentTransactions(): Promise<
  Transaction[]
> {
  const res = await fetch(
    `${BASE}/business/ticket/bills?limit=4`,
    {
      headers: await authHeaders(),
    },
  );

  if (!res.ok)
    throw new Error(
      `Failed to fetch transactions: ${res.status}`,
    );

  const data: RawBillListResponse =
    await res.json();
  return mapBillsToTransactions(data);
  // return mockTransactions;
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
