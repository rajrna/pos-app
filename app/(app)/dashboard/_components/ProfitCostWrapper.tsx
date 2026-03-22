import {
  EXPENSE_STAT_CONFIG,
  PROFIT_COST_STAT_CONFIG,
  MergedSerializableConfigCostExpense,
} from "@/lib/config/dashboard";

import {
  getBudgetData,
  getExpenseByCategoryData,
  getExpenseStats,
  getGrossProfitTrendData,
  getProfitPerProduct,
  getProfitStats,
  getRefundReason,
} from "@/services/dashboard/apiProfitCost";

import StatBox from "@/components/dashboard/StatBox";
import BudgetTable from "@/components/dashboard/profitcostdash/BudgetTable";
import RefundAnalysis from "@/components/dashboard/profitcostdash/RefundAnalysis";
import ProfitPerProduct from "@/components/dashboard/profitcostdash/ProfitPerProduct";
import StatBoxGrid from "@/components/dashboard/profitcostdash/ProfitCostStatGrid";
import GrossProfitTrendChart from "@/components/dashboard/profitcostdash/GrossProfitTrendChart";
import ExpensesByCategoryChart from "@/components/dashboard/profitcostdash/ExpenseByCategoryChart";

export async function ProfitStatsWrapper() {
  const profitStat = await getProfitStats();
  const stats: MergedSerializableConfigCostExpense[] =
    PROFIT_COST_STAT_CONFIG.map((config) => ({
      ...config,
      ...profitStat[config.key],
    }));
  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 my-4">
      {stats.map(({ key, ...stat }) => (
        <StatBox key={key} {...stat} />
      ))}
    </div>
  );
}

export async function ProfitPerProductWrapper() {
  const profitPerProduct =
    await getProfitPerProduct();
  return (
    <ProfitPerProduct
      products={profitPerProduct}
    />
  );
}

export async function RefundAnalysisWrapper() {
  const refundData = await getRefundReason();
  return (
    <RefundAnalysis refundReasons={refundData} />
  );
}

export async function ExpenseStatsWrapper() {
  const expenseStat = await getExpenseStats();
  const stats: MergedSerializableConfigCostExpense[] =
    EXPENSE_STAT_CONFIG.map((config) => ({
      ...config,
      ...expenseStat[config.key],
    }));
  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 my-4">
      <StatBoxGrid stats={stats} />
    </div>
  );
}
export async function GrossProfitTrendChartWrapper() {
  const grossProfitData =
    await getGrossProfitTrendData();
  return (
    <GrossProfitTrendChart
      data={grossProfitData}
    />
  );
}

export async function ExpenseByCategoryChartWrapper() {
  const expenseCategoryData =
    await getExpenseByCategoryData();
  return (
    <ExpensesByCategoryChart
      data={expenseCategoryData}
    />
  );
}
export async function BudgetTableWrapper() {
  const budgetData = await getBudgetData();
  return <BudgetTable budgetData={budgetData} />;
}
