import {
  CreditCard,
  DollarSign,
  LucideIcon,
  Package,
  ShoppingBag,
  Users,
  User,
  Gift,
} from "lucide-react";

// For dashboard overview stats
export interface StatConfig {
  key: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
}

export const STATS_CONFIG: StatConfig[] = [
  {
    key: "totalSales",
    label: "Total Sales",
    icon: DollarSign,
    iconColor: "text-blue-500",
  },
  {
    key: "totalOrders",
    label: "Total Orders",
    icon: ShoppingBag,
    iconColor: "text-purple-500",
  },
  {
    key: "productsSold",
    label: "Products Sold",
    icon: Package,
    iconColor: "text-red-500",
  },
  {
    key: "netProfit",
    label: "Net Profit",
    icon: CreditCard,
    iconColor: "text-green-500",
  },
];

// For Customer Stats
export const CUSTOMER_STAT_CONFIG = [
  {
    key: "totalMembers",
    label: "Total Members",
    icon: Users,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    key: "activeCustomers",
    label: "Active This Month",
    icon: User,
    iconColor: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    key: "points",
    label: "Points Redeemed",
    icon: Gift,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-100",
  },
];

// For Growth Stats
export const GROWTH_STAT_CONFIG = [
  {
    key: "revenue",
    label: "Revenue Growth (MoM)",
    inverseColor: false,
  },
  {
    key: "orders",
    label: "Order Growth (MoM)",
    inverseColor: false,
  },
  {
    key: "avgOrder",
    label: "Avg Order Value",
    inverseColor: false,
  },
  {
    key: "customers",
    label: "Customer Growth (MoM)",
    inverseColor: false,
  },
  {
    key: "margin",
    label: "Profit Margin",
    inverseColor: false,
  },
  {
    key: "refunds",
    label: "Refund Rate",
    inverseColor: true,
  },
] as const;
