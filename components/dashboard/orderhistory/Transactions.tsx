"use client";
import { useState } from "react";

import { useCurrency } from "@/lib/context/CurrencyContext";
import { PaymentMethod } from "@/lib/transaction";
import { TransactionStatus } from "@/lib/transaction";

import { getTransactionDetail } from "@/services/dashboard/apiTransactionClient";
import { DataTable } from "@/components/ui/data-table";
import {
  getTransactionColumns,
  Transaction,
} from "@/components/dashboard/orderhistory/transaction-columns";
import TransactionDetailModal from "./TransactionDetailModal";

// type Item = {
//   name: string;
//   quantity: number;
// };

// type Transaction = {
//   id: string;
//   date: string;
//   timestamp: string;
//   customer: string;
//   amount: string;
//   paymentMethod: PaymentMethod;
//   items: Item[];
//   status: TransactionStatus;
// };

export default function Transactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const { currency } = useCurrency();
  const columns = getTransactionColumns(currency);

  const [
    selectedTransaction,
    setSelectedTransaction,
  ] = useState<Transaction | null>(null);
  const [modalOpen, setModalOpen] =
    useState(false);
  const [isLoadingDetail, setIsLoadingDetail] =
    useState(false);

  async function handleRowClick(
    row: Transaction,
  ) {
    console.log("row.id:", row.id);
    const invoiceNo = parseInt(
      row.id.replace("INV-", ""),
      10,
    );
    console.log("invoiceNo:", invoiceNo);
    setModalOpen(true);
    setIsLoadingDetail(true);
    try {
      const detail =
        await getTransactionDetail(invoiceNo);
      setSelectedTransaction(detail);
    } catch (err) {
      console.error(
        "Failed to load transaction detail:",
        err,
      );
    } finally {
      setIsLoadingDetail(false);
    }
  }

  // function parseInvoiceNo(id: string): number {
  //   return parseInt(id.replace("INV-", ""), 10);
  // }
  return (
    <>
      <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 py-8 px-4">
        <h1 className="font-semibold text-xl">
          Transactions Log
        </h1>
        <p className="text-gray-500">
          All orders matching your request
        </p>
        <DataTable
          columns={columns}
          data={transactions}
          searchColumn="customer"
          searchPlaceholder="Search customer..."
          showDateFilter={true}
          showColumnToggle={true}
          pageSize={10}
          onRowClick={handleRowClick}
          filters={[
            {
              columnId: "status",
              label: "Status",
              options: [
                "completed",
                "pending",
                "failed",
                "refunded",
              ],
            },
            {
              columnId: "paymentMethod",
              label: "Payment",
              options: [
                "Card",
                "Cash",
                "Loyalty",
                "QR",
              ],
            },
          ]}
        />
        <TransactionDetailModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedTransaction(null);
          }}
          transaction={selectedTransaction}
          isLoading={isLoadingDetail}
          currency={currency}
        />
      </div>
    </>
  );
}
