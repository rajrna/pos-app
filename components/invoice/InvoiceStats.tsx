import { RefreshCw } from "lucide-react";

// import AlertCard from "./AlertCard";

export default function InvoiceStats() {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
      <div className="grid grid-cols-4 gap-8 mb-6">
        {/* Overdue */}
        <div>
          <p className="text-sm text-gray-600 mb-1">
            Overdue
          </p>
          <p className="text-3xl font-semibold text-gray-900">
            $88.00
            <span className="text-base font-normal text-gray-500 ml-1">
              USD
            </span>
          </p>
        </div>

        {/* Due within next 30 days */}
        <div>
          <p className="text-sm text-gray-600 mb-1">
            Due within next 30 days
          </p>
          <p className="text-3xl font-semibold text-gray-900">
            $0.00
            <span className="text-base font-normal text-gray-500 ml-1">
              USD
            </span>
          </p>
        </div>

        {/* Average time to get paid */}
        <div>
          <p className="text-sm text-gray-600 mb-1">
            Average time to get paid
          </p>
          <p className="text-3xl font-semibold text-gray-900">
            0
            <span className="text-base font-normal text-gray-500 ml-1">
              days
            </span>
          </p>
        </div>

        {/* Upcoming payout */}
        <div>
          <p className="text-sm text-gray-600 mb-1">
            Upcoming payout
          </p>
          <p className="text-3xl font-semibold text-gray-900 underline decoration-dotted underline-offset-4">
            None
          </p>
        </div>
      </div>

      {/* Last updated & Payment banner */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Last updated 3 minutes ago.</span>
          <button className="text-blue-600 hover:text-blue-700">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* <AlertCard /> */}
      </div>
    </div>
  );
}
