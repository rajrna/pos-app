import { HeatmapDataSet } from "@/components/dashboard/heatmap/Heatmap";
import { MOCK_DATA } from "@/components/dashboard/heatmap/mock-heatmapdata";

export async function getHeatmapData(): Promise<HeatmapDataSet> {
  return MOCK_DATA;
}
