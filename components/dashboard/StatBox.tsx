import { getPercentColor } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatBoxProps {
  label: string;
  value: string;
  percent: number;
  icon: LucideIcon;
  iconColor?: string;
}

export default function StatBox({
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
    <div className="border w-72 px-6 py-6  rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-end ">
        <p className="text-gray-500">{label}</p>

        <Icon
          size={16}
          className={`${iconColor} mb-1`}
        />
      </div>
      <div className="py-4">
        <span className="font-bold text-2xl">
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

          <span className={text}>{percent}%</span>
          <span className="text-gray-500">
            {" from last month"}
          </span>
        </div>
      </div>
    </div>
  );
}
