import {
  Clock,
  Star,
  Trophy,
} from "lucide-react";

export default function WinningStatBox() {
  return (
    <div className="flex items-center flex-wrap justify-center mt-2  gap-4">
      {/* TOP SELLING PRODUCTS */}
      <div className="w-96 border px-6 py-4 bg-blue-700 rounded-lg">
        <span className="text-[14px] text-gray-300">
          TOP SELLING PRODUCT
        </span>
        <div className="flex items-center justify-between mt-8">
          <div>
            <span className="font-bold text-xl text-gray-100">
              Classic Latte
            </span>
            <p className="text-[14px] text-gray-300">
              Statistics
            </p>
          </div>
          <Trophy className="text-amber-300" />
        </div>
      </div>
      {/* PEAK HOURS */}
      <div className="w-94 border px-6 py-4 bg-purple-500 rounded-lg">
        <span className="text-[14px] text-gray-300">
          PEAK HOUR
        </span>
        <div className="flex items-center justify-between mt-8">
          <div>
            <span className="font-bold text-xl text-gray-100">
              10:00 AM - 11:00 AM
            </span>
            <p className="text-[14px] text-gray-300">
              Busiest window of the day
            </p>
          </div>
          <Clock className="text-gray-100" />
        </div>
      </div>
      {/* BEST DAY */}
      <div className="w-94 border px-6 py-4 bg-green-700 rounded-lg">
        <span className="text-[14px] text-gray-300">
          BEST DAY OF THE WEEK
        </span>
        <div className="flex items-center justify-between mt-8">
          <div>
            <span className="font-bold text-xl text-gray-100">
              SATURDAY
            </span>
            <p className="text-[14px] text-gray-300">
              Average 40% above daily mean
            </p>
          </div>
          <Star className="text-amber-300" />
        </div>
      </div>
    </div>
  );
}
