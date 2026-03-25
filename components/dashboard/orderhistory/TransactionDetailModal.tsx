"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "./transaction-columns";
import { Loader2 } from "lucide-react";
import { CurrencyConfig } from "@/lib/config/store";
import { formatCurrency } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  isLoading: boolean;
  currency: CurrencyConfig;
};

export default function TransactionDetailModal({
  open,
  onClose,
  transaction,
  isLoading,
  currency,
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

        {!isLoading && transaction && (
          <div className="space-y-4 text-sm">
            {/* Business Header */}
            <div className="text-center border-b pb-4">
              <h2 className="font-bold text-lg">
                {transaction.businessName ?? "—"}
              </h2>
              {/* <p className="text-gray-500 text-xs">
                Invoice #{transaction.invoiceNo}
              </p> */}
              <p className="text-gray-500 text-xs">
                {transaction.date} at{" "}
                {transaction.timestamp}
              </p>
            </div>

            {/* Customer */}
            <section>
              <div className="grid grid-cols-2 gap-y-1">
                <span className="font-medium">
                  {transaction.customer}
                </span>
                <span className="text-gray-500">
                  <span className="font-bold">
                    Bill no:
                  </span>
                  {transaction.invoiceNo}
                </span>
              </div>
            </section>

            {/* Items */}
            <section>
              <h3 className="font-semibold text-gray-500 uppercase text-xs mb-2">
                Items
              </h3>
              {transaction.items.length === 0 ? (
                <p className="text-gray-400 italic text-xs">
                  No items available
                </p>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                    <span className="col-span-2">
                      Item
                    </span>
                    <span className="text-center">
                      Qty
                    </span>
                    <span className="text-right">
                      Rate
                    </span>
                  </div>
                  {/* Rows */}
                  {transaction.items.map(
                    (item, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-4 gap-2 px-3 py-2 border-t text-sm"
                      >
                        <span className="col-span-2">
                          {item.name}
                        </span>
                        <span className="text-center text-gray-500">
                          {item.quantity}
                        </span>
                        <span className="text-right">
                          {formatCurrency(
                            Number(
                              item.unitPrice,
                            ),
                            currency,
                          )}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              )}
            </section>

            {/* Bill Totals */}
            <section className="border-t pt-4 space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>
                <span>
                  {formatCurrency(
                    transaction.totalAmount ??
                      Number(transaction.amount),
                    currency,
                  )}
                </span>
              </div>
              {(transaction.discount ?? 0) >
                0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>
                    -{" "}
                    {formatCurrency(
                      Number(
                        transaction.discount,
                      ),
                      currency,
                    )}
                  </span>
                </div>
              )}
              {(transaction.taxAmount ?? 0) >
                0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Tax
                  </span>
                  <span>
                    {formatCurrency(
                      Number(
                        transaction.taxAmount,
                      ),
                      currency,
                    )}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base border-t pt-2 mt-1">
                <span>Total</span>
                <span>
                  {formatCurrency(
                    Number(transaction.amount),
                    currency,
                  )}
                </span>
              </div>
            </section>

            {/* Payment Method Breakdown */}
            <section className="space-y-1">
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
                {(transaction.cashAmount ?? 0) >
                  0 && (
                  <>
                    <span className="text-gray-500">
                      Cash
                    </span>
                    <span>
                      {transaction.cashAmount}
                    </span>
                  </>
                )}
                {(transaction.qrAmount ?? 0) >
                  0 && (
                  <>
                    <span className="text-gray-500">
                      QR
                    </span>
                    <span>
                      {formatCurrency(
                        Number(
                          transaction.qrAmount,
                        ),
                        currency,
                      )}
                    </span>
                  </>
                )}
                <span className="text-gray-500">
                  Cashier
                </span>
                <span className="font-medium">
                  {transaction.generatedBy ?? "—"}
                </span>
                <span className="text-gray-500">
                  Status
                </span>
                <span className="font-medium capitalize">
                  {transaction.status}
                </span>
              </div>
            </section>

            {/* Refund Button */}
            {/* {!transaction.status.includes(
              "refunded",
            ) && (
              <button
                className="w-full border border-red-300 text-red-600 hover:bg-red-50 rounded-lg py-2 font-medium transition-colors"
                onClick={() => {}}
              >
                Refund Transaction
              </button>
            )} */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
