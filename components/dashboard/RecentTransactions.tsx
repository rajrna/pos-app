"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { statusStyles } from "@/lib/transaction";
import { TransactionStatus } from "@/lib/transaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";

type Transaction = {
  id: string;
  timestamp: string;
  customer: string;
  amount: number;
  status: TransactionStatus;
};

type RecentTransactionsProps = {
  title?: string;
  description?: string;
  viewAllHref?: string;
  transactions: Transaction[];
};

export default function RecentTransactions({
  title = "Recent Transactions",
  description = "Revenue performance - current week",
  viewAllHref = "/dashboard/order-history",
  transactions,
}: RecentTransactionsProps) {
  const { currency } = useCurrency();
  return (
    <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 p-4">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <p className="text-sm mt-1">
            {description}
          </p>
        </div>
        <Link
          href={viewAllHref}
          className="text-blue-500 flex hover:text-blue-600"
        >
          View all
          <ChevronRight
            size={22}
            strokeWidth={1.75}
          />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => {
            const styles =
              statusStyles[tx.status];
            return (
              <TableRow key={tx.id}>
                <TableCell>
                  <p className="text-[12px] font-semibold">
                    {tx.id}
                  </p>
                  <p className="text-[10px]">
                    {tx.timestamp}
                  </p>
                </TableCell>
                <TableCell>
                  {tx.customer}
                </TableCell>
                <TableCell>
                  {formatCurrency(
                    tx.amount as number,
                    currency,
                  )}
                </TableCell>
                <TableCell
                  className={styles.cell}
                >
                  <p
                    className={`${styles.badge} w-20 px-1 py-0.5 flex items-center justify-center rounded-lg`}
                  >
                    {tx.status}
                  </p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
