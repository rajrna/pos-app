import {
  emptyData,
  mockGrowthStats,
  mockTargetActualData,
  mockYearOverYearData,
} from "@/components/dashboard/growthtracker/mock-growthtrackerdata";
import { TargetActualData } from "@/components/dashboard/growthtracker/TargetVsActualChart";
import { YoYData } from "@/components/dashboard/growthtracker/YearOverYearChart";
import { GrowthStatsApiResponse } from "@/lib/dashboardstats";

export async function getGrowthData(): Promise<GrowthStatsApiResponse> {
  return mockGrowthStats;
}

export async function getTargetActualData(): Promise<
  TargetActualData[]
> {
  return mockTargetActualData;
}

export async function getYoYData(): Promise<
  YoYData[]
> {
  // const res = await fetch("https://api/revenue/yoy", {
  //   next: { revalidate: 3600 },
  // });
  // return res.json();
  // return mockYearOverYearData;
  return emptyData;
}
