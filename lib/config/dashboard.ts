import {
  CreditCard,
  DollarSign,
  LucideIcon,
  Package,
  ShoppingBag,
  Users,
  User,
  Gift,
  Award,
  TrendingUp,
  RefreshCcw,
  Percent,
  ChartPie,
  ArrowUpDown,
} from "lucide-react";

// For dashboard overview stats
export interface StatConfig {
  key: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor?: string;
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
export const CUSTOMER_STAT_CONFIG: StatConfig[] =
  [
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
      key: "pointsRedeemed",
      label: "Points Redeemed",
      icon: Gift,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      key: "pointsPerMember",
      label: "Avg Points / Member",
      icon: Award,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-100",
    },
  ];

// For Profit & Cost Stats
export const PROFIT_COST_STAT_CONFIG = [
  {
    key: "grossRevenue",
    label: "Gross Revenue",
    icon: DollarSign,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    key: "netProfit",
    label: "Net Profit",
    icon: TrendingUp,
    iconColor: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    key: "totalRefunds",
    label: "Total Refunds",
    icon: RefreshCcw,
    iconColor: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    key: "avgMargin",
    label: "Avg Margin",
    icon: Percent,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-100",
  },
];
// For Expenses Stats
export const EXPENSE_STAT_CONFIG = [
  {
    key: "totalExpenses",
    label: "Total Expenses",
    icon: DollarSign,
    iconColor: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    key: "totalBudget",
    label: "Total Budget",
    icon: ChartPie,
    iconColor: "text-grey-500",
    bgColor: "bg-grey-100",
  },
  {
    key: "budgetVariance",
    label: "Budget Variance",
    icon: ArrowUpDown,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    key: "revenueMargin",
    label: "% of Revenue",
    icon: Percent,
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
    label: "Avg Order Value (AoV)",
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
