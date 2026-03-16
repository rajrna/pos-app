"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import type { BarShapeProps } from "recharts";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

// Types

export interface ProductData {
  product: string;
  revenue: number;
  profit: number;
}

export type DateRange =
  | "7d"
  | "30d"
  | "90d"
  | "180d";

interface Props {
  initialData: ProductData[];
}

// Fetcher (reused by TanStack Query)

export const fetchRevenueProfit = async (
  range: DateRange,
): Promise<ProductData[]> => {
  const res = await fetch(
    `/api/products/revenue-profit?range=${range}`,
  );
  if (!res.ok)
    throw new Error(
      "Failed to fetch revenue vs profit data",
    );
  return res.json();
};

// Sub-components

const RANGE_OPTIONS: {
  label: string;
  value: DateRange;
}[] = [
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "90 days", value: "90d" },
  { label: "6 months", value: "180d" },
];

const RevenueBar = (props: BarShapeProps) => (
  <Rectangle
    {...props}
    radius={[4, 4, 0, 0]}
    fill="#60a5fa"
  />
);

const ProfitBar = (props: BarShapeProps) => (
  <Rectangle
    {...props}
    radius={[4, 4, 0, 0]}
    fill="#34d399"
  />
);

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-6 mt-2">
    {[
      { label: "Profit", color: "#34d399" },
      { label: "Revenue", color: "#60a5fa" },
    ].map(({ label, color }) => (
      <div
        key={label}
        className="flex items-center gap-1.5"
      >
        <span
          className="w-3 h-3 rounded-sm shrink-0"
          style={{ backgroundColor: color }}
        />
        <span
          className="text-xs font-semibold"
          style={{ color }}
        >
          {label}
        </span>
      </div>
    ))}
  </div>
);

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Payload<ValueType, NameType>[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100 min-w-36">
      <p className="text-gray-400 text-xs mb-2 font-medium">
        {label}
      </p>
      {payload.map((entry) => (
        <div
          key={entry.name}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor:
                  entry.color as string,
              }}
            />
            <span className="text-xs text-gray-600 capitalize">
              {entry.name}
            </span>
          </div>
          <span className="text-xs font-bold text-gray-800">
            $
            {(
              entry.value as number
            ).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// Chart — accepts initialData from Server Component

export default function RevenueVsProfitChart({
  initialData,
}: Props) {
  const [range, setRange] =
    useState<DateRange>("30d");

  const {
    data = initialData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["revenue-profit", range],
    queryFn: () => fetchRevenueProfit(range),
    initialData:
      range === "30d" ? initialData : undefined,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const formatYAxis = (value: number): string =>
    `$${value / 1000}k`;
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.revenue, d.profit]),
  );
  const yAxisMax =
    Math.ceil(maxValue / 2000) * 2000 + 2000;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm md:p-6 p-4 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Revenue vs Profit by Product
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Comparing top-line revenue against net
            profit per product
          </p>
          {isError && (
            <p className="text-xs text-amber-400 mt-1">
              Could not refresh — showing last
              known data.
            </p>
          )}
        </div>

        {/* Date range filter */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 self-start">
          {RANGE_OPTIONS.map(
            ({ label, value }) => (
              <button
                key={value}
                onClick={() => setRange(value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  range === value
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {label}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Chart */}
      <div
        className={`transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}
      >
        <div className="h-55 sm:h-75">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
              barCategoryGap="15%"
              barGap={4}
            >
              <CartesianGrid
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis
                dataKey="product"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9ca3af",
                  fontSize: 12,
                }}
                dy={8}
              />
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9ca3af",
                  fontSize: 12,
                }}
                domain={[0, yAxisMax]}
                width={45}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "rgba(0,0,0,0.03)",
                }}
              />
              <Legend
                content={<CustomLegend />}
              />
              <Bar
                dataKey="revenue"
                name="Revenue"
                shape={RevenueBar}
              />
              <Bar
                dataKey="profit"
                name="Profit"
                shape={ProfitBar}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
