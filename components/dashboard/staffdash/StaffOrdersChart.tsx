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

interface StaffHourlyData {
  hour: string;
  Arthur: number | null;
  John: number | null;
  Dutch: number | null;
  Charles: number | null;
  Micah: number | null;
}

// Morning shift: Aisha, John,  Charles (7am–12pm)
// Afternoon shift: Dutch, Micah (12pm–7pm)
const data: StaffHourlyData[] = [
  {
    hour: "7am",
    Arthur: 22,
    John: 18,
    Dutch: 0,
    Charles: 15,
    Micah: null,
  },
  {
    hour: "8am",
    Arthur: 32,
    John: 28,
    Dutch: 0,
    Charles: 25,
    Micah: null,
  },
  {
    hour: "9am",
    Arthur: 46,
    John: 42,
    Dutch: 0,
    Charles: 38,
    Micah: null,
  },
  {
    hour: "10am",
    Arthur: 55,
    John: 52,
    Dutch: 0,
    Charles: 46,
    Micah: null,
  },
  {
    hour: "11am",
    Arthur: 54,
    John: 50,
    Dutch: 0,
    Charles: 44,
    Micah: null,
  },
  {
    hour: "12pm",
    Arthur: 35,
    John: 32,
    Dutch: 2,
    Charles: 30,
    Micah: null,
  },
  {
    hour: "1pm",
    Arthur: 0,
    John: 0,
    Dutch: 24,
    Charles: 0,
    Micah: 30,
  },
  {
    hour: "2pm",
    Arthur: 0,
    John: 0,
    Dutch: 22,
    Charles: 0,
    Micah: 26,
  },
  {
    hour: "3pm",
    Arthur: 0,
    John: 0,
    Dutch: 19,
    Charles: 0,
    Micah: 24,
  },
  {
    hour: "4pm",
    Arthur: 0,
    John: 0,
    Dutch: 22,
    Charles: 0,
    Micah: 28,
  },
  {
    hour: "5pm",
    Arthur: 0,
    John: 0,
    Dutch: 28,
    Charles: 0,
    Micah: 36,
  },
  {
    hour: "6pm",
    Arthur: 0,
    John: 0,
    Dutch: 31,
    Charles: 0,
    Micah: 40,
  },
  {
    hour: "7pm",
    Arthur: 0,
    John: 0,
    Dutch: 28,
    Charles: 0,
    Micah: 33,
  },
];

const STAFF_LINES: {
  key: keyof Omit<StaffHourlyData, "hour">;
  color: string;
}[] = [
  { key: "Arthur", color: "#f472b6" }, // pink
  { key: "John", color: "#60a5fa" }, // blue
  { key: "Dutch", color: "#f59e0b" }, // amber
  { key: "Charles", color: "#34d399" }, // green
  { key: "Micah", color: "#a78bfa" }, // purple
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
    const active_entries = payload.filter(
      (p) => (p.value as number) > 0,
    );
    if (!active_entries.length) return null;
    return (
      <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100 min-w-32">
        <p className="text-gray-400 text-xs mb-2 font-medium">
          {label}
        </p>
        {active_entries.map((entry) => (
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
              {entry.value as number}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-6 mt-2">
    {STAFF_LINES.map(({ key, color }) => (
      <div
        key={key}
        className="flex items-center gap-1.5"
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs text-gray-600">
          {key}
        </span>
      </div>
    ))}
  </div>
);

export default function StaffOrdersChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Orders Per Hour by Staff
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Throughput breakdown across the day per
          team member
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#f3f4f6"
          />

          <XAxis
            dataKey="hour"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 12,
            }}
            dy={8}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 12,
            }}
            ticks={[0, 15, 30, 45, 60]}
            domain={[0, 65]}
            width={30}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend content={<CustomLegend />} />

          {STAFF_LINES.map(({ key, color }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              dot={{
                r: 3,
                fill: color,
                stroke: color,
              }}
              activeDot={{
                r: 5,
                fill: color,
                stroke: "#fff",
                strokeWidth: 2,
              }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
