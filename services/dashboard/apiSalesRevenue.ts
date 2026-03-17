import {
  mockRevenueVsProfit,
  mockSalesTrendData,
  mockSlowProducts,
  mockTopProducts,
} from "@/components/dashboard/salesrevenue/mock-salesrevenue";
import { ProductData } from "@/components/dashboard/salesrevenue/RevenueVsProfitChart";
import { SalesTrendsData } from "@/components/dashboard/salesrevenue/SalesTrendChart";
import { SlowProduct } from "@/components/dashboard/salesrevenue/slow-product-columns";
import { TopProduct } from "@/components/dashboard/salesrevenue/top-product-columns";

export async function getTopProducts(): Promise<
  TopProduct[]
> {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/products/top`,
  //     {
  //       next: { revalidate: 300 },
  //     },
  //   );
  //   if (!res.ok)
  //     throw new Error(
  //       "Failed to fetch top products",
  //     );
  //   return res.json();
  return mockTopProducts;
}

export async function getSlowProducts(): Promise<
  SlowProduct[]
> {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/products/slowproducts`,
  //     {
  //       next: { revalidate: 300 },
  //     },
  //   );
  //   if (!res.ok)
  //     throw new Error(
  //       "Failed to fetch slow products",
  //     );
  //   return res.json();
  return mockSlowProducts;
}

// Replace later with real api
export async function getRevenueVsProfitData(): Promise<
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

export async function getSalesTrends(): Promise<SalesTrendsData> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sales/trends`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return mockSalesTrendData;
  }
}
