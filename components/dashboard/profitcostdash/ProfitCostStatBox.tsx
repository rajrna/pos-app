import { LucideIcon } from "lucide-react";

interface StatBoxProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export default function ProfitCostStatBox({
  label,
  value,
  icon: Icon,
  iconColor,
  bgColor,
}: StatBoxProps) {
  return (
    <div className="border w-72 px-6 py-6  rounded-lg shadow-md hover:shadow-lg transition duration-300">
      {/* TOTAL SALES */}
      <div className="flex justify-between items-end ">
        <p className="text-gray-500">{label}</p>

        <Icon
          size={16}
          className={`${iconColor} mb-1 ${bgColor} rounded-lg`}
        />
      </div>
      <div className="py-4 mt-2">
        <span className="font-bold text-2xl">
          {value}
        </span>
      </div>
    </div>
  );
}
