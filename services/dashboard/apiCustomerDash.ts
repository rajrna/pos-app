import { AtRiskCustomer } from "@/components/dashboard/cutomerdash/AtRiskCustomer";
import { SegmentData } from "@/components/dashboard/cutomerdash/CustomerSegmentationChart";
import { CustomerTrendData } from "@/components/dashboard/cutomerdash/CustomerTrendChart";
import { TierData } from "@/components/dashboard/cutomerdash/LoyaltyTierChart";
import {
  mockAtRiskCustomers,
  mockCustomerSegmentationData,
  mockCustomerStats,
  mockCustomerTrendData,
  mockTierData,
  mockTopCustomers,
} from "@/components/dashboard/cutomerdash/mock-customer-data";
import { TopCustomer } from "@/components/dashboard/cutomerdash/top-customer-column";
import { CustomerApiResponse } from "@/lib/dashboardstats";

export async function getCustomerStats(): Promise<CustomerApiResponse> {
  return mockCustomerStats;
}

export async function getCustomerSegmentation(): Promise<
  SegmentData[]
> {
  // const res = await fetch("https://api/customers/segmentation", {
  //   next: { revalidate: 3600 },
  // });
  // return res.json();
  return mockCustomerSegmentationData;
}

export async function getLoyaltyTierData(): Promise<
  TierData[]
> {
  return mockTierData;
}

export async function getCustomerTrendData(): Promise<
  CustomerTrendData[]
> {
  return mockCustomerTrendData;
}
export async function getAtRiskCustomers(): Promise<
  AtRiskCustomer[]
> {
  return mockAtRiskCustomers;
}

export async function getTopCustomers(): Promise<
  TopCustomer[]
> {
  return mockTopCustomers;
}
