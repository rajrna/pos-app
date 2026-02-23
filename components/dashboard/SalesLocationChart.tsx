// "use client";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   TooltipProps,
// } from "recharts";
// import {
//   NameType,
//   ValueType,
// } from "recharts/types/component/DefaultTooltipContent";

// interface LocationData {
//   name: string;
//   value: number;
//   color: string;
// }

// const data: LocationData[] = [
//   {
//     name: "Downtown",
//     value: 45,
//     color: "#60a5fa",
//   },
//   {
//     name: "Westside",
//     value: 25,
//     color: "#a78bfa",
//   },
//   {
//     name: "Suburbs",
//     value: 30,
//     color: "#ec4899",
//   },
// ];

// interface CustomTooltipProps {
//   active?: boolean;
//   payload?: Payload<ValueType, NameType>[];
// }
// const CustomTooltip = ({
//   active,
//   payload,
// }: CustomTooltipProps) => {
//   if (active && payload && payload.length) {
//     const entry = payload[0]
//       .payload as LocationData;
//     return (
//       <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
//         <p className="text-gray-500 text-xs">
//           {entry.name}
//         </p>
//         <p
//           className="font-bold text-sm"
//           style={{ color: entry.color }}
//         >
//           {entry.value}%
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// export default function SalesLocationChart() {
//   return (
//     // <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full flex-1 max-w-xl">
//     <div className="flex-1 min-w-70 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
//       {/* Header */}
//       <div className="mb-4">
//         <h2 className="text-lg font-bold text-gray-900">
//           Sales by Location
//         </h2>
//         <p className="text-sm text-gray-400 mt-0.5">
//           Revenue share across branches
//         </p>
//       </div>

//       {/* Donut Chart */}
//       <div className="flex items-center justify-center py-2">
//         <ResponsiveContainer
//           width="100%"
//           height={220}
//         >
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               innerRadius={70}
//               outerRadius={100}
//               paddingAngle={3}
//               dataKey="value"
//               startAngle={90}
//               endAngle={-270}
//             >
//               {data.map((entry) => (
//                 <Cell
//                   key={entry.name}
//                   fill={entry.color}
//                   stroke="none"
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               content={<CustomTooltip />}
//             />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Legend */}
//       <div className="mt-2 space-y-3 px-2">
//         {data.map((entry) => (
//           <div
//             key={entry.name}
//             className="flex items-center justify-between"
//           >
//             {/* Left: dot + label */}
//             <div className="flex items-center gap-2">
//               <span
//                 className="w-2.5 h-2.5 rounded-full shrink-0"
//                 style={{
//                   backgroundColor: entry.color,
//                 }}
//               />
//               <span className="text-sm text-gray-700">
//                 {entry.name}
//               </span>
//             </div>

//             {/* Center: progress bar */}
//             <div className="flex-1 mx-4">
//               <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
//                 <div
//                   className="h-full rounded-full"
//                   style={{
//                     width: `${entry.value}%`,
//                     backgroundColor: entry.color,
//                     opacity: 0.6,
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Right: percentage */}
//             <span className="text-sm font-semibold text-gray-700 w-10 text-right">
//               {entry.value}%
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
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

interface LocationData {
  name: string;
  value: number;
  color: string;
}

const data: LocationData[] = [
  {
    name: "Downtown",
    value: 45,
    color: "#60a5fa",
  },
  {
    name: "Westside",
    value: 25,
    color: "#a78bfa",
  },
  {
    name: "Suburbs",
    value: 30,
    color: "#ec4899",
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload<ValueType, NameType>[];
}

const CustomTooltip = ({
  active,
  payload,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const entry = payload[0]
      .payload as LocationData;
    return (
      <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
        <p className="text-gray-500 text-xs">
          {entry.name}
        </p>
        <p
          className="font-bold text-sm"
          style={{ color: entry.color }}
        >
          {entry.value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function SalesLocationChart() {
  return (
    <div className="flex-1 min-w-70 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          Sales by Location
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Revenue share across branches
        </p>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center py-2">
        <ResponsiveContainer
          width="100%"
          height={220}
        >
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-2 space-y-3 px-2">
        {data.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center justify-between"
          >
            {/* Left: dot + label */}
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: entry.color,
                }}
              />
              <span className="text-sm text-gray-700">
                {entry.name}
              </span>
            </div>

            {/* Center: progress bar */}
            <div className="flex-1 mx-4">
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${entry.value}%`,
                    backgroundColor: entry.color,
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>

            {/* Right: percentage */}
            <span className="text-sm font-semibold text-gray-700 w-10 text-right">
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
