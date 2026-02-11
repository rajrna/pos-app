import { fetchCustomers } from "@/services/apiUser";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronDown } from "lucide-react";
import { Customer } from "@/types/customer";
import { formatCurrency } from "@/utils/helper";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
export default function UserTable() {
  const {
    isLoading,
    data: customers = [],
    error,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: fetchCustomers,
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-white border-b">
          <TableHead className="font-semibold text-gray-900">
            <div className="flex items-center gap-1">
              Name
              <ChevronDown className="h-4 w-4" />
            </div>
          </TableHead>
          <TableHead className="font-semibold text-gray-900">
            Email
          </TableHead>
          <TableHead className="font-semibold text-gray-900">
            Phone
          </TableHead>
          <TableHead className="font-semibold text-gray-900">
            <div className="flex items-center gap-1">
              Saved cards
              {/* <HelpCircle className="h-4 w-4 text-gray-400" /> */}
            </div>
          </TableHead>
          <TableHead className="font-semibold text-gray-900">
            Balance | Overdue
          </TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow
            key={customer.id}
            className="border-b last:border-0"
          >
            <TableCell className="font-medium text-gray-900">
              {customer.name}
            </TableCell>
            <TableCell className="text-gray-700">
              {customer.email || "—"}
            </TableCell>
            <TableCell className="text-gray-700">
              {customer.phone || "—"}
            </TableCell>
            <TableCell className="text-gray-700">
              {customer.savedCards || "—"}
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">
                  {formatCurrency(
                    customer.balance,
                  )}
                </span>
                {customer.overdue > 0 && (
                  <span className="text-sm text-red-600">
                    {formatCurrency(
                      customer.overdue,
                    )}{" "}
                    overdue
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
                  <DropdownMenuItem className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
