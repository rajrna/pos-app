"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import InvoiceHeader from "@/components/invoice/InvoiceHeader";
import InvoiceStats from "@/components/invoice/InvoiceStats";
import InvoiceTable from "@/components/invoice/InvoiceTable";
import { fetchInvoices } from "@/services/apiInvoice.server";
import { useInvoiceStore } from "@/stores/invoiceStore";
import { Spinner } from "@/components/ui/spinner";
import { fetchInvoicesClient } from "@/services/apiInvoice.client";

export default function Page() {
  const { setInvoices } = useInvoiceStore();

  const {
    isLoading,
    data: invoices = [],
    error,
  } = useQuery({
    queryKey: ["invoice"],
    queryFn: fetchInvoicesClient,
  });
  // console.log(invoices);

  useEffect(() => {
    if (invoices.length > 0) {
      setInvoices(invoices);
    }
  }, [invoices, setInvoices]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <Spinner className="size-8" />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center w-screen h-screen text-2xl">
        {":( Error loading invoices"}
      </div>
    );

  return (
    <div className="min-h-screen p-8">
      <InvoiceHeader />
      <InvoiceStats invoices={invoices} />
      <InvoiceTable invoices={invoices} />
    </div>
  );
}
