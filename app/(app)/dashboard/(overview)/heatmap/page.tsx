import Heatmap from "@/components/dashboard/heatmap/Heatmap";
import { getHeatmapData } from "@/services/dashboard/apiHeatmap";

export default async function Page() {
  const heatmapData = await getHeatmapData();
  return (
    <div className="w-full px-4">
      <Heatmap data={heatmapData} />
    </div>
  );
}
