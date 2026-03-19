"use client";
import { useState } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import SetTargetsModal from "./SetTargetsModal";
import { useCurrency } from "@/lib/context/CurrencyContext";

// Types

export interface TargetActualData {
  month: string;
  actual: number;
  target: number;
}

// Mock data — full 12 months

const MOCK_DATA: TargetActualData[] = [
  { month: "Jan", actual: 98000, target: 95000 },
  {
    month: "Feb",
    actual: 104000,
    target: 100000,
  },
  {
    month: "Mar",
    actual: 112000,
    target: 108000,
  },
  {
    month: "Apr",
    actual: 108000,
    target: 112000,
  },
  {
    month: "May",
    actual: 119000,
    target: 115000,
  },
  {
    month: "Jun",
    actual: 125000,
    target: 120000,
  },
  {
    month: "Jul",
    actual: 131000,
    target: 125000,
  },
  {
    month: "Aug",
    actual: 128000,
    target: 130000,
  },
  {
    month: "Sep",
    actual: 116000,
    target: 118000,
  },
  {
    month: "Oct",
    actual: 122000,
    target: 115000,
  },
  {
    month: "Nov",
    actual: 118000,
    target: 120000,
  },
  {
    month: "Dec",
    actual: 142000,
    target: 135000,
  },
];

// Helpers

const getYAxisTicks = (
  data: TargetActualData[],
): number[] => {
  const max = Math.max(
    ...data.flatMap((d) => [d.actual, d.target]),
  );
  const step = Math.ceil(max / 4 / 10000) * 10000;
  return [0, step, step * 2, step * 3, step * 4];
};

// Sub-components

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
  const actual = payload.find(
    (p) => p.dataKey === "actual",
  );
  const target = payload.find(
    (p) => p.dataKey === "target",
  );
  const variance =
    actual && target
      ? (actual.value as number) -
        (target.value as number)
      : null;

  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100 min-w-40">
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
            <span className="text-xs text-gray-600">
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
      {variance !== null && (
        <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between">
          <span className="text-xs text-gray-400">
            Variance
          </span>
          <span
            className={`text-xs font-bold ${variance >= 0 ? "text-green-500" : "text-red-400"}`}
          >
            {variance >= 0 ? "+" : ""}$
            {variance.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-6 mt-2">
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-blue-400" />
      <span className="text-xs font-semibold text-blue-500">
        Actual
      </span>
    </div>
    <div className="flex items-center gap-2">
      <svg width="20" height="8">
        <line
          x1="0"
          y1="4"
          x2="20"
          y2="4"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
      </svg>
      <span className="text-xs font-semibold text-gray-400">
        Target
      </span>
    </div>
  </div>
);

// Chart

export interface TargetVsActualProps {
  initialData?: TargetActualData[];
}

export default function TargetVsActualChart({
  initialData = MOCK_DATA,
}: TargetVsActualProps) {
  // chartData is the live data — targets can be edited via the modal
  const [chartData, setChartData] =
    useState<TargetActualData[]>(initialData);
  const [modalOpen, setModalOpen] =
    useState(false);

  const { currency } = useCurrency();

  const formatYAxis = (v: number): string =>
    `$${v / 1000}k`;
  const yTicks = getYAxisTicks(chartData);
  const yMax = yTicks[yTicks.length - 1] * 1.05;

  // Called by modal on Save — replaces targets in chartData
  const handleSaveTargets = (
    updated: TargetActualData[],
  ) => {
    setChartData(updated);
    // TODO: persist to backend
    // await fetch("/api/targets", { method: "POST", body: JSON.stringify(updated) });
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <h2 className="text-lg font-bold text-gray-900">
                Target vs Actual Revenue
              </h2>
            </div>
            <p className="text-sm text-gray-400">
              Monthly performance against set
              targets
            </p>
          </div>

          {/* Set Targets button */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600
                       border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors shrink-0"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Set Targets
          </button>
        </div>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <ComposedChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient
                id="actualGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#60a5fa"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="#60a5fa"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="month"
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
              ticks={yTicks}
              domain={[0, yMax]}
              width={50}
            />
            <Tooltip
              content={<CustomTooltip />}
            />
            <Legend content={<CustomLegend />} />

            <Area
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#60a5fa"
              strokeWidth={2.5}
              fill="url(#actualGradient)"
              dot={{
                r: 4,
                fill: "#60a5fa",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#60a5fa",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />

            <Line
              type="monotone"
              dataKey="target"
              name="Target"
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#9ca3af",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Modal — rendered outside the card via fragment so it overlays everything */}
      <SetTargetsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={chartData}
        onSave={handleSaveTargets}
      />
    </>
  );
}
