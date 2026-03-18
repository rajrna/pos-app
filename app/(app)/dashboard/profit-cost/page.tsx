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
import RefundAnalysis from "@/components/dashboard/profitcostdash/RefundAnalysis";
import ProfitPerProduct from "@/components/dashboard/profitcostdash/ProfitPerProduct";
import GrossProfitTrendChart from "@/components/dashboard/profitcostdash/GrossProfitTrendChart";
import ExpensesByCategoryChart from "@/components/dashboard/profitcostdash/ExpenseByCategoryChart";
import StatBox from "@/components/dashboard/StatBox";

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
    <div className="p-3 md:p-6">
      <div className="flex justify-between items-center w-full  py-2 border-b-2">
        <div className="py-2 min-w-0">
          {/* FOR HEADER TEXT */}
          <h1 className="font-bold text-xl md:text-2xl truncate">
            Profit & Cost
          </h1>
          <p className="text-gray-500 text-sm md:text-base hidden sm:block">
            Financial health and margin analysis.
          </p>
        </div>
        <div className="shrink-0">
          {/* FOR HEADER BUTTONS*/}
          <Button className="bg-blue-600 hover:bg-blue-700 px-3 md:px-6 py-3 text-white rounded-2xl">
            <TrendingUp className="shrink-0" />
            Optimize Margins
          </Button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 my-4">
          {stats.map(({ key, ...stat }) => (
            <StatBox key={key} {...stat} />
          ))}
        </div>
        <GrossProfitTrendChart />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfitPerProduct
            products={profitPerProduct}
          />
          <RefundAnalysis
            refundReasons={refundReason}
          />
        </div>
      </div>

      <div>
        <div className=" py-4 border-b-2">
          <h1 className="font-bold text-xl md:text-2xl truncate ">
            Expenses breakdown
          </h1>
          <p className="text-gray-500 text-sm md:text-base hidden sm:block">
            Expenses and budget analysis.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 my-4">
          {expenseStats.map(
            ({ key, ...stat }) => (
              <StatBox key={key} {...stat} />
            ),
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExpensesByCategoryChart />
          <BudgetTable budgetData={budgetData} />
        </div>
      </div>
    </div>
  );
}
