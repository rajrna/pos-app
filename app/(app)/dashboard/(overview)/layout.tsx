"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrencySelect from "@/components/dashboard/CurrencySelect";

const tabs = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Growth Tracker",
    href: "/dashboard/growth-tracker",
    icon: TrendingUp,
  },
  {
    label: "Heatmap",
    href: "/dashboard/heatmap",
    icon: Flame,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="p-3">
      <div className="flex justify-between items-center w-full py-2">
        <div className="py-4">
          <h1 className="font-bold text-xl md:text-2xl truncate">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm md:text-base hidden sm:block">
            Welcome back, Ek. Here&apos;s
            what&apos;s happening with Rebuzz POS
          </p>
        </div>
        <div className="mx-1 md:mx-3">
          <Button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-2xl"
            asChild
          >
            <Link href="/invoices/add">
              Create order
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-1 md:px-2 flex items-center justify-between border-b-2 py-2">
        <div className="gap-1 md:gap-2 flex">
          {tabs.map(
            ({ label, href, icon: Icon }) => (
              <Button
                key={href}
                asChild
                variant={
                  pathname === href
                    ? "default"
                    : "outline"
                }
                className={
                  pathname === href
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : ""
                }
              >
                <Link href={href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </Link>
              </Button>
            ),
          )}

          <div className="hidden md:block">
            <CurrencySelect />
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
