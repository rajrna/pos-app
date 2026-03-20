import Link from "next/link";

import { UserPlus } from "lucide-react";

import {
  AtRiskCustomerWrapper,
  CustomerSegmentationChartWrapper,
  CustomerStatsWrapper,
  CustomerTrendChartWrapper,
  LoyaltyTierChartWrapper,
  TopCustomersWrapper,
} from "../_components/CustomersWrapper";
import ChartErrorBoundary from "@/components/ui/charterrorboundary";
import { Suspense } from "react";
import TableSkeleton from "@/components/ui/tableskeleton";
import ChartSkeleton from "@/components/ui/chartskeleton";
import PieChartSkeleton from "@/components/ui/piechartskeleton";
import StatSkeleton from "@/components/ui/statskeleton";
import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <div className="p-3 md:p-6">
      <div className="flex justify-between items-center w-full  py-2 border-b-2">
        <div className="py-2 min-w-0">
          {/* FOR HEADER TEXT */}
          <h1 className="font-bold text-xl md:text-2xl truncate">
            Customer Analytics
          </h1>
          <p className="text-gray-500 text-sm md:text-base hidden sm:block">
            Insights into customer behavior and
            retention.
          </p>
        </div>
        <div className="shrink-0">
          {/* FOR HEADER BUTTONS*/}
          <Button className="bg-blue-600 hover:bg-blue-700 px-3 md:px-6 py-3 text-white rounded-2xl">
            <UserPlus className="shrink-0" />
            <Link
              href="/customers/add"
              // className="hidden sm:inline ml-1"
            >
              New Customer
            </Link>
          </Button>
        </div>
      </div>

      {/* CONTENTS */}
      <div>
        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 my-4">
              {Array.from({ length: 4 }).map(
                (_, i) => (
                  <StatSkeleton key={i} />
                ),
              )}
            </div>
          }
        >
          <CustomerStatsWrapper />
        </Suspense>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <CustomerSegmentationChart /> */}
          <ChartErrorBoundary>
            <Suspense
              fallback={<PieChartSkeleton />}
            >
              <CustomerSegmentationChartWrapper />
            </Suspense>
          </ChartErrorBoundary>

          <ChartErrorBoundary>
            <Suspense
              fallback={<ChartSkeleton />}
            >
              <LoyaltyTierChartWrapper />
            </Suspense>
          </ChartErrorBoundary>
        </div>
        <ChartErrorBoundary>
          <Suspense fallback={<ChartSkeleton />}>
            <CustomerTrendChartWrapper />
          </Suspense>
        </ChartErrorBoundary>

        <ChartErrorBoundary>
          <Suspense
            fallback={<TableSkeleton rows={5} />}
          >
            <AtRiskCustomerWrapper />
          </Suspense>
        </ChartErrorBoundary>

        <ChartErrorBoundary>
          <Suspense
            fallback={<TableSkeleton rows={5} />}
          >
            <TopCustomersWrapper />
          </Suspense>
        </ChartErrorBoundary>
      </div>
    </div>
  );
}
