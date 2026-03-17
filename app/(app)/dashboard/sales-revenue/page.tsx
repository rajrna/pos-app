import TopProducts from "@/components/dashboard/salesrevenue/TopProducts";
import SlowProducts from "@/components/dashboard/salesrevenue/SlowProducts";
import SalesTrendChart from "@/components/dashboard/salesrevenue/SalesTrendChart";
import RevenueVsProfitChart from "@/components/dashboard/salesrevenue/RevenueVsProfitChart";
import { mockSalesTrendData } from "@/components/dashboard/salesrevenue/mock-salesrevenue";
import {
  getRevenueVsProfitData,
  getSalesTrends,
  getSlowProducts,
  getTopProducts,
} from "@/services/dashboard/apiSalesRevenue";

export default async function Page() {
  const [
    revenueVsProfitData,
    topProducts,
    slowProducts,
  ] = await Promise.all([
    getRevenueVsProfitData(),
    getTopProducts(),
    getSlowProducts(),
    getSalesTrends(),
  ]);
  return (
    <div className="p-3 md:p-6">
      <div className="border-b border-gray-200 py-2">
        <h1 className="text-2xl font-bold ">
          Sales & Revenue
        </h1>

        <p className="text-gray-500">
          Detailed breakdown of your store&apos;s
          financial performance
        </p>

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold mt-10">
            Performance metrics
          </h1>
        </div>
      </div>

      {/* Actual COntent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TopProducts topProducts={topProducts} />
        <SlowProducts
          slowProducts={slowProducts}
        />
      </div>
      <RevenueVsProfitChart
        initialData={revenueVsProfitData}
      />
      <SalesTrendChart
        initialData={mockSalesTrendData}
      />
    </div>
  );
}
