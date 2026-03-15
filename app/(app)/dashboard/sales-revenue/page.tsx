import RevenueVsProfitChart, {
  ProductData,
} from "@/components/dashboard/growthtracker/RevenueVsProfitChart";
import SalesTrendChart from "@/components/dashboard/growthtracker/SalesTrendChart";
import SlowProducts from "@/components/dashboard/salesrevenue/SlowProducts";
import TopProducts from "@/components/dashboard/salesrevenue/TopProducts";

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
export default async function Page() {
  const [revenueVsProfitData] = await Promise.all(
    [
      getRevenueVsProfitData(),
      // getHourlySalesData(),
      // getCustomerTrendData(),
    ],
  );
  return (
    <div className="p-4">
      <div className="border-b border-gray-200 py-2">
        <h1 className="text-2xl font-bold ">
          Sales & Revenue
        </h1>

        <p>
          Detailed breakdown of your store&apos;s
          financial performance
        </p>

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold mt-10">
            Performance metrics
          </h1>
        </div>
      </div>

      {/* Actual COntent */}
      <div className="flex flex-wrap gap-1">
        <TopProducts
          topProducts={[
            {
              name: "Coffee",
              category: "Coffee",
              revenue: "600",
              percent: 5,
            },
            {
              name: "Latte",
              category: "Coffee",
              revenue: "500",
              percent: -5,
            },
          ]}
        />
        <SlowProducts
          slowProducts={[
            {
              name: "Matcha Latte",
              days: 5,
              stockAmount: 10,
            },
            {
              name: "Black Coffee",
              days: 3,
              stockAmount: 9,
            },
          ]}
        />
      </div>
      <RevenueVsProfitChart
        initialData={revenueVsProfitData}
      />
      <SalesTrendChart />
    </div>
  );
}
