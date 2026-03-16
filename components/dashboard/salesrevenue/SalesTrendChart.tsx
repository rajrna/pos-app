"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import type { BarShapeProps } from "recharts";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { mockSalesTrendData } from "./mock-salesrevenue";

// Types

type ViewMode = "daily" | "weekly" | "monthly";

interface DataPoint {
  label: string;
  revenue: number;
}

export interface SalesTrendsData {
  daily: DataPoint[];
  weekly: DataPoint[];
  monthly: DataPoint[];
}

// Helpers

const formatYAxis = (value: number): string => {
  if (value >= 1000) return `$${value / 1000}k`;
  return `$${value}`;
};

const getYAxisTicks = (
  data: DataPoint[],
): number[] => {
  const max = Math.max(
    ...data.map((d) => d.revenue),
  );
  const step = Math.ceil(max / 4 / 1000) * 1000;
  return [0, step, step * 2, step * 3, step * 4];
};

// Sub-components

const CustomBar = (props: BarShapeProps) => (
  <Rectangle
    {...props}
    radius={[8, 8, 0, 0]}
    fill="#a78bfa"
  />
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
    <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100">
      <p className="text-gray-400 text-xs mb-1">
        {label}
      </p>
      <p className="text-violet-500 font-bold text-sm">
        $
        {(
          payload[0].value as number
        ).toLocaleString()}
      </p>
    </div>
  );
};

const VIEW_OPTIONS: {
  label: string;
  value: ViewMode;
}[] = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

// Chart

export interface SalesTrendsProps {
  initialData?: SalesTrendsData;
}

export default function SalesTrendChart({
  initialData = mockSalesTrendData,
}: SalesTrendsProps) {
  const [view, setView] =
    useState<ViewMode>("weekly");

  const activeData = initialData[view];
  const yTicks = getYAxisTicks(activeData);
  const yMax = yTicks[yTicks.length - 1] * 1.08;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 w-full mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Sales Trends
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Revenue over time – switch between
            daily, weekly, and monthly views
          </p>
        </div>
        {/* View switcher */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 self-start">
          {VIEW_OPTIONS.map(
            ({ label, value }) => (
              <button
                key={value}
                onClick={() => setView(value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  view === value
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
      <div className="h-55 sm:h-75">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={activeData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
            barCategoryGap="20%"
          >
            <CartesianGrid
              vertical={false}
              stroke="#f3f4f6"
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9ca3af",
                fontSize: 13,
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
              ticks={yTicks}
              domain={[0, yMax]}
              width={40}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: "rgba(167,139,250,0.06)",
              }}
            />

            <Bar
              dataKey="revenue"
              shape={CustomBar}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
