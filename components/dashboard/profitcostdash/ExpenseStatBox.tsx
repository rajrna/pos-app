import { LucideIcon } from "lucide-react";

// Remove later
interface ExpenseStatBoxProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export default function ExpenseStatBox({
  label,
  value,
  icon: Icon,
  iconColor,
  bgColor,
}: ExpenseStatBoxProps) {
  return (
    <div className="border w-74 px-6 py-6  rounded-lg shadow-md hover:shadow-lg transition duration-300">
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
