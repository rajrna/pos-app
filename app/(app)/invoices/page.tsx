"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import InvoiceHeader from "@/components/invoice/InvoiceHeader";
import InvoiceStats from "@/components/invoice/InvoiceStats";
import InvoiceFilters from "@/components/invoice/InvoiceFilters";
import InvoiceTable from "@/components/invoice/InvoiceTable";
import { fetchInvoices } from "@/services/apiInvoice";

export default function Page() {
  const {
    isLoading,
    data: invoices = [],
    error,
  } = useQuery({
    queryKey: ["invoice"],
    queryFn: fetchInvoices,
  });
  console.log(invoices);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <InvoiceHeader />
      <InvoiceStats invoices={invoices} />
      <InvoiceFilters />
      <InvoiceTable invoices={invoices} />
    </div>
  );
}
