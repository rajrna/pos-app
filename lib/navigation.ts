import {
  CreditCard,
  ShoppingCart,
  Receipt,
  Gauge,
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
      type: "section",
      label: "Dashboard",
      icon: Gauge,
      items: [
        { label: "Overview", href: "/dashboard" },
        {
          label: "Customers",
          href: "/dashboard/customers",
        },
        {
          label: "Staffs",
          href: "/dashboard/staff",
        },
      ],
    },
    {
      type: "section",
      label: "Sales & Payments",
      icon: CreditCard,
      items: [
        // {
        //   label: "Estimates",
        //   href: "/estimates",
        // },
        { label: "Invoices", href: "/invoices" },
        // {
        //   label: "Recurring Invoices",
        //   href: "/recurring-invoices",
        // },
        // {
        //   label: "Checkouts",
        //   href: "/checkouts",
        // },
        // {
        //   label: "Customer Statements",
        //   href: "/customer-statements",
        // },
        {
          label: "Customers",
          href: "/customers",
        },
        {
          label: "Products",
          href: "/products",
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
