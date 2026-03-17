import { ProfitCostApiResponse } from "@/lib/dashboardstats";

import {
  mockBudgetData,
  mockProfitPerProduct,
  mockProfitStats,
  mockRefundReason,
} from "@/components/dashboard/profitcostdash/mock-profitcostdata";
import { Product } from "@/components/dashboard/profitcostdash/profit-per-product-column";
import { BudgetItem } from "@/components/dashboard/profitcostdash/budget-column";
import { RefundReason } from "@/components/dashboard/profitcostdash/refund-analysis-column";

export async function getProfitStats(): Promise<ProfitCostApiResponse> {
  return mockProfitStats;
}

export async function getRefundReason(): Promise<
  RefundReason[]
> {
  return mockRefundReason;
}

export async function getProfitPerProduct(): Promise<
  Product[]
> {
  return mockProfitPerProduct;
}

export async function getBudgetData(): Promise<
  BudgetItem[]
> {
  return mockBudgetData;
}
