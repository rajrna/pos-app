"use client";
import { DataTable } from "@/components/ui/data-table";
import {
  getRefundReasonColumns,
  RefundReason,
} from "./refund-analysis-column";
import { useCurrency } from "@/lib/context/CurrencyContext";

export default function RefundAnalysis({
  refundReasons,
}: {
  refundReasons: RefundReason[];
}) {
  const { currency } = useCurrency();
  const columns =
    getRefundReasonColumns(currency);
  return (
    <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 py-8 px-4">
      <h1 className="font-semibold text-xl">
        Refund Analysis
      </h1>
      <p className="text-gray-500">
        Primary reasons for customer refunds this
        period .
      </p>

      <div className="mt-9">
        <DataTable
          columns={columns}
          data={refundReasons}
          pageSize={5}
        />
      </div>
    </div>
  );
}
