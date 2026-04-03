"use client";

import { useParams } from "next/navigation";

import { useBusiness } from "@/hooks/useBusiness";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTicketByInvoice } from "@/services/apiTicket.client";

export default function PublicPreviewPage() {
  const { id } = useParams();

  const {
    data,
    isLoading: invLoading,
    error,
  } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () =>
      getTicketByInvoice(id as string),
    enabled: !!id,
  });
  const invoice = data?.data?.Tickets;

  const {
    data: customerData,
    isLoading: isCustomerLoading,
  } = useQuery({
    queryKey: [
      "customer-lookup",
      invoice?.phoneNumber,
      invoice?.customerEmail,
    ],
    queryFn: async () => {
      const identifier =
        invoice?.phoneNumber ||
        invoice?.customerEmail;
      if (!identifier) return null;

      const query = invoice.phoneNumber
        ? `phone=${invoice.phoneNumber}`
        : `email=${invoice.customerEmail}`;
      const response = await fetch(
        `/api/customers/lookup?${query}`,
      );
      const result = await response.json();
      console.log(result);
      return result?.data?.users?.[0] || null;
    },
    enabled: !!invoice,
  });

  const customerProfile = customerData;

  const {
    data: business,
    isLoading: bizLoading,
  } = useBusiness();

  if (invLoading || bizLoading)
    return (
      <div className="p-20 text-center">
        <Loader2 className="animate-spin inline" />
      </div>
    );
  if (!invoice)
    return (
      <div className="p-20 text-center">
        Invoice not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Pass a 'isPublic' flag to hide internal admin buttons */}
        <InvoicePreview
          invoice={invoice}
          businessProfile={business}
          customerProfile={customerProfile}
          //   isPublic={true}
        />
      </div>
    </div>
  );
}
