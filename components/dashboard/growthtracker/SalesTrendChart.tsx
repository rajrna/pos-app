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

// ---------------------------------------------------------------
// Types
// ---------------------------------------------------------------

type ViewMode = "daily" | "weekly" | "monthly";

interface DataPoint {
  label: string;
  revenue: number;
}

interface SalesTrendsData {
  daily: DataPoint[];
  weekly: DataPoint[];
  monthly: DataPoint[];
}

// ---------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------

const MOCK_DATA: SalesTrendsData = {
  daily: [
    { label: "Mon", revenue: 4200 },
    { label: "Tue", revenue: 3800 },
    { label: "Wed", revenue: 5100 },
    { label: "Thu", revenue: 4700 },
    { label: "Fri", revenue: 6200 },
    { label: "Sat", revenue: 7800 },
    { label: "Sun", revenue: 5400 },
  ],
  weekly: [
    { label: "Wk 1", revenue: 28000 },
    { label: "Wk 2", revenue: 31500 },
    { label: "Wk 3", revenue: 26800 },
    { label: "Wk 4", revenue: 36200 },
  ],
  monthly: [
    { label: "Jan", revenue: 98000 },
    { label: "Feb", revenue: 112000 },
    { label: "Mar", revenue: 104000 },
    { label: "Apr", revenue: 119000 },
    { label: "May", revenue: 131000 },
    { label: "Jun", revenue: 124000 },
  ],
};

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

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

// ---------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------

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

// ---------------------------------------------------------------
// Chart
// ---------------------------------------------------------------

export interface SalesTrendsProps {
  initialData?: SalesTrendsData;
}

export default function SalesTrendChart({
  initialData = MOCK_DATA,
}: SalesTrendsProps) {
  const [view, setView] =
    useState<ViewMode>("weekly");

  const activeData = initialData[view];
  const yTicks = getYAxisTicks(activeData);
  const yMax = yTicks[yTicks.length - 1] * 1.08;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          Sales Trends
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Revenue over time – switch between
          daily, weekly, and monthly views
        </p>
      </div>

      {/* View switcher */}
      <div className="flex items-center gap-1 mb-6">
        {VIEW_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setView(value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border ${
              view === value
                ? "border-gray-900 text-gray-900 bg-white"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer
        width="100%"
        height={320}
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
            width={48}
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
  );
}
