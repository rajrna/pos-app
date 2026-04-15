"use client";
import { useCurrency } from "@/lib/context/CurrencyContext";
import InvoiceBillTable from "../ticket/InvoiceBillTable";
import { RefObject, useState } from "react";
import { InvoiceItemGroup } from "@/lib/types/invoice";
import businessLogo from "@/public/rebuzz.png";
import Image from "next/image";

interface InvoiceData {
  _id: string;
  invoice: number;
  ticketName: string;
  customerEmail: string;
  phoneNumber: string;
  grandTotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  items: InvoiceItemGroup[];
}

interface CustomerProfile {
  name?: string;
  loyaltyPoint?: number;
}
interface BusinessProfile {
  businessName?: string;
  address?: string;
}

interface InvoicePreviewProps {
  proformaTag: boolean;
  invoiceRef?: RefObject<HTMLDivElement | null>;
  invoice: InvoiceData;
  customerProfile?: CustomerProfile | null;
  businessProfile?: BusinessProfile | null;
}

export default function InvoicePreview({
  proformaTag,
  invoiceRef,
  invoice,
  customerProfile,
  businessProfile,
}: InvoicePreviewProps) {
  const { currency } = useCurrency();

  return (
    <div
      ref={invoiceRef}
      className="bg-white border border-gray-200  p-5  shadow-md hover:shadow-lg transition duration-300"
    >
      {/* Header: Company Info */}
      <div className="border-b py-4 grid grid-cols-2">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight text-gray-900">
            {proformaTag
              ? "PROFORMA INVOICE"
              : "INVOICE"}
          </h1>
          <h2 className="font-bold text-gray-800">
            {businessProfile?.businessName}
          </h2>
          <p className="text-sm text-gray-500">
            Nepal
          </p>
        </div>
        <div className="flex justify-end">
          <Image
            // className="w-full h-auto"
            quality={100}
            width={80}
            height={80}
            src={businessLogo}
            alt="business logo"
          />
        </div>
      </div>

      {/* Main Info Row */}
      <div className="flex justify-between items-start py-6">
        {/* Left Side: Bill To */}
        <div className="space-y-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Bill to
          </p>
          <p className="text-gray-900 font-bold text-lg">
            {customerProfile?.name ||
              invoice?.ticketName ||
              invoice?.customerEmail ||
              "Guest"}
          </p>
          <div className="text-sm text-gray-500 leading-relaxed">
            <p>{invoice?.phoneNumber}</p>
            <p>{invoice?.customerEmail}</p>
          </div>
        </div>

        {/* Right Side: Invoice Details (The Grid) */}
        <div className="w-60 ml-auto text-sm">
          <div className="space-y-2 mb-2">
            {/* Row: Number */}
            <div className="grid grid-cols-2 items-center">
              <span className="font-semibold text-gray-600">
                Invoice Number :
              </span>
              <span className="text-gray-900 font-medium text-right">
                {invoice.invoice}
              </span>
            </div>

            {/* Row: Date */}
            <div className="grid grid-cols-2 items-center">
              <span className="font-semibold text-gray-600">
                Invoice Date :
              </span>

              <span className="text-gray-900 text-right">
                {new Date(
                  invoice.createdAt,
                ).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Amount Box */}
          <div className="bg-gray-200  p-1 border border-gray-100">
            <div className="grid grid-cols-2 items-center">
              <span className="font-bold text-gray-600">
                Amount :
              </span>

              <span className="text-gray-900 font-black text-xl text-right">
                {currency.symbol}
                {invoice.grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Row */}
      <InvoiceBillTable
        invoices={invoice.items}
      />
      <div className="w-px h-2 bg-gray-200 ml-9" />

      {/* Calculation */}
      <div className="flex flex-col items-end">
        <div className="grid grid-cols-2 items-center">
          <span className="font-semibold text-gray-600">
            Subtotal :
          </span>
          <span className="text-gray-900 font-medium text-right">
            {currency.symbol} {invoice.total}
          </span>
        </div>
        <div className="grid grid-cols-2 items-center border-b-2 border-gray-800">
          <span className="font-semibold text-gray-400">
            Discount :
          </span>
          <span className="text-gray-400 font-medium text-right">
            {currency.symbol}{" "}
            {invoice.total - invoice.grandTotal}
          </span>
        </div>

        <div className="grid grid-cols-2 items-center">
          <span className="font-semibold text-gray-600">
            Total :
          </span>
          <span className="text-gray-600 font-medium text-right">
            {currency.symbol} {invoice.grandTotal}
          </span>
        </div>
      </div>
    </div>
  );
}
