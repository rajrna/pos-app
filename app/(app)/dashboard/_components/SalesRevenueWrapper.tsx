import TopProducts from "@/components/dashboard/salesrevenue/TopProducts";
import SlowProducts from "@/components/dashboard/salesrevenue/SlowProducts";
import SalesTrendChart from "@/components/dashboard/salesrevenue/SalesTrendChart";
import RevenueVsProfitChart from "@/components/dashboard/salesrevenue/RevenueVsProfitChart";
import {
  getRevenueVsProfitData,
  getSalesTrends,
  getSlowProducts,
  getTopProducts,
} from "@/services/dashboard/apiSalesRevenue";

export async function TopProductsWrapper() {
  const data = await getTopProducts();
  return <TopProducts topProducts={data} />;
}

export async function SlowProductsWrapper() {
  const data = await getSlowProducts();
  return <SlowProducts slowProducts={data} />;
}

export async function RevenueVsProfitChartWrapper() {
  const data = await getRevenueVsProfitData();
  return (
    <RevenueVsProfitChart initialData={data} />
  );
}

export async function SalesTrendChartWrapper() {
  const data = await getSalesTrends();
  return <SalesTrendChart data={data} />;
}
