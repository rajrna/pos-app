import {
  LayoutDashboard,
  CreditCard,
  ShoppingCart,
  Receipt,
  Gauge,
  Calculator,
  Building2,
  LucideIcon,
  Building,
} from "lucide-react";

export type NavigationItem =
  | {
      type: "single";
      label: string;
      href: string;
      icon: LucideIcon;
    }
  | {
      type: "section";
      label: string;
      icon: LucideIcon;
      items: { label: string; href: string }[];
    };

export const navigationConfig: NavigationItem[] =
  [
    {
      type: "single",
      label: "Dashboard",
      href: "/dashboard",
      icon: Gauge,
    },
    {
      type: "section",
      label: "Sales & Payments",
      icon: CreditCard,
      items: [
        {
          label: "Estimates",
          href: "/estimates",
        },
        { label: "Invoices", href: "/invoices" },
        {
          label: "Payments Setup",
          href: "/payments-setup",
        },
        {
          label: "Recurring Invoices",
          href: "/recurring-invoices",
        },
        {
          label: "Checkouts",
          href: "/checkouts",
        },
        {
          label: "Customer Statements",
          href: "/customer-statements",
        },
        {
          label: "Customers",
          href: "/customers",
        },
      ],
    },
    {
      type: "section",
      label: "Purchase",
      icon: ShoppingCart,
      items: [
        {
          label: "Bills",
          href: "/bills",
        },
        {
          label: "Vendors",
          href: "/vendors",
        },
      ],
    },
    {
      type: "single",
      label: "Receipt AI",
      icon: Receipt,
      href: "/receipt-ai",
    },
    {
      type: "single",
      label: "Biz Expense",
      icon: Building,
      href: "/biz-expense",
    },
  ];
