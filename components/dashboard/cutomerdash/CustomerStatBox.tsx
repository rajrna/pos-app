import { LucideIcon } from "lucide-react";

interface StatBoxProps {
  statTitle: string;
  amount: number;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}
export default function CustomerStatBox({
  statTitle,
  amount,
  icon: Icon,
  iconColor,
  bgColor,
}: StatBoxProps) {
  return (
    <div className="border w-72 px-6 py-6  rounded-lg shadow-md hover:shadow-lg transition duration-300">
      {/* TOTAL SALES */}
      <div className="flex justify-between items-end ">
        <p className="text-gray-500">
          {statTitle}
        </p>

        <Icon
          size={16}
          className={`${iconColor} mb-1 bg-${bgColor}-100`}
        />
      </div>
      <div className="py-4 mt-2">
        <span className="font-bold text-2xl">
          {amount}
        </span>
      </div>
    </div>
  );
}
