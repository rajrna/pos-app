"use client";

import { DataTable } from "@/components/ui/data-table";
import { getInvoiceColumns } from "./invoice-columns";
import { useInvoiceStore } from "@/stores/invoiceStore";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { RawTicket } from "@/lib/types/ticket";
import { Invoice } from "@/lib/types/invoice";

export default function InvoiceTable({
  invoices,
}: {
  invoices: Invoice[];
}) {
  // const getFilteredInvoices = useInvoiceStore(
  //   (state) => state.getFilteredInvoices,
  // );
  // const invoices = get();
  const { currency } = useCurrency();
  const columns = getInvoiceColumns(currency);

  return (
    <DataTable
      columns={columns}
      data={invoices}
      searchColumn="invoice_id"
      searchPlaceholder="Search invoice #..."
      pageSize={25}
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
