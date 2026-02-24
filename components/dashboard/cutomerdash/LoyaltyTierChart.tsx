"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Rectangle,
} from "recharts";
import type { BarShapeProps } from "recharts";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface TierData {
  tier: string;
  members: number;
}

const data: TierData[] = [
  { tier: "Bronze", members: 480 },
  { tier: "Silver", members: 220 },
  { tier: "Gold", members: 112 },
  { tier: "Platinum", members: 30 },
];

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
      <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
        <p className="text-gray-400 text-xs">
          {label}
        </p>
        <p className="font-bold text-sm text-blue-500">
          {(
            payload[0].value as number
          ).toLocaleString()}{" "}
          members
        </p>
      </div>
    );
  }
  return null;
};

// Rounded right-side corners only for horizontal bars
const CustomBar = (props: BarShapeProps) => (
  <Rectangle
    {...props}
    radius={[0, 6, 6, 0]}
    fill="#60a5fa"
  />
);

export default function LoyaltyTierChart() {
  return (
    <div className="flex-2 min-w-90 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Loyalty Tier Breakdown
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Members by loyalty status
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer
        width="100%"
        height={240}
      >
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 0,
            right: 40,
            left: 10,
            bottom: 0,
          }}
          barCategoryGap="30%"
        >
          <CartesianGrid
            horizontal={false}
            stroke="#f3f4f6"
          />

          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 12,
            }}
            ticks={[0, 150, 300, 450, 600]}
            domain={[0, 600]}
          />

          <YAxis
            type="category"
            dataKey="tier"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 13,
            }}
            width={58}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              fill: "rgba(96,165,250,0.05)",
            }}
          />

          <Bar
            dataKey="members"
            shape={CustomBar}
          >
            <LabelList
              dataKey="members"
              position="right"
              style={{
                fill: "#6b7280",
                fontSize: 13,
                fontWeight: 500,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
