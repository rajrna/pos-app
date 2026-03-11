import GrowthTrackCard from "@/components/dashboard/growthtracker/GrowthTrackCard";

const stats = [
  {
    label: "Revenue Growth (MoM)",
    value: "$124,500",
    prev: "$116,900",
    percent: 6.4,
    inverseColor: false,
  },
  {
    label: "Order Growth (MoM)",
    value: "1,420",
    prev: "1,342",
    percent: 5.8,
    inverseColor: false,
  },
  {
    label: "Avg Order Value",
    value: "$88.60",
    prev: "$86.40",
    percent: 2.1,
    inverseColor: false,
  },
  {
    label: "Customer Growth (MoM)",
    value: "700",
    prev: "641",
    percent: 9.2,
    inverseColor: false,
  },
  {
    label: "Profit Margin",
    value: "34.0%",
    prev: "34.8%",
    percent: -0.8,
    inverseColor: false,
  },
  {
    label: "Refund Rate",
    value: "3.1%",
    prev: "3.4%",
    percent: -0.3,
    inverseColor: true,
  },
];

export default function Page() {
  return (
    <div className="py-8 px-4">
      <h1 className="font-semibold text-xl">
        Growth Tracker
      </h1>
      <p className="text-gray-600">
        Month-over-month and year-over-year
        performance analysis
      </p>

      <div className="flex flex-wrap items-center justify-center my-4 gap-2">
        {stats.map((stat) => (
          <GrowthTrackCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            prev={stat.prev}
            percent={stat.percent}
            inverseColor={stat.inverseColor}
          />
        ))}
      </div>
    </div>
  );
}
