"use client";
import { ICON_MAP } from "@/lib/config/dashboard";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { getPercentColor } from "@/lib/utils";

interface StatBoxProps {
  label: string;
  value: number;
  percent: number;
  iconName: string;
  iconColor?: string;
  format?: "currency" | "number" | "percent";
}

export default function OverviewStatBox({
  label,
  value,
  percent,
  iconName,
  iconColor,
  format = "number",
}: StatBoxProps) {
  const { text, ArrowIcon } =
    getPercentColor(percent);
  const { currency } = useCurrency();

  const formatValue = (value: number) => {
    if (format === "currency") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.code,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return value.toLocaleString();
  };
  const Icon = ICON_MAP[iconName];
  return (
    <div className="border w-full px-3 md:px-6 py-4 md:py-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-end">
        <p className="text-gray-500 text-sm md:text-base leading-tight">
          {label}
        </p>
        <Icon
          size={16}
          className={`${iconColor} mb-1 rounded-lg shrink-0`}
        />
      </div>
      <div className="py-4">
        <span className="font-bold text-lg md:text-2xl">
          {formatValue(value)}
        </span>
        <div className="flex justify-start gap-0.5">
          <ArrowIcon
            size={16}
            className={`${text} mt-1`}
          />
          <span
            className={`text-[12px] md:text-base ${text}`}
          >
            {percent}%
          </span>
          <span className="text-gray-500 text-[12px] md:text-base">
            {" from last month"}
          </span>
        </div>
      </div>
    </div>
  );
}
