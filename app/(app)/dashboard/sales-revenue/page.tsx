import { Suspense } from "react";

import TableSkeleton from "@/components/ui/tableskeleton";
import ChartSkeleton from "@/components/ui/chartskeleton";
import ChartErrorBoundary from "@/components/ui/charterrorboundary";

import {
  RevenueVsProfitChartWrapper,
  SalesTrendChartWrapper,
  SlowProductsWrapper,
  TopProductsWrapper,
} from "../_components/SalesRevenueWrapper";

export default async function Page() {
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
          <h1 className="text-xl font-semibold mt-2">
            Performance metrics
          </h1>
        </div>
      </div>

      {/* Actual COntent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <ChartErrorBoundary>
          <Suspense
            fallback={<TableSkeleton rows={5} />}
          >
            <TopProductsWrapper />
          </Suspense>
        </ChartErrorBoundary>

        <ChartErrorBoundary>
          <Suspense
            fallback={<TableSkeleton rows={5} />}
          >
            <SlowProductsWrapper />
          </Suspense>
        </ChartErrorBoundary>
      </div>
      <ChartErrorBoundary>
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueVsProfitChartWrapper />
        </Suspense>
      </ChartErrorBoundary>

      <ChartErrorBoundary>
        <Suspense fallback={<ChartSkeleton />}>
          <SalesTrendChartWrapper />
        </Suspense>
      </ChartErrorBoundary>
    </div>
  );
}
