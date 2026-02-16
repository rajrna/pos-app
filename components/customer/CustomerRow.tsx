import toast from "react-hot-toast";

import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";

import { formatCurrency } from "@/utils/helper";
import { CustomerRowProps } from "@/types/customer";
import { useDeleteCustomer } from "@/hooks/useCustomers";

export default function CustomerRow({
  customer,
}: CustomerRowProps) {
  const {
    id: customerId,
    name,
    email,
    phone,
    savedCards,
    balance,
    overdue,
  } = customer;

  const deleteCustomerMutation =
    useDeleteCustomer();

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${name}"?`,
      )
    ) {
      deleteCustomerMutation.mutate(customerId, {
        onSuccess: () => {
          toast.success(
            `Customer "${name}" deleted successfully`,
          );
        },
        onError: (error: Error) => {
          toast.error(
            `Failed to delete customer: ${error.message}`,
          );
        },
      });
    }
  };
  return (
    <TableRow
      key={customerId}
      className="border-b last:border-0"
    >
      <TableCell className="font-medium text-gray-900">
        {name}
      </TableCell>
      <TableCell className="text-gray-700">
        {email || "—"}
      </TableCell>
      <TableCell className="text-gray-700">
        {phone || "—"}
      </TableCell>
      <TableCell className="text-gray-700">
        {savedCards || "—"}
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            {formatCurrency(balance)}
          </span>
          {overdue > 0 && (
            <span className="text-sm text-red-600">
              {formatCurrency(overdue)} overdue
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-blue-200 hover:bg-blue-50"
            >
              <ChevronDown className="h-4 w-4 text-blue-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              Create invoice
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={handleDelete}
              disabled={
                deleteCustomerMutation.isPending
              }
            >
              {deleteCustomerMutation.isPending
                ? "Deleting..."
                : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
