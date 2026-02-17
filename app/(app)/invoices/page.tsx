"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import InvoiceHeader from "@/components/invoice/InvoiceHeader";
import InvoiceStats from "@/components/invoice/InvoiceStats";
import InvoiceFilters from "@/components/invoice/InvoiceFilters";
import InvoiceTable from "@/components/invoice/InvoiceTable";
import { fetchInvoices } from "@/services/apiInvoice";
import { useInvoiceStore } from "@/stores/invoiceStore";

export default function Page() {
  const { setInvoices } = useInvoiceStore();

  const {
    isLoading,
    data: invoices = [],
    error,
  } = useQuery({
    queryKey: ["invoice"],
    queryFn: fetchInvoices,
  });
  console.log(invoices);

  useEffect(() => {
    if (invoices.length > 0) {
      setInvoices(invoices);
    }
  }, [invoices, setInvoices]);

  if (isLoading)
    return (
      <div className="flex items-center ">
        Loading...
      </div>
    );
  if (error)
    return <div>Error loading invoices</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <InvoiceHeader />
      <InvoiceStats invoices={invoices} />
      <InvoiceFilters />
      <InvoiceTable />
    </div>
  );
}
