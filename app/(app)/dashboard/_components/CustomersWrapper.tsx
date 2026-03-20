import TopCustomer from "@/components/dashboard/cutomerdash/TopCustomer";
import AtRiskCustomer from "@/components/dashboard/cutomerdash/AtRiskCustomer";
import {
  getAtRiskCustomers,
  getCustomerSegmentation,
  getCustomerStats,
  getCustomerTrendData,
  getLoyaltyTierData,
  getTopCustomers,
} from "@/services/dashboard/apiCustomerDash";
import CustomerTrendChart from "@/components/dashboard/cutomerdash/CustomerTrendChart";
import LoyaltyTierChart from "@/components/dashboard/cutomerdash/LoyaltyTierChart";
import CustomerSegmentationChart from "@/components/dashboard/cutomerdash/CustomerSegmentationChart";
import { CUSTOMER_STAT_CONFIG } from "@/lib/config/dashboard";
import CustomerStatBox from "@/components/dashboard/cutomerdash/CustomerStatBox";

export async function CustomerStatsWrapper() {
  const customerStat = await getCustomerStats();
  const stats = CUSTOMER_STAT_CONFIG.map(
    (config) => ({
      ...config,
      ...customerStat[config.key],
    }),
  );
  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 my-4">
      {stats.map(({ key, ...stat }) => (
        <CustomerStatBox key={key} {...stat} />
      ))}
    </div>
  );
}

export async function CustomerSegmentationChartWrapper() {
  const data = await getCustomerSegmentation();
  return (
    <CustomerSegmentationChart data={data} />
  );
}

export async function LoyaltyTierChartWrapper() {
  const data = await getLoyaltyTierData();
  return <LoyaltyTierChart data={data} />;
}

export async function CustomerTrendChartWrapper() {
  const data = await getCustomerTrendData();
  return <CustomerTrendChart data={data} />;
}

export async function TopCustomersWrapper() {
  const data = await getTopCustomers();
  return <TopCustomer topCustomers={data} />;
}

export async function AtRiskCustomerWrapper() {
  const data = await getAtRiskCustomers();
  return <AtRiskCustomer riskCustomers={data} />;
}
