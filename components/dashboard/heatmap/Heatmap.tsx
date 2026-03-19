"use client";
import { useState } from "react";

// Types

// Weekly: { day -> { hour -> count } }
export interface WeeklyHeatmapData {
  [day: string]: { [hour: string]: number };
}

// Monthly: { week -> { day -> count } }
export interface MonthlyHeatmapData {
  [week: string]: { [day: string]: number };
}

export interface HeatmapDataSet {
  weekly: WeeklyHeatmapData;
  monthly: MonthlyHeatmapData;
}

type ViewMode = "weekly" | "monthly";

// Color schemes — easy to extend or swap

export interface ColorScheme {
  name: string;
  stops: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
  ];
  lightText: string;
  darkText: string;
  threshold: number;
}

export const COLOR_SCHEMES: Record<
  string,
  ColorScheme
> = {
  blue: {
    name: "Blue",
    stops: [
      [191, 219, 254],
      [59, 130, 246],
      [30, 58, 138],
    ],
    lightText: "#1e40af",
    darkText: "#ffffff",
    threshold: 0.45,
  },
  green: {
    name: "Green",
    stops: [
      [187, 247, 208],
      [34, 197, 94],
      [20, 83, 45],
    ],
    lightText: "#166534",
    darkText: "#ffffff",
    threshold: 0.45,
  },
  purple: {
    name: "Purple",
    stops: [
      [233, 213, 255],
      [139, 92, 246],
      [76, 29, 149],
    ],
    lightText: "#6b21a8",
    darkText: "#ffffff",
    threshold: 0.45,
  },
  orange: {
    name: "Orange",
    stops: [
      [254, 215, 170],
      [249, 115, 22],
      [154, 52, 18],
    ],
    lightText: "#9a3412",
    darkText: "#ffffff",
    threshold: 0.4,
  },
};

// Constants

const DAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];
const HOURS = [
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
];
const WEEKS = ["Wk 1", "Wk 2", "Wk 3", "Wk 4"];

// Mock data

const MOCK_DATA: HeatmapDataSet = {
  weekly: {
    Mon: {
      "7am": 8,
      "8am": 18,
      "9am": 34,
      "10am": 55,
      "11am": 48,
      "12pm": 40,
      "1pm": 36,
      "2pm": 28,
      "3pm": 22,
      "4pm": 26,
      "5pm": 38,
      "6pm": 52,
      "7pm": 44,
      "8pm": 30,
      "9pm": 14,
    },
    Tue: {
      "7am": 6,
      "8am": 16,
      "9am": 30,
      "10am": 50,
      "11am": 44,
      "12pm": 37,
      "1pm": 32,
      "2pm": 24,
      "3pm": 20,
      "4pm": 23,
      "5pm": 35,
      "6pm": 48,
      "7pm": 40,
      "8pm": 27,
      "9pm": 12,
    },
    Wed: {
      "7am": 10,
      "8am": 22,
      "9am": 38,
      "10am": 60,
      "11am": 54,
      "12pm": 44,
      "1pm": 40,
      "2pm": 30,
      "3pm": 25,
      "4pm": 30,
      "5pm": 44,
      "6pm": 58,
      "7pm": 50,
      "8pm": 34,
      "9pm": 16,
    },
    Thu: {
      "7am": 7,
      "8am": 17,
      "9am": 32,
      "10am": 52,
      "11am": 46,
      "12pm": 38,
      "1pm": 34,
      "2pm": 25,
      "3pm": 21,
      "4pm": 24,
      "5pm": 37,
      "6pm": 50,
      "7pm": 42,
      "8pm": 28,
      "9pm": 13,
    },
    Fri: {
      "7am": 12,
      "8am": 26,
      "9am": 44,
      "10am": 68,
      "11am": 62,
      "12pm": 52,
      "1pm": 46,
      "2pm": 35,
      "3pm": 28,
      "4pm": 34,
      "5pm": 50,
      "6pm": 65,
      "7pm": 56,
      "8pm": 38,
      "9pm": 20,
    },
    Sat: {
      "7am": 18,
      "8am": 36,
      "9am": 58,
      "10am": 88,
      "11am": 80,
      "12pm": 68,
      "1pm": 60,
      "2pm": 46,
      "3pm": 38,
      "4pm": 46,
      "5pm": 66,
      "6pm": 84,
      "7pm": 72,
      "8pm": 50,
      "9pm": 28,
    },
    Sun: {
      "7am": 15,
      "8am": 30,
      "9am": 50,
      "10am": 75,
      "11am": 68,
      "12pm": 58,
      "1pm": 52,
      "2pm": 40,
      "3pm": 33,
      "4pm": 40,
      "5pm": 58,
      "6pm": 74,
      "7pm": 63,
      "8pm": 44,
      "9pm": 24,
    },
  },
  monthly: {
    "Wk 1": {
      Mon: 312,
      Tue: 280,
      Wed: 340,
      Thu: 295,
      Fri: 410,
      Sat: 620,
      Sun: 530,
    },
    "Wk 2": {
      Mon: 290,
      Tue: 265,
      Wed: 320,
      Thu: 275,
      Fri: 390,
      Sat: 580,
      Sun: 490,
    },
    "Wk 3": {
      Mon: 330,
      Tue: 300,
      Wed: 360,
      Thu: 310,
      Fri: 440,
      Sat: 660,
      Sun: 560,
    },
    "Wk 4": {
      Mon: 350,
      Tue: 315,
      Wed: 380,
      Thu: 325,
      Fri: 460,
      Sat: 700,
      Sun: 590,
    },
  },
};

// Color helpers

const lerp = (a: number, b: number, t: number) =>
  Math.round(a + (b - a) * t);

const getCellColor = (
  value: number,
  min: number,
  max: number,
  scheme: ColorScheme,
): string => {
  const t =
    max === min ? 0 : (value - min) / (max - min);
  const [low, mid, high] = scheme.stops;
  const [r, g, b] =
    t < 0.5
      ? [
          lerp(low[0], mid[0], t * 2),
          lerp(low[1], mid[1], t * 2),
          lerp(low[2], mid[2], t * 2),
        ]
      : [
          lerp(mid[0], high[0], (t - 0.5) * 2),
          lerp(mid[1], high[1], (t - 0.5) * 2),
          lerp(mid[2], high[2], (t - 0.5) * 2),
        ];
  return `rgb(${r},${g},${b})`;
};

const getCellTextColor = (
  value: number,
  min: number,
  max: number,
  scheme: ColorScheme,
): string => {
  const t =
    max === min ? 0 : (value - min) / (max - min);
  return t > scheme.threshold
    ? scheme.darkText
    : scheme.lightText;
};

// Stats helpers

interface WeeklyStats {
  peakDay: string;
  peakHour: string;
  peakValue: number;
  quietDay: string;
  quietHour: string;
  quietValue: number;
  busiestDay: string;
  busiestDayTotal: number;
}

interface MonthlyStats {
  peakWeek: string;
  peakDay: string;
  peakValue: number;
  quietWeek: string;
  quietDay: string;
  quietValue: number;
  busiestWeek: string;
  busiestWeekTotal: number;
}

const deriveWeeklyStats = (
  data: WeeklyHeatmapData,
): WeeklyStats => {
  let peakValue = -Infinity,
    peakDay = "",
    peakHour = "";
  let quietValue = Infinity,
    quietDay = "",
    quietHour = "";
  const dayTotals: Record<string, number> = {};
  DAYS.forEach((day) => {
    let total = 0;
    HOURS.forEach((hour) => {
      const v = data[day]?.[hour] ?? 0;
      total += v;
      if (v > peakValue) {
        peakValue = v;
        peakDay = day;
        peakHour = hour;
      }
      if (v < quietValue) {
        quietValue = v;
        quietDay = day;
        quietHour = hour;
      }
    });
    dayTotals[day] = total;
  });
  const busiest = Object.entries(dayTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];
  return {
    peakDay,
    peakHour,
    peakValue,
    quietDay,
    quietHour,
    quietValue,
    busiestDay: busiest[0],
    busiestDayTotal: busiest[1],
  };
};

const deriveMonthlyStats = (
  data: MonthlyHeatmapData,
): MonthlyStats => {
  let peakValue = -Infinity,
    peakWeek = "",
    peakDay = "";
  let quietValue = Infinity,
    quietWeek = "",
    quietDay = "";
  const weekTotals: Record<string, number> = {};
  WEEKS.forEach((week) => {
    let total = 0;
    DAYS.forEach((day) => {
      const v = data[week]?.[day] ?? 0;
      total += v;
      if (v > peakValue) {
        peakValue = v;
        peakWeek = week;
        peakDay = day;
      }
      if (v < quietValue) {
        quietValue = v;
        quietWeek = week;
        quietDay = day;
      }
    });
    weekTotals[week] = total;
  });
  const busiest = Object.entries(weekTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];
  return {
    peakWeek,
    peakDay,
    peakValue,
    quietWeek,
    quietDay,
    quietValue,
    busiestWeek: busiest[0],
    busiestWeekTotal: busiest[1],
  };
};

// Sub-components

const VIEW_OPTIONS: {
  label: string;
  value: ViewMode;
}[] = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

interface LegendProps {
  scheme: ColorScheme;
  min: number;
  max: number;
}
const Legend = ({
  scheme,
  min,
  max,
}: LegendProps) => (
  <div className="flex items-center gap-2 text-xs text-gray-400 shrink-0">
    <span>Low</span>
    <div className="flex rounded overflow-hidden h-4 w-24">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-full"
          style={{
            backgroundColor: getCellColor(
              i,
              0,
              11,
              scheme,
            ),
          }}
        />
      ))}
    </div>
    <span>High</span>
  </div>
);

// Props

export interface SalesHeatmapProps {
  initialData?: HeatmapDataSet;
  defaultColorScheme?: keyof typeof COLOR_SCHEMES;
}

// Component

export default function Heatmap({
  initialData = MOCK_DATA,
  defaultColorScheme = "blue",
}: SalesHeatmapProps) {
  const [view, setView] =
    useState<ViewMode>("weekly");
  const [schemeKey, setSchemeKey] = useState<
    keyof typeof COLOR_SCHEMES
  >(defaultColorScheme);
  const scheme = COLOR_SCHEMES[schemeKey];

  // --- Weekly view ---
  const weeklyValues = DAYS.flatMap((day) =>
    HOURS.map(
      (hour) =>
        initialData.weekly[day]?.[hour] ?? 0,
    ),
  );
  const weeklyMin = Math.min(...weeklyValues);
  const weeklyMax = Math.max(...weeklyValues);
  const weeklyStats = deriveWeeklyStats(
    initialData.weekly,
  );

  // --- Monthly view ---
  const monthlyValues = WEEKS.flatMap((week) =>
    DAYS.map(
      (day) =>
        initialData.monthly[week]?.[day] ?? 0,
    ),
  );
  const monthlyMin = Math.min(...monthlyValues);
  const monthlyMax = Math.max(...monthlyValues);
  const monthlyStats = deriveMonthlyStats(
    initialData.monthly,
  );

  const min =
    view === "weekly" ? weeklyMin : monthlyMin;
  const max =
    view === "weekly" ? weeklyMax : monthlyMax;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-2 p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-5 gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Sales Activity Heatmap
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Order counts by day of week and hour —
            darker = busier
          </p>
        </div>
        <Legend
          scheme={scheme}
          min={min}
          max={max}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
        {/* View toggle — full width on mobile */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-full sm:w-auto">
          {VIEW_OPTIONS.map(
            ({ label, value }) => (
              <button
                key={value}
                onClick={() => setView(value)}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  view === value
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {label}
              </button>
            ),
          )}
        </div>

        {/* Color scheme picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            Color:
          </span>
          <div className="flex gap-1.5">
            {Object.entries(COLOR_SCHEMES).map(
              ([key, s]) => (
                <button
                  key={key}
                  onClick={() =>
                    setSchemeKey(key)
                  }
                  title={s.name}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    schemeKey === key
                      ? "border-gray-400 scale-110"
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: `rgb(${s.stops[1].join(",")})`,
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        {view === "weekly" ? (
          <div style={{ minWidth: 360 }}>
            {/* Hour headers */}
            <div className="flex mb-1 ml-12">
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="flex-1 text-center text-xs text-gray-400 font-medium"
                >
                  <span className="sm:hidden">
                    {hour
                      .replace("am", "")
                      .replace("pm", "")}
                  </span>
                  <span className="hidden sm:block">
                    {hour}
                  </span>
                </div>
              ))}
            </div>
            {/* Day rows */}
            {DAYS.map((day) => (
              <div
                key={day}
                className="flex items-center mb-1.5"
              >
                <div className="w-12 shrink-0 text-xs sm:text-sm text-gray-500 font-medium">
                  {day}
                </div>
                <div className="flex flex-1 gap-0.5 sm:gap-1">
                  {HOURS.map((hour) => {
                    const value =
                      initialData.weekly[day]?.[
                        hour
                      ] ?? 0;
                    return (
                      <div
                        key={hour}
                        className="flex-1 rounded-md sm:rounded-lg flex items-center justify-center text-xs font-bold cursor-default select-none transition-transform hover:scale-105 h-6 sm:h-11"
                        style={{
                          backgroundColor:
                            getCellColor(
                              value,
                              weeklyMin,
                              weeklyMax,
                              scheme,
                            ),
                          color: getCellTextColor(
                            value,
                            weeklyMin,
                            weeklyMax,
                            scheme,
                          ),
                        }}
                        title={`${day} @ ${hour}: ${value} orders`}
                      >
                        <span className="hidden sm:block">
                          {value}
                        </span>{" "}
                        {/* hide numbers on mobile — too small */}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ minWidth: 320 }}>
            {" "}
            {/* Day headers */}
            <div className="flex mb-1 ml-16">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="flex-1 text-center text-xs text-gray-400 font-medium"
                >
                  <span className="sm:hidden">
                    {day.slice(0, 2)}
                  </span>{" "}
                  {/* Mo, Tu, We... */}
                  <span className="hidden sm:block">
                    {day}
                  </span>
                </div>
              ))}
            </div>
            {/* Week rows */}
            {WEEKS.map((week) => (
              <div
                key={week}
                className="flex items-center mb-1.5"
              >
                <div className="w-16 shrink-0 text-xs sm:text-sm text-gray-500 font-medium">
                  {week}
                </div>
                <div className="flex flex-1 gap-0.5 sm:gap-1">
                  {DAYS.map((day) => {
                    const value =
                      initialData.monthly[week]?.[
                        day
                      ] ?? 0;
                    return (
                      <div
                        key={day}
                        className="flex-1 rounded-md sm:rounded-lg flex items-center justify-center text-xs font-bold cursor-default select-none transition-transform hover:scale-105 h-8 sm:h-13"
                        style={{
                          backgroundColor:
                            getCellColor(
                              value,
                              monthlyMin,
                              monthlyMax,
                              scheme,
                            ),
                          color: getCellTextColor(
                            value,
                            monthlyMin,
                            monthlyMax,
                            scheme,
                          ),
                        }}
                        title={`${week} ${day}: ${value} orders`}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-gray-100">
        {view === "weekly" ? (
          <>
            {[
              {
                label: "Peak Slot",
                primary: `${weeklyStats.peakDay} @ ${weeklyStats.peakHour}`,
                secondary: `${weeklyStats.peakValue} orders`,
                secondaryColor: `rgb(${scheme.stops[1].join(",")})`,
              },
              {
                label: "Quietest Slot",
                primary: `${weeklyStats.quietDay} @ ${weeklyStats.quietHour}`,
                secondary: `${weeklyStats.quietValue} orders`,
                secondaryColor: undefined,
              },
              {
                label: "Busiest Day",
                primary: weeklyStats.busiestDay,
                secondary: `${weeklyStats.busiestDayTotal} total orders`,
                secondaryColor: "#22c55e",
              },
            ].map(
              ({
                label,
                primary,
                secondary,
                secondaryColor,
              }) => (
                <div
                  key={label}
                  className="flex items-center justify-between sm:flex-col sm:items-center border-b sm:border-b-0 pb-3 sm:pb-0 last:border-b-0 last:pb-0"
                >
                  <p className="text-xs text-gray-400 sm:mb-1">
                    {label}
                  </p>
                  <div className="text-right sm:text-center">
                    <p className="text-sm font-bold text-gray-900">
                      {primary}
                    </p>
                    <p
                      className="text-xs sm:text-sm font-medium"
                      style={{
                        color:
                          secondaryColor ??
                          "#9ca3af",
                      }}
                    >
                      {secondary}
                    </p>
                  </div>
                </div>
              ),
            )}
          </>
        ) : (
          <>
            {[
              {
                label: "Peak Slot",
                primary: `${monthlyStats.peakWeek} · ${monthlyStats.peakDay}`,
                secondary: `${monthlyStats.peakValue} orders`,
                secondaryColor: `rgb(${scheme.stops[1].join(",")})`,
              },
              {
                label: "Quietest Slot",
                primary: `${monthlyStats.quietWeek} · ${monthlyStats.quietDay}`,
                secondary: `${monthlyStats.quietValue} orders`,
                secondaryColor: undefined,
              },
              {
                label: "Busiest Week",
                primary: monthlyStats.busiestWeek,
                secondary: `${monthlyStats.busiestWeekTotal} total orders`,
                secondaryColor: "#22c55e",
              },
            ].map(
              ({
                label,
                primary,
                secondary,
                secondaryColor,
              }) => (
                <div
                  key={label}
                  className="flex items-center justify-between sm:flex-col sm:items-center border-b sm:border-b-0 pb-3 sm:pb-0 last:border-b-0 last:pb-0"
                >
                  <p className="text-xs text-gray-400 sm:mb-1">
                    {label}
                  </p>
                  <div className="text-right sm:text-center">
                    <p className="text-sm font-bold text-gray-900">
                      {primary}
                    </p>
                    <p
                      className="text-xs sm:text-sm font-medium"
                      style={{
                        color:
                          secondaryColor ??
                          "#9ca3af",
                      }}
                    >
                      {secondary}
                    </p>
                  </div>
                </div>
              ),
            )}
          </>
        )}
      </div>
    </div>
  );
}
