"use client";

import { CurrencyConfig } from "@/lib/config/store";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

// Types

export interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

// Mock data

const MOCK_DATA: ExpenseCategory[] = [
  {
    name: "Labor",
    value: 32000,
    color: "#60a5fa",
  }, // blue
  {
    name: "COGS",
    value: 24000,
    color: "#a78bfa",
  }, // purple
  {
    name: "Rent",
    value: 12000,
    color: "#f472b6",
  }, // pink
  {
    name: "Utilities",
    value: 5000,
    color: "#fb923c",
  }, // orange
  {
    name: "Marketing",
    value: 6500,
    color: "#34d399",
  }, // green
  {
    name: "Supplies",
    value: 3500,
    color: "#22d3ee",
  }, // cyan
  {
    name: "Maintenance",
    value: 2000,
    color: "#818cf8",
  }, // indigo
];

// Tooltip

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload<ValueType, NameType>[];
  currency: CurrencyConfig;
}

const CustomTooltip = ({
  active,
  payload,
  currency,
}: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const entry = payload[0]
    .payload as ExpenseCategory;
  const total = MOCK_DATA.reduce(
    (s, d) => s + d.value,
    0,
  );
  const pct = (
    (entry.value / total) *
    100
  ).toFixed(1);

  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100 min-w-36">
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-xs font-semibold text-gray-700">
          {entry.name}
        </span>
      </div>
      <p className="text-sm font-bold text-gray-900">
        {formatCurrency(
          entry.value as number,
          currency,
        )}
      </p>
      <p className="text-xs text-gray-400">
        {pct}% of total
      </p>
    </div>
  );
};

// Legend

const CustomLegend = ({
  data,
}: {
  data: ExpenseCategory[];
}) => (
  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-3 px-1">
    {data.map((entry) => (
      <div
        key={entry.name}
        className="flex items-center gap-1.5"
      >
        <span
          className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-xs md:text-sm text-gray-600">
          {entry.name}
        </span>
      </div>
    ))}
  </div>
);

// Chart

export interface ExpensesByCategoryProps {
  initialData?: ExpenseCategory[];
}

export default function ExpensesByCategoryChart({
  initialData = MOCK_DATA,
}: ExpensesByCategoryProps) {
  const total = initialData.reduce(
    (s, d) => s + d.value,
    0,
  );

  const { currency } = useCurrency();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 w-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          Expenses by Category
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Share of total expenses this month
        </p>
      </div>

      {/* Donut */}
      <div className="relative flex items-center justify-center">
        <ResponsiveContainer
          width="100%"
          height={200}
        >
          <PieChart>
            <Pie
              data={initialData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {initialData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              content={
                <CustomTooltip
                  currency={currency}
                />
              }
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center total */}
        <div className="absolute flex flex-col items-center pointer-events-none">
          <span className="text-xs text-gray-400">
            Total
          </span>
          <span className="text-base font-bold text-gray-900">
            {currency.symbol}
            {(total / 1000).toFixed(0)}k
          </span>
        </div>
      </div>

      {/* Legend */}
      <CustomLegend data={initialData} />
    </div>
  );
}
