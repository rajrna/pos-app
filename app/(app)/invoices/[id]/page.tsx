"use client";

import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { toPng } from "html-to-image";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  Bell,
  Check,
  ChevronDown,
  CreditCard,
  FileCog,
  FileEdit,
  FileText,
  Link,
  Mail,
  Send,
  Trash2,
} from "lucide-react";

import { useCurrency } from "@/lib/context/CurrencyContext";
import { useBusiness } from "@/hooks/useBusiness";
import { getTicketByInvoice } from "@/services/apiTicket.client";

import { Button } from "@/components/ui/button";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "overdue";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { currency } = useCurrency();
  const { data: business } = useBusiness();

  const [
    isProformaInvoice,
    setIsProformaInvoice,
  ] = useState(true);
  const invoiceRef = useRef(null);
  const [isGenerating, setIsGenerating] =
    useState(false);
  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    try {
      setIsGenerating(true);

      const dataUrl = await toPng(
        invoiceRef.current,
        {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        },
      );

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps =
        pdf.getImageProperties(dataUrl);
      const pdfWidth =
        pdf.internal.pageSize.getWidth();
      const pdfHeight =
        (imgProps.height * pdfWidth) /
        imgProps.width;

      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight,
      );
      pdf.save(`Invoice-${invoice.invoice}.pdf`);
    } catch (err) {
      console.error("PDF Generation Error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const { data, isLoading, error } = useQuery({
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
  const [
    isPaymentModalOpen,
    setIsPaymentModalOpen,
  ] = useState(false);

  const [
    isSendInvoiceModalOpen,
    setIsSendInvoiceModalOpen,
  ] = useState(false);

  const [paymentData, setPaymentData] = useState({
    amount: invoice?.grandTotal || 0,
    discount: 0,
    method: "cash",
  });

  const openPaymentModal = () => {
    setPaymentData((prev) => ({
      ...prev,
      amount: invoice?.grandTotal || 0,
    }));
    setIsPaymentModalOpen(true);
  };
  const openSendInvoiceModal = () => {
    setIsSendInvoiceModalOpen(true);
  };

  const calculatedGrandTotal = Math.max(
    0,
    paymentData.amount - paymentData.discount,
  );

  const handleRecordPayment = async () => {
    const formattedDate = new Date()
      .toISOString()
      .replace("T", " ")
      .split(".")[0];

    const payload = {
      payment: String(calculatedGrandTotal),
      method: paymentData.method,
      discount: Number(paymentData.discount),
      paidAt: formattedDate,
      tax: "",
      taxId: null,
      taxamt: 0,
      grandTotal: Number(calculatedGrandTotal),
      redeemPointDeducted: 0,
    };

    const ticketId = invoice.invoice;

    if (!ticketId || isNaN(Number(ticketId))) {
      toast.error("Invalid Invoice Number");
      return;
    }

    try {
      const response = await fetch(
        `/api/tickets/${ticketId}/payment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (result.status === "success") {
        toast.success("Payment Recorded!");
        setIsPaymentModalOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const errorMsg =
          result.data?.invoice_number ||
          "Payment failed";
        toast.error(errorMsg);
        console.error(
          "Payment API Failure:",
          result,
        );
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(
        "Network error. Please try again.",
      );
    }
  };

  const copyPublicLink = () => {
    // Example logic for your "Copy Link" button
    // const shareUrl = `${window.location.origin}/public/preview/${invoice.id}${isProformaInvoice ? "?proforma=true" : ""}`;
    const publicUrl = `${window.location.origin}/preview/${invoice.invoice}${isProformaInvoice ? "?proforma=true" : ""}`;

    navigator.clipboard.writeText(publicUrl);
    toast.success(
      "Public link copied to clipboard!",
    );
  };
  // ------------------------------------------------------------------

  const [moreActionsOpen, setMoreActionsOpen] =
    useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">
          Loading invoice...
        </p>
      </div>
    );
  }

  if (!isLoading && !invoice) {
    console.log(
      "API Response received but no Tickets found:",
      data,
    );
  }
  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">
          Invoice not found.
        </p>
      </div>
    );
  }

  const displayStatus: InvoiceStatus =
    invoice.paidStatus === "paid"
      ? "paid"
      : "sent";
  const isToday =
    new Date(invoice.dueDate).toDateString() ===
    new Date().toDateString();
  const dueDateLabel = isToday
    ? "Today"
    : new Date(
        invoice.dueDate,
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  const statusColors: Record<
    InvoiceStatus,
    string
  > = {
    draft: "bg-gray-100 text-gray-600",
    sent: "bg-blue-100 text-blue-700",
    paid: "bg-green-100 text-green-700",
    overdue: "bg-red-100 text-red-700",
  };

  const handleProformaTag = () => {
    setIsProformaInvoice((prev) => !prev);
  };

  const handleResendInvoice = async () => {
    const ticketId = invoice.invoice;

    if (!ticketId) {
      toast.error("Invoice ID is missing");
      return;
    }

    const sendPromise = fetch(
      `/api/tickets/${ticketId}/send`,
      {
        method: "POST",
      },
    ).then(async (res) => {
      const data = await res.json();
      if (!res.ok || data.status === "fail") {
        throw new Error(
          data.message || "Failed to send",
        );
      }
      return data;
    });

    toast.promise(sendPromise, {
      loading: "Sending invoice reminder...",
      success: () => {
        return "Reminder sent successfully!";
      },
      error: (err) => `${err.message}`,
    });
  };

  const handleChargeCard = () => {
    toast("Opening payment form...");
  };

  const handleEditInvoice = () => {
    router.push(`/invoices/${id}/edit`);
  };

  const handleDeleteInvoice = async () => {
    const ticketId = invoice.invoice;

    if (!ticketId) {
      toast.error("Invoice ID is missing");
      return;
    }

    const sendPromise = fetch(
      `/api/tickets/${ticketId}/delete`,
      {
        method: "DELETE",
      },
    ).then(async (res) => {
      const data = await res.json();
      if (!res.ok || data.status === "fail") {
        throw new Error(
          data.message || "Failed to send",
        );
      }
      return data;
    });

    toast.promise(sendPromise, {
      loading: "Deleting invoice ...",
      success: () => {
        return "Invoice deleted successfully!";
      },
      error: (err) => `${err.message}`,
    });
    router.push(`/invoices/`);
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Invoice #{invoice?.invoice}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* More actions */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 border border-blue-600 rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-100 text-blue-600  transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100">
              More actions{" "}
              <ChevronDown size={14} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl p-1 shadow-lg border-gray-200"
            >
              <DropdownMenuItem
                onClick={handleEditInvoice}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-600"
              >
                <FileEdit size={14} />
                <span>Edit invoice</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-600"
              >
                <FileText size={14} />
                <span>Download PDF</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-gray-100" />

              <DropdownMenuItem
                // onClick={() =>
                //   toast.error("Invoice deleted")
                // }
                onClick={handleDeleteInvoice}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg text-red-500 focus:bg-red-50 focus:text-red-600"
              >
                <Trash2 size={14} />
                <span>Delete invoice</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 bg-gray-100" />
              <DropdownMenuItem
                onClick={handleProformaTag}
              >
                <FileCog size={14} />
                <span>
                  {isProformaInvoice
                    ? "Set as Regular Invoice"
                    : "Set as Proforma Invoice"}
                  {/* Set as Proforma Invoice */}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() =>
              router.push("/invoices/add")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
          >
            Create another invoice
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="py-12 flex justify-center">
        <div className="w-full max-w-2xl">
          {/* Invoice meta row */}
          <div className="flex justify-between items-start mb-8">
            {/* Left Group */}
            <div className="flex gap-8">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">
                  Status
                </p>
                {invoice.paidStatus ===
                "unpaid" ? (
                  <span className="rounded-md font-semibold capitalize text-xl px-1 py-1 bg-red-400 text-red-700">
                    {invoice.paidStatus}
                  </span>
                ) : (
                  <span className="rounded-md font-semibold capitalize text-xl px-1 py-1 bg-green-400 text-green-700">
                    {invoice.paidStatus}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500  font-bold uppercase tracking-wide mb-1">
                  Customer
                </p>
                {isCustomerLoading ? (
                  <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
                ) : (
                  <>
                    <span className="text-blue-600 rounded-md font-semibold capitalize text-2xl ">
                      {customerProfile?.name ||
                        invoice?.customerEmail ||
                        "Guest"}
                    </span>
                    {customerProfile?.loyaltyPoint >
                      0 && (
                      <p className="text-[10px] text-orange-500 font-medium flex items-center gap-1">
                        ★{" "}
                        {
                          customerProfile.loyaltyPoint
                        }{" "}
                        Points
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right Group */}
            <div className="flex gap-8 text-right">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">
                  Amount due
                </p>
                <p className="text-2xl font-semibold text-gray-800">
                  {/* {invoice?.grandTotal?.toLocaleString()} */}
                  {invoice.paidStatus ===
                  "paid" ? (
                    <span className="text-green-600 font-bold">
                      {currency.symbol}0.00
                    </span>
                  ) : (
                    ` ${currency.symbol}${invoice.grandTotal.toFixed(2)}`
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">
                  Due
                </p>
                <p className="text-2xl font-semibold text-gray-800">
                  {dueDateLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div className="flex flex-col gap-3 mb-4">
            {/* Step 1: Created */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4 shadow-md hover:shadow-lg transition duration-300">
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-600 shrink-0">
                <FileText size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Created
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  <span className="font-medium text-gray-700">
                    Created:
                  </span>{" "}
                  {new Date(
                    invoice.createdAt,
                  ).toLocaleString()}
                </p>
              </div>
              <Button
                onClick={handleEditInvoice}
                className="text-sm border border-blue-600 rounded-full px-4 py-1.5 text-blue-600 bg-white hover:bg-blue-100 transition-colors"
              >
                Edit invoice
              </Button>
            </div>

            {/* Connector */}
            <div className="w-px h-2 rounded-2xl bg-gray-200 ml-9" />

            {/* Step 2: Send & Reminders */}
            <div
              className={`bg-white border rounded-2xl p-5 flex flex-col gap-3 shadow-md transition duration-300 ${
                invoice.sentAt
                  ? "border-blue-100 bg-blue-50/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 border-blue-500 text-blue-600 "
                  //    ${
                  //   invoice.sentAt
                  //     ? "border-blue-500 text-blue-600 bg-blue-50"
                  //     : "border-gray-300 text-gray-400"
                  // }
                  // }
                >
                  {invoice.sentAt ? (
                    <Send size={18} />
                  ) : (
                    <Mail size={18} />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Send Invoice
                  </h3>
                  {invoice.sentAt ? (
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-600 mt-0.5">
                        <span className="font-medium text-gray-900">
                          Sent to:
                        </span>{" "}
                        {invoice.customerEmail ||
                          "Customer"}
                      </p>
                      <p className="text-xs text-blue-600 font-medium mt-1">
                        Last sent:{" "}
                        {new Date(
                          invoice.sentAt,
                        ).toLocaleString([], {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-0.5">
                      Not sent to the customer
                      yet.
                    </p>
                  )}
                </div>

                <Button
                  // onClick={handleResendInvoice}
                  onClick={openSendInvoiceModal}
                  variant={
                    invoice.sentAt
                      ? "outline"
                      : "default"
                  }
                  className={`rounded-full px-6 ${
                    !invoice.sentAt
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-blue-200 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {invoice.sentAt
                    ? "Send again"
                    : "Send now"}
                </Button>
              </div>

              {/* Reminder Alert Box */}
              <div className="flex items-center justify-between bg-white border border-blue-100 rounded-xl px-4 py-3 ml-14 shadow-sm">
                <div className="flex items-start gap-3">
                  <Bell
                    size={16}
                    className="text-blue-600 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-700 font-medium">
                      Automatic Reminders
                    </p>
                    <p className="text-xs text-gray-500">
                      Remind customer 3 days
                      before due date.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    toast("Opening scheduler...")
                  }
                  className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Schedule
                </button>
              </div>
            </div>

            {/* Connector */}
            <div className="w-px h-2 rounded-2xl bg-gray-200 ml-9" />

            {/* Step 3: Manage payments */}
            <div
              className={`bg-white border rounded-2xl p-5 flex flex-col gap-4 shadow-md transition duration-300 ${
                invoice.paidStatus === "paid"
                  ? "border-green-100 bg-green-50/30"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    invoice.paidStatus === "paid"
                      ? "border-green-500 text-green-600 bg-green-50"
                      : "border-blue-500 text-blue-600"
                  }`}
                >
                  {invoice.paidStatus ===
                  "paid" ? (
                    <Check size={18} />
                  ) : (
                    <CreditCard size={18} />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {invoice.paidStatus === "paid"
                      ? "Payment completed"
                      : "Manage payments"}
                  </h3>
                  {invoice.paidStatus ===
                    "paid" && (
                    <p className="text-sm text-green-600 font-medium">
                      Paid via{" "}
                      {invoice.paymentMethod ||
                        "cash"}{" "}
                      on{" "}
                      {new Date(
                        invoice.updatedAt,
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Only show buttons if the invoice is NOT paid */}
                {invoice.paidStatus !==
                  "paid" && (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleChargeCard}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                    >
                      Charge a credit card
                    </Button>
                    <Button
                      onClick={openPaymentModal}
                      className="text-sm border border-blue-600 rounded-full px-4 py-2 text-blue-600 bg-white hover:bg-blue-100 transition-colors font-medium"
                    >
                      Record a payment
                    </Button>
                  </div>
                )}
              </div>

              <div className="ml-14 flex items-center justify-between text-sm">
                <p className="text-gray-600">
                  <span className="font-medium">
                    Amount due:
                  </span>{" "}
                  {invoice.paidStatus ===
                  "paid" ? (
                    <span className="text-green-600 font-bold">
                      $0.00
                    </span>
                  ) : (
                    `$${invoice.grandTotal.toFixed(2)}`
                  )}
                  {invoice.paidStatus !==
                    "paid" && (
                    <>
                      {" — "}
                      <button
                        onClick={openPaymentModal}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Record a payment
                      </button>{" "}
                      manually.
                    </>
                  )}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium">
                    Status:
                  </span>{" "}
                  {invoice.paidStatus ===
                  "paid" ? (
                    <span className="text-green-700">
                      This invoice has been fully
                      paid
                    </span>
                  ) : (
                    "Your invoice is awaiting payment"
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Invoice Preview */}
          <InvoicePreview
            invoiceRef={invoiceRef}
            invoice={invoice}
            customerProfile={customerProfile}
            businessProfile={business}
            proformaTag={isProformaInvoice}
          />
        </div>
      </div>
      {isSendInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b-2 border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-600">
                Send Invoice
              </h2>
              <button
                onClick={() =>
                  setIsSendInvoiceModalOpen(false)
                }
                className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="grid grid-cols-2 justify-between p-2  gap-2">
                <button
                  className="cursor-pointer"
                  onClick={copyPublicLink}
                >
                  <div className="bg-white border border-gray-200  flex flex-col justify-between items-center rounded-2xl p-6  gap-4 shadow-md hover:shadow-lg transition duration-300">
                    <Link className="text-blue-500 " />
                    <p className="font-semibold text-gray-800 text-xl">
                      Copy Link
                    </p>
                    <p className=" text-gray-800">
                      A link to your invoice
                    </p>
                  </div>
                </button>

                <button
                  className="cursor-pointer"
                  onClick={handleDownloadPDF}
                >
                  <div className="bg-white border border-gray-200 flex flex-col items-center rounded-2xl p-6  gap-4 shadow-md hover:shadow-lg transition duration-300">
                    <FileText className="text-blue-500 " />
                    <p className="font-semibold text-gray-800 text-xl">
                      Download PDF
                    </p>
                    <p className=" text-gray-800">
                      Your invoice in a document
                    </p>
                  </div>
                </button>
              </div>

              <button
                className="cursor-pointer"
                onClick={handleResendInvoice}
              >
                <div className="bg-yellow-300 border border-gray-200 flex flex-col items-center rounded-2xl p-5  gap-4 shadow-md hover:shadow-lg transition duration-300">
                  <Mail className="text-blue-500 " />
                  <h1 className="font-semibold text-gray-800 text-xl">
                    Send Invoice By Mail
                  </h1>
                  <p className=" text-gray-800">
                    For premium users, mail the
                    invoice directly to your
                    customers
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-600">
                Record Payment
              </h2>
              <button
                onClick={() =>
                  setIsPaymentModalOpen(false)
                }
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Payment Method Selector */}
              <div>
                <label className="text-[14px] font-semibold text-gray-400 uppercase tracking-widest">
                  Payment Method
                </label>
                <div className="mt-2">
                  <Select
                    value={paymentData.method}
                    onValueChange={(value) =>
                      setPaymentData({
                        ...paymentData,
                        method: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 bg-gray-50 focus:ring-blue-500 font-medium capitalize">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-200 shadow-xl">
                      <SelectItem
                        value="cash"
                        className="py-3 focus:bg-blue-50 focus:text-blue-600 cursor-pointer font-medium"
                      >
                        Cash
                      </SelectItem>
                      <SelectItem
                        value="card"
                        className="py-3 focus:bg-blue-50 focus:text-blue-600 cursor-pointer font-medium"
                      >
                        Credit Card
                      </SelectItem>
                      <SelectItem
                        value="qr"
                        className="py-3 focus:bg-blue-50 focus:text-blue-600 cursor-pointer font-medium"
                      >
                        QR / Digital Wallet
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase">
                    Total
                  </label>
                  <input
                    type="number"
                    value={paymentData.amount}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        amount: Number(
                          e.target.value,
                        ),
                      })
                    }
                    disabled
                    className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase">
                    Discount
                  </label>
                  <input
                    type="number"
                    value={paymentData.discount}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        discount: Number(
                          e.target.value,
                        ),
                      })
                    }
                    className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Summary Area */}
              <div className="bg-white rounded-2xl p-5 text-gray-600 flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-xs uppercase font-medium">
                    Final Amount
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {currency.symbol}
                    {calculatedGrandTotal.toLocaleString()}
                  </p>
                </div>
                {/* <div className="text-right">
                  <span className="bg-white/20 px-3 font-semibold py-1 rounded-full text-xs">
                    Method: {paymentData.method}
                  </span>
                </div> */}
              </div>
            </div>

            {/* Footer Button */}
            <div className="p-6 bg-gray-50">
              <button
                onClick={handleRecordPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200"
              >
                Confirm & Pay {currency.symbol}
                {calculatedGrandTotal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
