"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export type Customer = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  totalDueAmount?: number;
  loyaltyPoint: number;
};

export const getCustomerColumns: ColumnDef<Customer>[] =
  [
    {
      accessorKey: "name",
      header: "Customer name",
      cell: ({ row }) => (
        <span>{row.getValue("name")}</span>
      ),
    },
    {
      accessorKey: "loyaltyPoint",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc",
            )
          }
        >
          Points{" "}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-semibold">
          {row.getValue("loyaltyPoint")}
        </span>
      ),
    },
    {
      accessorKey: "totalDueAmount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc",
            )
          }
        >
          Due Amount{" "}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-semibold">
          {row.getValue("totalDueAmount")}
        </span>
      ),
    },
  ];
