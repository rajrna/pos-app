import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface GrowthTrackCardProps {
  label: string;
  value: string;
  prev: string;
  percent: number;
  inverseColor?: boolean;
}

function isGood(
  percent: number,
  inverseColor: boolean,
) {
  const positive = percent >= 0;
  return inverseColor ? !positive : positive;
}

export default function GrowthTrackCard({
  label,
  value,
  prev,
  percent,
  inverseColor = false,
}: GrowthTrackCardProps) {
  const good = isGood(percent, inverseColor);
  const cardBg = good
    ? "bg-emerald-50"
    : "bg-red-50";
  const iconBg = good
    ? "bg-green-100"
    : "bg-red-100";
  const iconColor = good
    ? "text-green-700"
    : "text-red-700";
  const badgeBg = good
    ? "bg-green-100"
    : "bg-red-100";
  const badgeColor = good
    ? "text-green-700"
    : "text-red-700";
  const TrendIcon = good
    ? TrendingUp
    : TrendingDown;
  const ArrowIcon = good
    ? ArrowUpRight
    : ArrowDownRight;

  return (
    <div
      className={`py-4 md:py-6  px-3 md:px-4 w-full border rounded-lg transition duration-300 shadow-md ${cardBg}`}
    >
      <div className="flex items-end justify-between">
        <p className="text-gray-700 text-[16px]">
          {label}
        </p>
        <TrendIcon
          className={`${iconColor} mb-1 text-[10px] md:text-[14px] shrink-0  ${iconBg} rounded-lg`}
          size={20}
        />
      </div>
      <div className="flex items-center justify-between py-2 md:py-4">
        <div>
          <p className="font-semibold text-xl">
            {value}
          </p>
          <p className="text-sm text-gray-500">
            prev: {prev}
          </p>
        </div>
        <div
          className={`flex items-center ${badgeBg} ${badgeColor} rounded-lg px-1 text-[12px]`}
        >
          <ArrowIcon size={14} />
          <p className="font-bold">
            {percent > 0 ? "+" : ""}
            {percent}%
          </p>
        </div>
      </div>
    </div>
  );
}
