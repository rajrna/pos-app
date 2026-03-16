import { BudgetItem } from "@/components/dashboard/profitcostdash/budget-column";
import BudgetTable from "@/components/dashboard/profitcostdash/BudgetTable";
import ExpensesByCategoryChart from "@/components/dashboard/profitcostdash/ExpenseByCategoryChart";
import ExpenseStatBox from "@/components/dashboard/profitcostdash/ExpenseStatBox";
import GrossProfitTrendChart from "@/components/dashboard/profitcostdash/GrossProfitTrendChart";
import ProfitCostStatBox from "@/components/dashboard/profitcostdash/ProfitCostStatBox";
import ProfitPerProduct from "@/components/dashboard/profitcostdash/ProfitPerProduct";
import RefundAnalysis from "@/components/dashboard/profitcostdash/RefundAnalysis";
import { Button } from "@/components/ui/button";
import {
  EXPENSE_STAT_CONFIG,
  PROFIT_COST_STAT_CONFIG,
} from "@/lib/config/dashboard";
import {
  ExpenseApiResponse,
  ProfitCostApiResponse,
} from "@/lib/dashboardstats";
import { TrendingUp } from "lucide-react";

const mockStats: ProfitCostApiResponse = {
  grossRevenue: { value: "$50,000" },
  netProfit: { value: "$30,000" },
  totalRefunds: { value: "50" },
  avgMargin: { value: "60%" },
};
const mockCostStats: ExpenseApiResponse = {
  totalExpenses: { value: "$50,000" },
  totalBudget: { value: "$47,000" },
  budgetVariance: { value: "3000 under" },
  revenueMargin: { value: "60%" },
};
export const mockBudgetData: BudgetItem[] = [
  {
    category: "Labor",
    actual: 18200,
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

export default function Page() {
  const stats = PROFIT_COST_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...mockStats[config.key],
    }),
  );

  const expenseStats = EXPENSE_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...mockCostStats[config.key],
    }),
  );
  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center w-full  py-2 border-b-2">
        <div className="py-4">
          {/* FOR HEADER TEXT */}
          <h1 className="font-bold text-2xl">
            Profit & Cost
          </h1>
          <p className="text-gray-500">
            Financial health and margin analysis.
          </p>
        </div>
        <div className="mx-3">
          {/* FOR HEADER BUTTONS*/}
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-2xl">
            <TrendingUp />
            Optimize Margins
          </Button>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-center my-4 gap-2">
          {stats.map(({ key, ...stat }) => (
            <ProfitCostStatBox
              key={key}
              {...stat}
            />
          ))}
        </div>
        <GrossProfitTrendChart />

        <div className="flex flex-wrap gap-1">
          <ProfitPerProduct
            products={[
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
            ]}
          />
          <RefundAnalysis
            refundReasons={[
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
            ]}
          />
        </div>
      </div>

      <div>
        <h1 className="font-semibold text-2xl">
          Expense breakdown
        </h1>
        <div className="flex flex-wrap items-center justify-center my-4 gap-2">
          {expenseStats.map(
            ({ key, ...stat }) => (
              <ExpenseStatBox
                key={key}
                {...stat}
              />
            ),
          )}
        </div>

        <div>
          <ExpensesByCategoryChart />
          <BudgetTable
            budgetData={mockBudgetData}
          />
        </div>
      </div>
    </div>
  );
}
