import { StatsApiResponse } from "../dashboardstats";
import { RawReportResponse } from "../types/report";

export function mapReportToStats(
  response: RawReportResponse,
): StatsApiResponse {
  const { totalSales, totalRevenue, profit } =
    response.data.report;
  return {
    totalSales: {
      value: totalRevenue,
      percent: 0,
    },
    totalOrders: {
      value: totalSales,
      percent: 0,
    },
    netProfit: { value: profit, percent: 0 },
    productsSold: { value: 0, percent: 0 },
  };
}
