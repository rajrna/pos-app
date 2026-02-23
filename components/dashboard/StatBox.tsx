import {
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";

interface StatBoxProps {
  statTitle: string;
  amount: number;
  percent: number;
  icon: LucideIcon;
}

export default function StatBox({
  statTitle,
  amount,
  percent,
  icon: Icon,
}: StatBoxProps) {
  return (
    <div className="border w-72 px-6 py-6  rounded-lg shadow-md hover:shadow-lg transition duration-300">
      {/* total sales */}
      <div className="flex justify-between items-end ">
        <p className="text-gray-500">
          {statTitle}
        </p>

        <Icon
          size={16}
          className="text-green-400 mb-1"
        />
      </div>
      <div className="py-4">
        <span className="font-bold text-2xl">
          ${amount}
        </span>
        <div className="flex justify-start gap-0.5">
          <ArrowUpRight
            size={16}
            className="text-green-400 mt-1"
          />

          <span className="text-green-400">
            {percent}%
          </span>
          <span className="text-gray-500">
            {" from last month"}
          </span>
        </div>
      </div>
    </div>
  );
}
