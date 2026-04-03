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
    <div className="w-full overflow-hidden">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-gray-400 hover:bg-gray-400 border-none ">
            <TableHead className="text-white w-[40%]">
              Items
            </TableHead>
            <TableHead className="text-white w-[20%]">
              Quantity
            </TableHead>
            <TableHead className="text-white w-[20%]">
              Price
            </TableHead>
            <TableHead className="text-white w-[20%] text-right">
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
                  {(
                    details.quantity *
                    details.unitPrice
                  ).toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
