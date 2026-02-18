import {
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function AddInvoiceHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-gray-200 border-b ">
        <TableHead className="w-6" />
        <TableHead className="font-semibold text-gray-900">
          Items
        </TableHead>
        <TableHead className="text-gray-600">
          Description
        </TableHead>
        <TableHead className="text-gray-600 text-right">
          Quantity
        </TableHead>
        <TableHead className="text-gray-600 text-right">
          Price
        </TableHead>
        <TableHead className="text-gray-600 text-right">
          Amount
        </TableHead>
        <TableHead className="w-8" />
      </TableRow>
    </TableHeader>
  );
}
