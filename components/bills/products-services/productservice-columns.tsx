"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Pen,
  Trash2,
} from "lucide-react";

import { CurrencyConfig } from "@/lib/config/store";
import { formatCurrency } from "@/lib/utils";

import { Button } from "../../ui/button";
export type ProductService = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const getProductServiceColumns = (
  currency: CurrencyConfig,
): ColumnDef<ProductService>[] => [
  {
    accessorKey: "name",
    header: "Name",
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
        Price
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
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-3 hover:bg-muted/50">
        <button className="bg-white text-blue-800   cursor-pointer">
          {/* <Pencil /> */}
          <Pen size={20} strokeWidth={2} />
        </button>
        <button className="bg-white text-blue-800 hover:text-red-800  cursor-pointer">
          <Trash2 size={20} strokeWidth={2} />
        </button>
      </div>
    ),
  },
];
