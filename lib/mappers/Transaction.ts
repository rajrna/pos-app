// lib/mappers/transaction.ts

import { Transaction } from "@/components/dashboard/orderhistory/transaction-columns";
import { PaymentMethod } from "@/lib/transaction";
import {
  RawBill,
  RawBillDetailResponse,
  RawBillListResponse,
} from "../types/bill";

// Handles inconsistent casing from the backend
function normalizePaymentMethod(
  method: string,
): PaymentMethod {
  const lower = method.toLowerCase();
  if (lower === "cash") return "Cash";
  if (lower.includes("qr")) return "QR";
  if (lower === "card") return "Card";
  return method as PaymentMethod;
}

function mapBillToTransaction(
  bill: RawBill,
): Transaction {
  const paidAt = new Date(bill.paidAt);
  return {
    id: `INV-${bill.invoiceNo}`,
    date: paidAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    timestamp: paidAt.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    ),
    customer:
      bill.customer?.name ??
      bill.ticketName ??
      "NoName",
    amount: String(bill.grandTotal),
    paymentMethod: normalizePaymentMethod(
      bill.paymentMethod,
    ),
    items: (bill.items ?? []).flatMap((entry) =>
      entry.item.map((i) => ({
        name: i.productName,
        quantity: i.quantity,
      })),
    ),
    status: bill.isRefunded
      ? "refunded"
      : "completed",
  };
}

export function mapBillsToTransactions(
  response: RawBillListResponse,
): Transaction[] {
  return response.data.bill.map(
    mapBillToTransaction,
  );
}

export function mapDetailBillToTransaction(
  response: RawBillDetailResponse,
): Transaction {
  return mapBillToTransaction(response.data.bill);
}
