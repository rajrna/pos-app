"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "./transaction-columns";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  isLoading: boolean;
};

export default function TransactionDetailModal({
  open,
  onClose,
  transaction,
  isLoading,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => !o && onClose()}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Transaction Detail
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        )}

        {transaction && (
          <div className="space-y-6 text-sm">
            <section>
              <div className="grid grid-cols-2 gap-y-1 border-b py-4">
                <span className="font-medium ">
                  {transaction.customer}
                </span>
                <span className="font-medium">
                  Paid Bill No.: {transaction.id}
                </span>
              </div>
            </section>
            <section>
              <h3 className="font-semibold text-gray-500 uppercase text-xs mb-2">
                Order
              </h3>
              <div className="grid grid-cols-2 gap-y-1">
                <span className="text-gray-500">
                  Invoice
                </span>
                <span className="font-medium">
                  {transaction.id}
                </span>
                <span className="text-gray-500">
                  Date
                </span>
                <span className="font-medium">
                  {transaction.date}
                </span>
                <span className="text-gray-500">
                  Time
                </span>
                <span className="font-medium">
                  {transaction.timestamp}
                </span>
                <span className="text-gray-500">
                  Status
                </span>
                <span className="font-medium">
                  {transaction.status}
                </span>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-gray-500 uppercase text-xs mb-2">
                Items Ordered
              </h3>
              {transaction.items.length === 0 ? (
                <p className="text-gray-400 italic">
                  No items available
                </p>
              ) : (
                <div className="divide-y rounded-md border">
                  {transaction.items.map(
                    (item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2"
                      >
                        <span>{item.name}</span>
                        <span className="text-gray-500">
                          x{item.quantity}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              )}
            </section>

            <section>
              <h3 className="font-semibold text-gray-500 uppercase text-xs mb-2">
                Payment
              </h3>
              <div className="grid grid-cols-2 gap-y-1">
                <span className="text-gray-500">
                  Method
                </span>
                <span className="font-medium">
                  {transaction.paymentMethod}
                </span>
                <span className="text-gray-500">
                  Total
                </span>
                <span className="font-medium">
                  {transaction.amount}
                </span>
              </div>
            </section>

            {!transaction.status.includes(
              "refunded",
            ) && (
              <Button className="w-full border bg-white border-red-300  text-red-500 hover:bg-red-50 rounded-lg py-2 font-medium transition-colors">
                Refund Transaction
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
