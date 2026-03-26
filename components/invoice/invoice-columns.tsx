"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import { formatDatetime } from "@/utils/helper";
import { Invoice } from "@/lib/types/invoice";
import { CurrencyConfig } from "@/lib/config/store";
import { formatCurrency } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700 hover:bg-green-100",
  Unpaid:
    "bg-red-100 text-red-700 hover:bg-red-100",
  Draft:
    "bg-gray-100 text-gray-700 hover:bg-gray-100",
  Overdue:
    "bg-orange-100 text-orange-700 hover:bg-orange-100",
};

export const getInvoiceColumns = (
  currency: CurrencyConfig,
): ColumnDef<Invoice>[] => [
  {
    accessorKey: "invoice_id",
    header: "Invoice #",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">
        {row.getValue("invoice_id")}
      </span>
    ),
  },
  {
    accessorKey: "customer_name",
    header: "Customer",
    cell: ({ row }) => (
      <span className="text-gray-900">
        {row.getValue("customer_name") ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        Amount
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">
        {formatCurrency(
          Number(row.getValue("amount")),
          currency,
        )}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-gray-600">
        {formatDatetime(
          row.getValue("created_at"),
        )}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue(
        "status",
      ) as string;
      return (
        <Badge
          className={
            statusStyles[status] ??
            "bg-gray-100 text-gray-700"
          }
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, _, filterValue) => {
      if (!filterValue || filterValue === "all")
        return true;
      return (
        row.getValue("status") === filterValue
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-700 p-0"
          >
            Approve
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-red-400 text-gray-100 hover:bg-red-500">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
