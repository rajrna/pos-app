"use client";
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

// ---------------------------------------------------------------
// Types
// ---------------------------------------------------------------

export interface YoYData {
  month: string;
  lastYear: number;
  thisYear: number;
}

// ---------------------------------------------------------------
// Mock data — full 12 months
// ---------------------------------------------------------------

const MOCK_DATA: YoYData[] = [
  {
    month: "Jan",
    lastYear: 72000,
    thisYear: 98000,
  },
  {
    month: "Feb",
    lastYear: 78000,
    thisYear: 104000,
  },
  {
    month: "Mar",
    lastYear: 85000,
    thisYear: 112000,
  },
  {
    month: "Apr",
    lastYear: 80000,
    thisYear: 108000,
  },
  {
    month: "May",
    lastYear: 90000,
    thisYear: 119000,
  },
  {
    month: "Jun",
    lastYear: 95000,
    thisYear: 125000,
  },
  {
    month: "Jul",
    lastYear: 100000,
    thisYear: 131000,
  },
  {
    month: "Aug",
    lastYear: 97000,
    thisYear: 128000,
  },
  {
    month: "Sep",
    lastYear: 88000,
    thisYear: 116000,
  },
  {
    month: "Oct",
    lastYear: 84000,
    thisYear: 122000,
  },
  {
    month: "Nov",
    lastYear: 91000,
    thisYear: 118000,
  },
  {
    month: "Dec",
    lastYear: 110000,
    thisYear: 142000,
  },
];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

const formatYAxis = (v: number): string =>
  `$${v / 1000}k`;

const getYAxisTicks = (
  data: YoYData[],
): number[] => {
  const max = Math.max(
    ...data.flatMap((d) => [
      d.lastYear,
      d.thisYear,
    ]),
  );
  const step = Math.ceil(max / 4 / 10000) * 10000;
  return [0, step, step * 2, step * 3, step * 4];
};

// ---------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------

// Muted gray for last year
const LastYearBar = (props: BarShapeProps) => (
  <Rectangle
    {...props}
    radius={[4, 4, 0, 0]}
    fill="#e2e8f0"
  />
);

// Vivid blue for this year
const ThisYearBar = (props: BarShapeProps) => (
  <Rectangle
    {...props}
    radius={[4, 4, 0, 0]}
    fill="#60a5fa"
  />
);

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-6 mt-2">
    {[
      {
        label: "Last Year",
        color: "#e2e8f0",
        textColor: "#9ca3af",
      },
      {
        label: "This Year",
        color: "#60a5fa",
        textColor: "#60a5fa",
      },
    ].map(({ label, color, textColor }) => (
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
          style={{ color: textColor }}
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
  const lastYear = payload.find(
    (p) => p.dataKey === "lastYear",
  );
  const thisYear = payload.find(
    (p) => p.dataKey === "thisYear",
  );
  const growth =
    lastYear && thisYear
      ? (
          (((thisYear.value as number) -
            (lastYear.value as number)) /
            (lastYear.value as number)) *
          100
        ).toFixed(1)
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
      {growth && (
        <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between">
          <span className="text-xs text-gray-400">
            YoY Growth
          </span>
          <span
            className={`text-xs font-bold ${Number(growth) >= 0 ? "text-green-500" : "text-red-400"}`}
          >
            {Number(growth) >= 0 ? "+" : ""}
            {growth}%
          </span>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------
// Chart
// ---------------------------------------------------------------

export interface YearOverYearProps {
  initialData?: YoYData[];
}

export default function YearOverYearChart({
  initialData = MOCK_DATA,
}: YearOverYearProps) {
  const yTicks = getYAxisTicks(initialData);
  const yMax = yTicks[yTicks.length - 1] * 1.05;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Year-over-Year Revenue
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          This year vs last year — monthly
          comparison
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart
          data={initialData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
          barCategoryGap="25%"
          barGap={3}
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
            width={50}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
          />
          <Legend content={<CustomLegend />} />

          <Bar
            dataKey="lastYear"
            name="Last Year"
            shape={LastYearBar}
          />
          <Bar
            dataKey="thisYear"
            name="This Year"
            shape={ThisYearBar}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
