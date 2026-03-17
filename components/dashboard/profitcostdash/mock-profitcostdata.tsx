import { ProfitCostApiResponse } from "@/lib/dashboardstats";
import { BudgetItem } from "./budget-column";
import { Product } from "./profit-per-product-column";
import { RefundReason } from "./refund-analysis-column";

export const mockProfitStats: ProfitCostApiResponse =
  {
    grossRevenue: { value: "$50,000" },
    netProfit: { value: "$30,000" },
    totalRefunds: { value: "50" },
    avgMargin: { value: "60%" },
  };

export const mockRefundReason: RefundReason[] = [
  {
    name: "Change of Heart",
    count: 10,
    loss: 500,
  },
  {
    name: "Wrong Order",
    count: 20,
    loss: 1000,
  },
  {
    name: "Quality Issue",
    count: 4,
    loss: 150,
  },
  {
    name: "Out of Stock",
    count: 10,
    loss: 300,
  },
];

export const mockProfitPerProduct: Product[] = [
  {
    name: "Coffee",
    revenue: 5000,
    cogs: 1000,
    profit: 4000,
    margin: 20,
  },
  {
    name: "Classic Latte",
    revenue: 18000,
    cogs: 5400,
    profit: 12600,
    margin: 70,
  },
  {
    name: "Avocado Toast",
    revenue: 16200,
    cogs: 5670,
    profit: 10530,
    margin: 52,
  },
  {
    name: "Cappucino",
    revenue: 14700,
    cogs: 4410,
    profit: 10290,
    margin: 70,
  },
  {
    name: "Cold Brew",
    revenue: 10800,
    cogs: 3780,
    profit: 7020,
    margin: 65,
  },
];

export const mockBudgetData: BudgetItem[] = [
  {
    category: "Labor",
    actual: 18800,
    budget: 19000,
  },
  {
    category: "COGS",
    actual: 10800,
    budget: 11500,
  },
  {
    category: "Rent",
    actual: 6500,
    budget: 6500,
  },
  {
    category: "Utilities",
    actual: 2800,
    budget: 3000,
  },
  {
    category: "Marketing",
    actual: 3200,
    budget: 4000,
  },
  {
    category: "Supplies",
    actual: 1800,
    budget: 2000,
  },
  {
    category: "Maintenance",
    actual: 1200,
    budget: 2000,
  },
];
