import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function InvoiceBillTable({
  invoices,
}) {
  return (
    <div>
      {/* Table Headers */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-400 hover:bg-gray-400 ">
            <TableHead className="text-gray-100">
              Items
            </TableHead>
            <TableHead className="text-gray-100">
              Quantity
            </TableHead>
            <TableHead className="text-gray-100">
              Price
            </TableHead>
            <TableHead className="text-gray-100 text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((group) => {
            const details = group.item[0];

            return (
              <TableRow key={group._id}>
                <TableCell className="font-medium">
                  {details.productName}{" "}
                </TableCell>
                <TableCell>
                  {details.quantity}
                </TableCell>
                <TableCell>
                  {details.unitPrice}
                </TableCell>
                <TableCell className="text-right">
                  {details.quantity *
                    details.unitPrice}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
