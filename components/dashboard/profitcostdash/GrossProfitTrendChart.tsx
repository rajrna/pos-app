"use client";
import {
  LineChart,
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

// ---------------------------------------------------------------
// Types
// ---------------------------------------------------------------

export interface ProfitTrendData {
  month: string;
  grossRevenue: number;
  netProfit: number;
}

// ---------------------------------------------------------------
// Mock data — full 12 months
// ---------------------------------------------------------------

const MOCK_DATA: ProfitTrendData[] = [
  {
    month: "Jan",
    grossRevenue: 98000,
    netProfit: 62000,
  },
  {
    month: "Feb",
    grossRevenue: 104000,
    netProfit: 67000,
  },
  {
    month: "Mar",
    grossRevenue: 112000,
    netProfit: 71000,
  },
  {
    month: "Apr",
    grossRevenue: 108000,
    netProfit: 68000,
  },
  {
    month: "May",
    grossRevenue: 119000,
    netProfit: 74000,
  },
  {
    month: "Jun",
    grossRevenue: 125000,
    netProfit: 79000,
  },
  {
    month: "Jul",
    grossRevenue: 131000,
    netProfit: 83000,
  },
  {
    month: "Aug",
    grossRevenue: 128000,
    netProfit: 80000,
  },
  {
    month: "Sep",
    grossRevenue: 116000,
    netProfit: 72000,
  },
  {
    month: "Oct",
    grossRevenue: 122000,
    netProfit: 76000,
  },
  {
    month: "Nov",
    grossRevenue: 118000,
    netProfit: 69000,
  },
  {
    month: "Dec",
    grossRevenue: 142000,
    netProfit: 91000,
  },
];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

const formatYAxis = (value: number): string =>
  `$${value / 1000}k`;

const getYAxisTicks = (
  data: ProfitTrendData[],
): number[] => {
  const max = Math.max(
    ...data.map((d) => d.grossRevenue),
  );
  const step = Math.ceil(max / 4 / 10000) * 10000;
  return [0, step, step * 2, step * 3, step * 4];
};

// ---------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------

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
    </div>
  );
};

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-6 mt-2">
    {[
      {
        label: "Gross Revenue",
        color: "#60a5fa",
      },
      { label: "Net Profit", color: "#34d399" },
    ].map(({ label, color }) => (
      <div
        key={label}
        className="flex items-center gap-1.5"
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
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

// ---------------------------------------------------------------
// Chart
// ---------------------------------------------------------------

export interface GrossProfitTrendProps {
  initialData?: ProfitTrendData[];
}

export default function GrossProfitTrendChart({
  initialData = MOCK_DATA,
}: GrossProfitTrendProps) {
  const yTicks = getYAxisTicks(initialData);
  const yMax = yTicks[yTicks.length - 1] * 1.05;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Gross vs Net Profit Trend
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Monthly comparison of revenue and net
          profit
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <LineChart
          data={initialData}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
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
            width={52}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend content={<CustomLegend />} />

          <Line
            type="monotone"
            dataKey="grossRevenue"
            name="Gross Revenue"
            stroke="#60a5fa"
            strokeWidth={2.5}
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
            dataKey="netProfit"
            name="Net Profit"
            stroke="#34d399"
            strokeWidth={2.5}
            dot={{
              r: 4,
              fill: "#34d399",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "#34d399",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
