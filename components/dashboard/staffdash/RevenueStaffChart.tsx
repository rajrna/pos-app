"use client";
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

interface StaffRevenue {
  name: string;
  revenue: number;
}

const data: StaffRevenue[] = [
  { name: "Emma", revenue: 5900 },
  { name: "Liam", revenue: 5000 },
  { name: "Sophia", revenue: 4600 },
  { name: "James", revenue: 4000 },
  { name: "Aisha", revenue: 6100 },
];

const formatYAxis = (value: number): string =>
  `$${(value / 1000).toFixed(1)}k`;

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
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100">
        <p className="text-gray-400 text-xs mb-1">
          {label}
        </p>
        <p className="text-blue-500 font-bold text-sm">
          $
          {(
            payload[0].value as number
          ).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const CustomBar = (props: BarShapeProps) => (
  <Rectangle
    {...props}
    radius={[6, 6, 0, 0]}
    fill="#60a5fa"
  />
);

export default function RevenueStaffChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-w-150">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Revenue per Staff
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Individual contribution to total revenue
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer
        width="100%"
        height={200}
      >
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 20,
            left: 20,
            bottom: 0,
          }}
          barCategoryGap="15%"
        >
          <CartesianGrid
            vertical={false}
            stroke="#f3f4f6"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 13,
            }}
            dy={10}
          />

          <YAxis
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 12,
            }}
            ticks={[0, 2000, 4000, 6000, 8000]}
            domain={[0, 8500]}
            width={60}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              fill: "rgba(96,165,250,0.05)",
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
