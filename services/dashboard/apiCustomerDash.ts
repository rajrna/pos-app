import { AtRiskCustomer } from "@/components/dashboard/cutomerdash/AtRiskCustomer";
import {
  mockAtRiskCustomers,
  mockCustomerStats,
  mockTopCustomers,
} from "@/components/dashboard/cutomerdash/mock-customer-data";
import { TopCustomer } from "@/components/dashboard/cutomerdash/top-customer-column";
import { CustomerStat } from "@/lib/dashboardstats";

// export async function getCustomerStats(): Promise<
//   CustomerStat[]
// > {
//   return mockCustomerStats;
// }

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
