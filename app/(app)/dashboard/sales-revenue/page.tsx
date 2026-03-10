import TopProducts from "@/components/dashboard/salesrevenue/TopProducts";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="p-4">
      <div className="border-b border-gray-900 py-2">
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
          <Button>Past Week</Button>
        </div>
      </div>

      {/* Actual COntent */}
      <div>
        <TopProducts
          topProducts={[
            {
              name: "Coffee",
              category: "Coffee",
              revenue: "600",
              percent: 5,
            },
          ]}
        />
      </div>
    </div>
  );
}
