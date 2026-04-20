"use client";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { DataTable } from "../ui/data-table";
import { getBillColumns } from "./bill-columns";
import { BillView } from "@/lib/types/expenses";

export default function BillTable({
  bills,
}: {
  bills: BillView[];
}) {
  const { currency } = useCurrency();
  const columns = getBillColumns(currency);
  return (
    <div>
      <DataTable
        columns={columns}
        data={bills}
        searchColumn="vendor_name"
        searchPlaceholder="Seach Vendor..."
        showDateFilter={true}
        pageSize={10}
      />
    </div>
  );
}
