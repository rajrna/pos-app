"use client";

import { useRouter } from "next/navigation";

import { Invoice } from "@/lib/types/invoice";
import { useCurrency } from "@/lib/context/CurrencyContext";

import { getInvoiceColumns } from "./invoice-columns";
import { DataTable } from "@/components/ui/data-table";

export default function InvoiceTable({
  invoices,
}: {
  invoices: Invoice[];
}) {
  const { currency } = useCurrency();
  const columns = getInvoiceColumns(currency);
  const router = useRouter();

  return (
    <DataTable
      columns={columns}
      data={invoices}
      searchColumn="invoice"
      searchPlaceholder="Search invoice #..."
      pageSize={10}
      onRowClick={(row: Invoice) => {
        console.log(row.invoice);
        router.push(`/invoices/${row.invoice}`);
      }}
      filters={[
        {
          columnId: "status",
          label: "Status",
          options: [
            "all",
            "Draft",
            "unpaid",
            "Paid",
            "Overdue",
          ],
        },
      ]}
      showColumnToggle
    />
  );
}
