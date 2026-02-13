"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { TableRow, TableCell } from "../ui/table";
import { Invoice } from "@/types/invoice";

interface InvoiceRowProps {
  invoice: Invoice;
}

export default function InvoiceRow({
  invoice,
}: InvoiceRowProps) {
  const {
    id: invoiceId,
    created_at,
    status,
    amount,
  } = invoice;
  return (
    <TableRow>
      <TableCell>
        <Badge
          variant="secondary"
          className="bg-gray-200 text-gray-700 hover:bg-gray-200"
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell className="text-gray-900">
        {/* 2026-02-04 */}
        {created_at}
      </TableCell>
      <TableCell className="text-gray-900">
        {invoiceId}
      </TableCell>
      <TableCell className="text-gray-900">
        Ek
      </TableCell>
      <TableCell className="text-gray-900 font-medium">
        $ {amount}
      </TableCell>
      <TableCell>
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
            <DropdownMenuItem>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
