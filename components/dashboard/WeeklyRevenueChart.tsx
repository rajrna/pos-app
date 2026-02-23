// "use client";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Rectangle,
//   BarShapeProps,
// } from "recharts";
// import { TooltipProps } from "recharts";
// import {
//   NameType,
//   ValueType,
// } from "recharts/types/component/DefaultTooltipContent";

// interface DataPoint {
//   day: string;
//   revenue: number;
// }

// const data: DataPoint[] = [
//   { day: "Mon", revenue: 13000 },
//   { day: "Tue", revenue: 12000 },
//   { day: "Wed", revenue: 15500 },
//   { day: "Thu", revenue: 12500 },
//   { day: "Fri", revenue: 17000 },
//   { day: "Sat", revenue: 22000 },
//   { day: "Sun", revenue: 18000 },
// ];

// const PEAK_DAY = "Sat";
// const BAR_COLOR_DEFAULT = "#60a5fa";
// const BAR_COLOR_PEAK = "#2563eb";

// const formatYAxis = (value: number): string =>
//   `$${value / 1000}k`;

// // Custom bar shape using the `shape` prop — replaces deprecated Cell
// const CustomBar = (props: BarShapeProps) => {
//   const isPeak =
//     (props as BarShapeProps & { day?: string })
//       .day === PEAK_DAY;
//   return (
//     <Rectangle
//       {...props}
//       fill={
//         isPeak
//           ? BAR_COLOR_PEAK
//           : BAR_COLOR_DEFAULT
//       }
//       radius={[4, 4, 0, 0]}
//     />
//   );
// };

// const CustomTooltip = ({
//   active,
//   payload,
//   label,
// }: TooltipProps<ValueType, NameType>) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100">
//         <p className="text-gray-400 text-xs mb-1">
//           {label}
//         </p>
//         <p className="text-blue-500 font-bold text-base">
//           $
//           {(
//             payload[0].value as number
//           ).toLocaleString()}
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// export default function WeeklyRevenueChart() {
//   return (
//     <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-gray-900">
//           Daily Sales Trend
//         </h2>
//         <p className="text-sm text-gray-400 mt-1">
//           Revenue performance – current week
//         </p>
//       </div>

//       {/* Chart */}
//       <ResponsiveContainer
//         width="100%"
//         height={280}
//       >
//         <BarChart
//           data={data}
//           margin={{
//             top: 10,
//             right: 0,
//             left: 10,
//             bottom: 0,
//           }}
//           barCategoryGap="35%"
//         >
//           <CartesianGrid
//             vertical={false}
//             stroke="#f3f4f6"
//           />
//           <XAxis
//             dataKey="day"
//             axisLine={false}
//             tickLine={false}
//             tick={{
//               fill: "#9ca3af",
//               fontSize: 13,
//             }}
//           />
//           <YAxis
//             tickFormatter={formatYAxis}
//             axisLine={false}
//             tickLine={false}
//             tick={{
//               fill: "#9ca3af",
//               fontSize: 12,
//             }}
//             ticks={[0, 6000, 11000, 17000, 22000]}
//             domain={[0, 24000]}
//           />
//           <Tooltip
//             content={<CustomTooltip />}
//             cursor={{
//               fill: "rgba(59,130,246,0.05)",
//             }}
//           />
//           <Bar
//             dataKey="revenue"
//             shape={<CustomBar />}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
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

interface DataPoint {
  day: string;
  revenue: number;
}

const data: DataPoint[] = [
  { day: "Mon", revenue: 13000 },
  { day: "Tue", revenue: 12000 },
  { day: "Wed", revenue: 15500 },
  { day: "Thu", revenue: 12500 },
  { day: "Fri", revenue: 17000 },
  { day: "Sat", revenue: 22000 },
  { day: "Sun", revenue: 18000 },
];

const PEAK_DAY = "Sat";
const BAR_COLOR_DEFAULT = "#60a5fa";
const BAR_COLOR_PEAK = "#2563eb";

const formatYAxis = (value: number): string =>
  `$${value / 1000}k`;

// ✅ Fix 3: shape prop expects a function, not a JSX element.
// Also access `day` via index lookup instead of casting props,
// since BarShapeProps doesn't include custom data keys directly.
const CustomBar = (props: BarShapeProps) => {
  const barData = data[props.index ?? 0];
  const isPeak = barData?.day === PEAK_DAY;
  return (
    <Rectangle
      {...props}
      fill={
        isPeak
          ? BAR_COLOR_PEAK
          : BAR_COLOR_DEFAULT
      }
      radius={[4, 4, 0, 0]}
    />
  );
};

// ✅ Fix 1 & 2: Use explicit interface with Payload type
// instead of TooltipProps, which doesn't expose `payload` or `label` reliably.
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
        <p className="text-blue-500 font-bold text-base">
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

export default function WeeklyRevenueChart() {
  return (
    <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Daily Sales Trend
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Revenue performance – current week
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer
        width="100%"
        height={280}
      >
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 10,
            bottom: 0,
          }}
          barCategoryGap="35%"
        >
          <CartesianGrid
            vertical={false}
            stroke="#f3f4f6"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 13,
            }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 12,
            }}
            ticks={[0, 6000, 11000, 17000, 22000]}
            domain={[0, 24000]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              fill: "rgba(59,130,246,0.05)",
            }}
          />
          {/* ✅ Fix 3: Pass shape as a function reference, not a JSX element */}
          <Bar
            dataKey="revenue"
            shape={CustomBar}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
