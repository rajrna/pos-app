import { DataTable } from "@/components/ui/data-table";
import {
  columns,
  RefundReason,
} from "./refund-analysis-column";

export default function RefundAnalysis({
  refundReasons,
}: {
  refundReasons: RefundReason[];
}) {
  return (
    <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 py-8 px-4">
      <h1 className="font-semibold text-xl">
        Refund Analysis
      </h1>
      <p className="text-gray-500">
        Primary reasons for customer refunds this
        period .
      </p>

      <DataTable
        columns={columns}
        data={refundReasons}
        pageSize={5}
      />
    </div>
  );
}
