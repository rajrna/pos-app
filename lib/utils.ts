import { clsx, type ClassValue } from "clsx";
import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { CurrencyConfig } from "./context/CurrencyContext";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: CurrencyConfig,
): string {
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
  }).format(amount);
}

export function getPercentColor(percent: number) {
  return percent >= 0
    ? {
        text: "text-green-400",
        badge: "bg-green-100 text-green-800",
        ArrowIcon: ArrowUpRight,
      }
    : {
        text: "text-red-400",
        badge: "bg-red-100 text-red-800",
        ArrowIcon: ArrowDownRight,
      };
}

export function getDaysColor(days: number) {
  return days >= 5
    ? {
        text: "text-red-500",
      }
    : {
        text: "text-orange-500",
      };
}

export function getDaysColorCustomers(
  days: number,
) {
  return days >= 10
    ? {
        text: "text-red-500",
      }
    : {
        text: "text-orange-500",
      };
}

const MARGIN_THRESHOLDS = [
  { min: 70, color: "text-green-700" },
  { min: 55, color: "text-orange-500" },
  { min: 20, color: "text-red-500" },
  { min: 0, color: "text-red-700" },
];

export function getMarginColors(percent: number) {
  const match = MARGIN_THRESHOLDS.find(
    ({ min }) => percent >= min,
  );
  return {
    text: match?.color ?? "text-green-500",
  };
}
