import {
  ArrowUpRight,
  DollarSign,
} from "lucide-react";

interface StatBoxProps {
  statTitle: string;
  amount: number;
  percent: number;
}

export default function StatBox({
  statTitle,
  amount,
  percent,
}: StatBoxProps) {
  return (
    <div className="border w-69 px-6 py-4 my-4 mx-2 rounded-lg">
      {/* total sales */}
      <div className="flex justify-between items-end ">
        <p className="text-gray-500">
          {statTitle}
        </p>

        <DollarSign className="size-4  text-blue-500" />
      </div>
      <div className="py-4">
        <span className="font-bold text-2xl">
          ${amount}
        </span>
        <div className="s">
          <ArrowUpRight
            size={16}
            className="text-green-400"
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
