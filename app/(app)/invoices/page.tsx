import React from "react";

import InvoiceHeader from "@/components/invoice/InvoiceHeader";
import InvoiceStats from "@/components/invoice/InvoiceStats";
import InvoiceFilters from "@/components/invoice/InvoiceFilters";
import InvoiceTable from "@/components/invoice/InvoiceTable";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <InvoiceHeader />
      <InvoiceStats />
      <InvoiceFilters />
      <InvoiceTable />
    </div>
  );
}
