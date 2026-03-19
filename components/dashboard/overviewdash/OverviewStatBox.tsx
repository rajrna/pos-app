import { getPercentColor } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatBoxProps {
  label: string;
  value: string;
  percent: number;
  icon: LucideIcon;
  iconColor?: string;
}

export default function OverviewStatBox({
  label,
  value,
  percent,
  icon: Icon,
  iconColor,
}: StatBoxProps) {
  // const isPositive = percent >= 0;
  // const color = isPositive
  //   ? "text-green-400"
  //   : "text-red-400";
  // const ArrowIcon = isPositive
  //   ? ArrowUpRight
  //   : ArrowDownRight;
  const { text, ArrowIcon } =
    getPercentColor(percent);
  return (
    <div className="border w-full px-3 md:px-6 py-4 md:py-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-end ">
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
          {value}
        </span>
        <div className="flex justify-start gap-0.5">
          {/* <ArrowUpRight
            size={16}
            className="text-green-400 mt-1"
          /> */}
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
