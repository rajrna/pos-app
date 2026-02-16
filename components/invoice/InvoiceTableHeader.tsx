import {
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronDown } from "lucide-react";

export default function InvoiceTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50">
        <TableHead className="font-semibold text-gray-900">
          Invoice id
        </TableHead>
        <TableHead className="font-semibold text-gray-900">
          Customer name
        </TableHead>
        <TableHead className="font-semibold text-gray-900">
          Amount
        </TableHead>
        <TableHead className="font-semibold text-gray-900">
          <div className="flex items-center gap-1">
            Date
            <ChevronDown className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="font-semibold text-gray-900">
          Status
        </TableHead>

        <TableHead className="font-semibold text-gray-900">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
