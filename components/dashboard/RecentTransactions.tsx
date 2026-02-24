import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function RecentTransactions() {
  return (
    <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 p-4">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Transaction&apos;s
          </h2>
          <p className="text-sm  mt-1">
            Revenue performance - current week
          </p>
        </div>
        <Link
          href="/invoices"
          className="text-blue-500 flex hover:text-blue-600"
        >
          View all
          <ChevronRight
            size={22}
            strokeWidth={1.75}
          />
        </Link>
      </div>
    </div>
  );
}
