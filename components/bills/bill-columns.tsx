import { CurrencyConfig } from "@/lib/config/store";
import {
  Bill,
  //   statusStyles,
} from "@/lib/types/expenses";
import { formatDatetime } from "@/utils/helper";
import {
  ColumnDef,
  FilterFn,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700 hover:bg-green-100",
  unpaid:
    "bg-red-100 text-red-700 hover:bg-red-100",
  Draft:
    "bg-gray-100 text-gray-700 hover:bg-gray-100",
  Overdue:
    "bg-orange-100 text-orange-700 hover:bg-orange-100",
};

const multiSelectFilter: FilterFn<Bill> = (
  row,
  columnId,
  value,
) => {
  if (!value?.length) return true;
  return value.includes(row.getValue(columnId));
};

export const getBillColumns = (
  currency: CurrencyConfig,
): ColumnDef<Bill>[] => [
  {
    accessorKey: "status",
    header: "Status",
    filterFn: multiSelectFilter,
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
  },
  {
    accessorKey: "bill",
    header: "Bill #",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">
        BILL-{row.getValue("invoice")}
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
    accessorKey: "vendor_name",
    header: "Vendor",
    cell: ({ row }) => (
      <span className="text-gray-900">
        {row.getValue("vendor_name") ?? "_"}
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
    id: "actions",
    header: "Actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-700 p-0"
          >
            Actions
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            Make Payment
          </DropdownMenuItem>
          <DropdownMenuItem>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-red-500 text-gray-100 hover:bg-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
