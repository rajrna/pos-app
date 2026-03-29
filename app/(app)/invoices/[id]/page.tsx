"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  CreditCard,
  FileText,
  Send,
} from "lucide-react";
import {
  useParams,
  useRouter,
} from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "overdue";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Replace this with your real hook — e.g. useInvoice(id)
  // const { data: invoice, isLoading } = useInvoice(id as string);

  // --- Mock data for illustration; delete when wiring up real hook ---
  const invoice = {
    id,
    number: id,
    status: "sent" as InvoiceStatus,
    customer: {
      name: "John Doe",
      email: "john@example.com",
    },
    grandTotal: 90,
    dueDate: new Date(),
    createdAt: new Date(),
    sentAt: new Date(),
  };
  const isLoading = false;
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

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">
          Invoice not found.
        </p>
      </div>
    );
  }

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

  const handleResendInvoice = () => {
    toast.success("Invoice resent successfully!");
  };

  const handleChargeCard = () => {
    toast("Opening payment form...");
  };

  const handleRecordPayment = () => {
    toast("Opening record payment form...");
  };

  const handleEditInvoice = () => {
    router.push(`/invoices/${id}/edit`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Invoice #{invoice.number}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Online Payments toggle */}
          <button className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50 transition-colors">
            Online Payments
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-gray-500">
                OFF
              </span>
            </span>
          </button>

          {/* More actions */}
          <div className="relative">
            <button
              onClick={() =>
                setMoreActionsOpen((v) => !v)
              }
              className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50 transition-colors"
            >
              More actions{" "}
              <ChevronDown size={14} />
            </button>
            {moreActionsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setMoreActionsOpen(false);
                    handleEditInvoice();
                  }}
                >
                  Edit invoice
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setMoreActionsOpen(false);
                    toast("Downloading PDF...");
                  }}
                >
                  Download PDF
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  onClick={() => {
                    setMoreActionsOpen(false);
                    toast.error(
                      "Invoice deleted",
                    );
                  }}
                >
                  Delete invoice
                </button>
              </div>
            )}
          </div>

          <Button
            onClick={() =>
              router.push("/invoices/new")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5"
          >
            Create another invoice
          </Button>
        </div>
      </div>

      {/* Invoice meta row */}
      <div className="max-w-3xl mx-auto px-6 py-6">
        <div className="flex items-center gap-8 mb-6">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Status
            </p>
            <span
              className={`inline-block px-3 py-1 rounded-md text-sm font-semibold capitalize ${statusColors[invoice.status]}`}
            >
              {invoice.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Customer
            </p>
            <p className="text-blue-600 font-semibold">
              {invoice.customer.name}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Amount due
            </p>
            <p className="text-2xl font-bold text-gray-900">
              ${invoice.grandTotal.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Due
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {dueDateLabel}
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3">
          {/* Step 1: Create */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 shrink-0">
              <FileText size={18} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg">
                Create
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                <span className="font-medium text-gray-700">
                  Created:
                </span>{" "}
                {new Date(
                  invoice.createdAt,
                ).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <button
              onClick={handleEditInvoice}
              className="text-sm border border-gray-200 rounded-full px-4 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit invoice
            </button>
          </div>

          {/* Connector */}
          <div className="w-px h-4 bg-gray-200 ml-9" />

          {/* Step 2: Send */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 shrink-0">
                <Send size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Send
                </h3>
                {invoice.sentAt ? (
                  <p className="text-sm text-gray-500 mt-0.5">
                    <span className="font-medium text-gray-700">
                      Last sent:
                    </span>{" "}
                    Marked as sent today.{" "}
                    <button className="text-blue-600 hover:underline">
                      Edit date
                    </button>
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 mt-0.5">
                    Not sent yet.
                  </p>
                )}
              </div>
              <Button
                onClick={handleResendInvoice}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5"
              >
                {invoice.sentAt
                  ? "Resend invoice"
                  : "Send invoice"}
              </Button>
            </div>

            {/* Reminder tip */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 ml-14">
              <Bell
                size={16}
                className="text-blue-500 mt-0.5 shrink-0"
              />
              <p className="text-sm text-gray-700">
                Overdue invoices are{" "}
                <span className="font-bold">
                  3x more likely to get paid
                </span>{" "}
                when you send reminders.{" "}
                <button className="text-blue-600 font-medium hover:underline">
                  Schedule reminders.
                </button>
              </p>
            </div>
          </div>

          {/* Connector */}
          <div className="w-px h-4 bg-gray-200 ml-9" />

          {/* Step 3: Manage payments */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 shrink-0">
                <CreditCard size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Manage payments
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleChargeCard}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5"
                >
                  Charge a credit card
                </Button>
                <button
                  onClick={handleRecordPayment}
                  className="text-sm border border-gray-200 rounded-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Record a payment
                </button>
              </div>
            </div>

            <div className="ml-14 flex items-center justify-between text-sm">
              <p className="text-gray-600">
                <span className="font-medium">
                  Amount due:
                </span>{" "}
                ${invoice.grandTotal.toFixed(2)} —{" "}
                <button
                  onClick={handleRecordPayment}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Record a payment
                </button>{" "}
                manually
              </p>
              <p className="text-gray-600">
                <span className="font-medium">
                  Status:
                </span>{" "}
                Your invoice is awaiting payment
              </p>
            </div>

            <div className="ml-14 text-sm text-gray-600">
              <button
                onClick={() =>
                  toast("Sending reminder...")
                }
                className="text-blue-600 hover:underline font-medium"
              >
                Send a reminder
              </button>{" "}
              now.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
