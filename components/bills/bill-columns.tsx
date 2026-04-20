import { CurrencyConfig } from "@/lib/config/store";
import {
  Bill,
  BillView,
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
import {
  endOfDay,
  isWithinInterval,
  startOfDay,
} from "date-fns";

type BillStatus =
  | "Paid"
  | "Unpaid"
  | "Partial"
  | "Overdue";

const statusStyles: Record<
  BillStatus,
  { style: string }
> = {
  Paid: {
    style:
      "bg-green-100 text-green-700 hover:bg-green-100",
  },
  Unpaid: {
    style:
      "bg-gray-100 text-gray-700 hover:bg-gray-100",
  },
  Partial: {
    style:
      "bg-gray-100 text-gray-700 hover:bg-gray-100",
  },
  Overdue: {
    style:
      "bg-orange-100 text-orange-700 hover:bg-orange-100",
  },
};

const dateRangeFilter: FilterFn<BillView> = (
  row,
  columnId,
  value,
) => {
  const { from, to } = value as {
    from: Date | undefined;
    to: Date | undefined;
  };
  if (!from && !to) return true;
  const rowDate = row.getValue(columnId) as Date;
  if (from && !to)
    return rowDate >= startOfDay(from);
  if (!from && to) return rowDate <= endOfDay(to);
  return isWithinInterval(rowDate, {
    start: startOfDay(from!),
    end: endOfDay(to!),
  });
};

const multiSelectFilter: FilterFn<BillView> = (
  row,
  columnId,
  value,
) => {
  if (!value?.length) return true;
  return value.includes(row.getValue(columnId));
};

export const getBillColumns = (
  currency: CurrencyConfig,
): ColumnDef<BillView>[] => [
  {
    accessorKey: "status",
    header: "Status",
    filterFn: multiSelectFilter,
    cell: ({ row }) => {
      const status: BillStatus =
        row.getValue("status");
      const s = statusStyles[status];
      return (
        <Badge className={`${s.style}`}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "bill_no",
    header: "Bill #",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">
        BILL-{row.getValue("bill_no")}
      </span>
    ),
  },
  {
    id: "date",
    accessorKey: "created_at",
    filterFn: dateRangeFilter,
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        Created at
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
    accessorKey: "subtotal",
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
          Number(row.getValue("subtotal")),
          currency,
        )}
      </span>
    ),
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        Due at
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-gray-600">
        {formatDatetime(row.getValue("due_date"))}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
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
