import { TrendingUp } from "lucide-react";

import {
  EXPENSE_STAT_CONFIG,
  PROFIT_COST_STAT_CONFIG,
} from "@/lib/config/dashboard";
import {
  ExpenseApiResponse,
  ProfitCostApiResponse,
} from "@/lib/dashboardstats";

import {
  getBudgetData,
  getProfitPerProduct,
  getProfitStats,
  getRefundReason,
} from "@/services/dashboard/apiProfitCost";

import { Button } from "@/components/ui/button";
import BudgetTable from "@/components/dashboard/profitcostdash/BudgetTable";
import ExpenseStatBox from "@/components/dashboard/profitcostdash/ExpenseStatBox";
import RefundAnalysis from "@/components/dashboard/profitcostdash/RefundAnalysis";
import ProfitPerProduct from "@/components/dashboard/profitcostdash/ProfitPerProduct";
import ProfitCostStatBox from "@/components/dashboard/profitcostdash/ProfitCostStatBox";
import GrossProfitTrendChart from "@/components/dashboard/profitcostdash/GrossProfitTrendChart";
import ExpensesByCategoryChart from "@/components/dashboard/profitcostdash/ExpenseByCategoryChart";

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
const [
  refundReason,
  profitPerProduct,
  budgetData,
  profitStats,
] = await Promise.all([
  getRefundReason(),
  getProfitPerProduct(),
  getBudgetData(),
  getProfitStats,
]);

export default async function Page() {
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
            products={profitPerProduct}
          />
          <RefundAnalysis
            refundReasons={refundReason}
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
          <BudgetTable budgetData={budgetData} />
        </div>
      </div>
    </div>
  );
}
