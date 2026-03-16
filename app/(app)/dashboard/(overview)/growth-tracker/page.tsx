import GrowthTrackCard from "@/components/dashboard/growthtracker/GrowthTrackCard";
import RevenueVsProfitChart, {
  type ProductData,
} from "@/components/dashboard/growthtracker/RevenueVsProfitChart";
import TargetVsActualChart, {
  TargetActualData,
} from "@/components/dashboard/growthtracker/TargetVsActualChart";
import YearOverYearChart from "@/components/dashboard/growthtracker/YearOverYearChart";
import { GROWTH_STAT_CONFIG } from "@/lib/config/dashboard";
import { GrowthStatsApiResponse } from "@/lib/dashboardstats";

const mockGrowthStats: GrowthStatsApiResponse = {
  revenue: {
    value: "$124,500",
    prev: "$116,900",
    percent: 6.4,
  },
  orders: {
    value: "1,420",
    prev: "1,342",
    percent: 5.8,
  },
  avgOrder: {
    value: "$88.60",
    prev: "$86.40",
    percent: 2.1,
  },
  customers: {
    value: "700",
    prev: "641",
    percent: 9.2,
  },
  margin: {
    value: "34.0%",
    prev: "34.8%",
    percent: -0.8,
  },
  refunds: {
    value: "3.1%",
    prev: "3.4%",
    percent: -0.3,
  },
};
const mockRevenueVsProfit: ProductData[] = [
  {
    product: "Espresso",
    revenue: 12800,
    profit: 8200,
  },
  {
    product: "Latte",
    revenue: 18200,
    profit: 13200,
  },
  {
    product: "Cappuccino",
    revenue: 15000,
    profit: 9800,
  },
  {
    product: "Cold Brew",
    revenue: 9200,
    profit: 7200,
  },
  {
    product: "Pastries",
    revenue: 14000,
    profit: 5200,
  },
  {
    product: "Sandwiches",
    revenue: 10200,
    profit: 4800,
  },
];

const mockTargetActualData: TargetActualData[] = [
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

// Replace later with real api
async function getRevenueVsProfitData(): Promise<
  ProductData[]
> {
  // try {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/products/revenue-profit?range=30d`,
  //     { next: { revalidate: 300 } },
  //   );
  //   if (!res.ok) throw new Error();
  //   return res.json();
  // } catch {
  //   return [];
  // }
  return mockRevenueVsProfit;
}

async function getTargetActualData(): Promise<
  TargetActualData[]
> {
  return mockTargetActualData;
}
export default async function Page() {
  // Fetch all server data in parallel — add more fetches here as charts are added
  const [revenueVsProfitData] = await Promise.all(
    [
      getRevenueVsProfitData(),
      getTargetActualData(),
    ],
  );

  const stats = GROWTH_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...mockGrowthStats[config.key],
    }),
  );

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
        {stats.map(({ key, ...stat }) => (
          <GrowthTrackCard key={key} {...stat} />
        ))}
      </div>

      {/* <RevenueVsProfitChart
        initialData={revenueVsProfitData}
      /> */}
      <div className="flex flex-wrap">
        <TargetVsActualChart
          initialData={mockTargetActualData}
        />
        <YearOverYearChart />
      </div>
    </div>
  );
}
