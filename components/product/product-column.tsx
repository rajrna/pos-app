import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Product } from "@/lib/types/product";
import { formatCurrency } from "@/lib/utils";
import { CurrencyConfig } from "@/lib/config/store";

import { Button } from "../ui/button";

export const getProductColumns = (
  currency: CurrencyConfig,
): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <span>{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span>{row.getValue("description")}</span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc",
          )
        }
      >
        Price{" "}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-semibold">
        {formatCurrency(
          row.getValue("price"),
          currency,
        )}
      </span>
    ),
  },
];
