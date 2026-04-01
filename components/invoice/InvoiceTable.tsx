"use client";

import { DataTable } from "@/components/ui/data-table";
import { getInvoiceColumns } from "./invoice-columns";

import { useCurrency } from "@/lib/context/CurrencyContext";

import { Invoice } from "@/lib/types/invoice";
import { useRouter } from "next/navigation";

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
            "Unpaid",
            "Paid",
            "Overdue",
          ],
        },
      ]}
      showColumnToggle
    />
  );
}
