import {
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// export default function AddInvoiceHeader() {
//   return (
//     <TableHeader>
//       <TableRow className="bg-gray-200 border-b ">
//         <TableHead className="w-6" />
//         <TableHead className="font-semibold text-gray-900">
//           Items
//         </TableHead>
//         <TableHead className="text-gray-600">
//           Description
//         </TableHead>
//         <TableHead className="text-gray-600 text-right">
//           Quantity
//         </TableHead>
//         <TableHead className="text-gray-600 text-right">
//           Price
//         </TableHead>
//         <TableHead className="text-gray-600 text-right">
//           Amount
//         </TableHead>
//         <TableHead className="w-8" />
//       </TableRow>
//     </TableHeader>
//   );
// }
export default function AddInvoiceHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-blue-50 border-y border-blue-100 hover:bg-blue-50">
        {/* Drag handle column */}
        <TableHead className="w-6" />

        <TableHead className="font-semibold text-blue-900 text-sm">
          Items
        </TableHead>

        <TableHead className="font-medium text-blue-700 text-sm">
          Description
        </TableHead>

        <TableHead className="font-medium text-blue-700 text-sm text-right">
          Qty
        </TableHead>

        <TableHead className="font-medium text-blue-700 text-sm text-right">
          Price
        </TableHead>

        <TableHead className="font-medium text-blue-700 text-sm text-right">
          Amount
        </TableHead>

        {/* Delete column */}
        <TableHead className="w-8" />
      </TableRow>
    </TableHeader>
  );
}
