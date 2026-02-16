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
import { formatDatetime } from "@/utils/helper";
import { InvoiceRowProps } from "@/types/invoice";

export default function InvoiceRow({
  invoice,
}: InvoiceRowProps) {
  const {
    invoice_id: invoiceId,
    created_at,
    status,
    amount,
  } = invoice;
  return (
    <TableRow>
      <TableCell className="text-gray-900">
        {invoiceId}
      </TableCell>
      <TableCell className="text-gray-900">
        Ek
      </TableCell>
      <TableCell className="text-gray-900 font-medium">
        $ {amount}
      </TableCell>

      <TableCell className="text-gray-900">
        {formatDatetime(created_at)}
      </TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          className="bg-gray-200 text-gray-700 hover:bg-gray-200 "
        >
          {status}
        </Badge>
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
            <DropdownMenuItem className="bg-red-400 text-gray-100 hover:bg-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
