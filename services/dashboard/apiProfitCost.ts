import { ProfitCostApiResponse } from "@/lib/dashboardstats";

import {
  mockBudgetData,
  mockCostStats,
  mockExpenseByCategoryData,
  mockGrossProfitTrendData,
  mockProfitPerProduct,
  mockProfitStats,
  mockRefundReason,
} from "@/components/dashboard/profitcostdash/mock-profitcostdata";
import { Product } from "@/components/dashboard/profitcostdash/profit-per-product-column";
import { BudgetItem } from "@/components/dashboard/profitcostdash/budget-column";
import { RefundReason } from "@/components/dashboard/profitcostdash/refund-analysis-column";
import { ProfitTrendData } from "@/components/dashboard/profitcostdash/GrossProfitTrendChart";
import { ExpenseCategory } from "@/components/dashboard/profitcostdash/ExpenseByCategoryChart";

export async function getProfitStats(): Promise<ProfitCostApiResponse> {
  return mockProfitStats;
}

export async function getExpenseStats(): Promise<ProfitCostApiResponse> {
  return mockCostStats;
}

export async function getGrossProfitTrendData(): Promise<
  ProfitTrendData[]
> {
  return mockGrossProfitTrendData;
}
export async function getRefundReason(): Promise<
  RefundReason[]
> {
  return mockRefundReason;
}

export async function getExpenseByCategoryData(): Promise<
  ExpenseCategory[]
> {
  return mockExpenseByCategoryData;
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
