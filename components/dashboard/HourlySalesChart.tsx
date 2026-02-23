// "use client";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   TooltipProps,
// } from "recharts";
// import {
//   NameType,
//   ValueType,
// } from "recharts/types/component/DefaultTooltipContent";

// interface HourlyData {
//   hour: string;
//   revenue: number;
// }

// const data: HourlyData[] = [
//   { hour: "7am", revenue: 580 },
//   { hour: "8am", revenue: 1020 },
//   { hour: "9am", revenue: 1350 },
//   { hour: "10am", revenue: 2420 },
//   { hour: "11am", revenue: 1900 },
//   { hour: "12pm", revenue: 1580 },
//   { hour: "1pm", revenue: 1420 },
//   { hour: "2pm", revenue: 1080 },
//   { hour: "3pm", revenue: 1020 },
//   { hour: "4pm", revenue: 1130 },
//   { hour: "5pm", revenue: 1420 },
//   { hour: "6pm", revenue: 2050 },
//   { hour: "7pm", revenue: 1720 },
//   { hour: "8pm", revenue: 1050 },
// ];

// const formatYAxis = (value: number): string =>
//   `$${value}`;

// const CustomTooltip = ({
//   active,
//   payload,
//   label,
// }: TooltipProps<ValueType, NameType>) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
//         <p className="text-gray-400 text-xs">
//           {label}
//         </p>
//         <p className="font-bold text-sm text-violet-600">
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

// export default function HourlySalesTrend() {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full mt-4">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-lg font-bold text-gray-900">
//           Hourly Sales Trend
//         </h2>
//         <p className="text-sm text-gray-400 mt-0.5">
//           Revenue throughput across all operating
//           hours today
//         </p>
//       </div>

//       {/* Chart */}
//       <ResponsiveContainer
//         width="100%"
//         height={300}
//       >
//         <AreaChart
//           data={data}
//           margin={{
//             top: 10,
//             right: 10,
//             left: 10,
//             bottom: 0,
//           }}
//         >
//           <defs>
//             <linearGradient
//               id="revenueGradient"
//               x1="0"
//               y1="0"
//               x2="0"
//               y2="1"
//             >
//               <stop
//                 offset="0%"
//                 stopColor="#7c3aed"
//                 stopOpacity={0.18}
//               />
//               <stop
//                 offset="100%"
//                 stopColor="#7c3aed"
//                 stopOpacity={0.01}
//               />
//             </linearGradient>
//           </defs>

//           <CartesianGrid
//             vertical={false}
//             stroke="#f3f4f6"
//           />

//           <XAxis
//             dataKey="hour"
//             axisLine={false}
//             tickLine={false}
//             tick={{
//               fill: "#9ca3af",
//               fontSize: 12,
//             }}
//             dy={8}
//           />

//           <YAxis
//             tickFormatter={formatYAxis}
//             axisLine={false}
//             tickLine={false}
//             tick={{
//               fill: "#9ca3af",
//               fontSize: 12,
//             }}
//             ticks={[0, 600, 1200, 1800, 2400]}
//             domain={[0, 2600]}
//             width={55}
//           />

//           <Tooltip
//             content={<CustomTooltip />}
//             cursor={{
//               stroke: "#7c3aed",
//               strokeWidth: 1,
//               strokeDasharray: "4 4",
//             }}
//           />

//           <Area
//             type="monotone"
//             dataKey="revenue"
//             stroke="#7c3aed"
//             strokeWidth={2.5}
//             fill="url(#revenueGradient)"
//             dot={{
//               r: 4,
//               fill: "#7c3aed",
//               stroke: "#fff",
//               strokeWidth: 2,
//             }}
//             activeDot={{
//               r: 6,
//               fill: "#7c3aed",
//               stroke: "#fff",
//               strokeWidth: 2,
//             }}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface HourlyData {
  hour: string;
  revenue: number;
}

const data: HourlyData[] = [
  { hour: "7am", revenue: 580 },
  { hour: "8am", revenue: 1020 },
  { hour: "9am", revenue: 1350 },
  { hour: "10am", revenue: 2420 },
  { hour: "11am", revenue: 1900 },
  { hour: "12pm", revenue: 1580 },
  { hour: "1pm", revenue: 1420 },
  { hour: "2pm", revenue: 1080 },
  { hour: "3pm", revenue: 1020 },
  { hour: "4pm", revenue: 1130 },
  { hour: "5pm", revenue: 1420 },
  { hour: "6pm", revenue: 2050 },
  { hour: "7pm", revenue: 1720 },
  { hour: "8pm", revenue: 1050 },
];

const formatYAxis = (value: number): string =>
  `$${value}`;

// ✅ Explicit interface instead of TooltipProps<ValueType, NameType>
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
        <p className="font-bold text-sm text-violet-600">
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

export default function HourlySalesTrend() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full mt-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Hourly Sales Trend
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Revenue throughput across all operating
          hours today
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="revenueGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#7c3aed"
                stopOpacity={0.18}
              />
              <stop
                offset="100%"
                stopColor="#7c3aed"
                stopOpacity={0.01}
              />
            </linearGradient>
          </defs>

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
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 12,
            }}
            ticks={[0, 600, 1200, 1800, 2400]}
            domain={[0, 2600]}
            width={55}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#7c3aed",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#7c3aed"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            dot={{
              r: 4,
              fill: "#7c3aed",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "#7c3aed",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
