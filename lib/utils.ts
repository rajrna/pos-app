import { clsx, type ClassValue } from "clsx";
import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
