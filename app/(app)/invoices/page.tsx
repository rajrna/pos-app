"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useInvoiceStore } from "@/stores/invoiceStore";

import { fetchInvoicesClient } from "@/services/apiInvoice.client";

import { Spinner } from "@/components/ui/spinner";
import InvoiceStats from "@/components/invoice/InvoiceStats";
import InvoiceTable from "@/components/invoice/InvoiceTable";
import InvoiceHeader from "@/components/invoice/InvoiceHeader";

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
