"use client";

import { useCurrency } from "@/lib/context/CurrencyContext";
import { PaymentMethod } from "@/lib/transaction";
import { TransactionStatus } from "@/lib/transaction";

import { DataTable } from "@/components/ui/data-table";
import { getTransactionColumns } from "@/components/dashboard/orderhistory/transaction-columns";

type Item = {
  name: string;
  quantity: number;
};

type Transaction = {
  id: string;
  date: string;
  timestamp: string;
  customer: string;
  amount: string;
  paymentMethod: PaymentMethod;
  items: Item[];
  status: TransactionStatus;
};

export default function Transactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const { currency } = useCurrency();
  const columns = getTransactionColumns(currency);
  return (
    <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 py-8 px-4">
      <h1 className="font-semibold text-xl">
        Transactions Log
      </h1>
      <p className="text-gray-500">
        All orders matching your request
      </p>
      <DataTable
        columns={columns}
        data={transactions}
        searchColumn="customer"
        searchPlaceholder="Search customer..."
        showDateFilter={true}
        showColumnToggle={true}
        pageSize={10}
        filters={[
          {
            columnId: "status",
            label: "Status",
            options: [
              "completed",
              "pending",
              "failed",
              "refunded",
            ],
          },
          {
            columnId: "paymentMethod",
            label: "Payment",
            options: [
              "Card",
              "Cash",
              "Loyalty",
              "QR",
            ],
          },
        ]}
      />
    </div>
  );
}

// export default function Transactions({
//   transactions,
// }: TransactionProps) {
//   return (
//     <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 py-8 px-4">
//       <h1 className="font-semibold text-xl">
//         Transactions Log
//       </h1>
//       <p>All orders matching your request </p>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Order ID</TableHead>
//             <TableHead>Date / Time</TableHead>
//             <TableHead>Customer</TableHead>
//             <TableHead>Items</TableHead>
//             <TableHead>Payment</TableHead>
//             <TableHead>Total</TableHead>
//             <TableHead>Status</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {transactions.map((transaction) => {
//             const styles =
//               statusStyles[transaction.status];
//             const payStyles =
//               paymentMethods[
//                 transaction.paymentMethod
//               ];
//             return (
//               <TableRow key={transaction.id}>
//                 <TableCell className="font-semibold">
//                   {transaction.id}
//                 </TableCell>
//                 <TableCell>
//                   <p className="text-[14px] font-semibold">
//                     {transaction.timestamp}
//                   </p>
//                   <p className="text-[12px] text-gray-600">
//                     {transaction.date}
//                   </p>
//                 </TableCell>
//                 <TableCell className="font-semibold">
//                   {transaction.customer}
//                 </TableCell>
//                 <TableCell className="text-gray-600">
//                   {transaction.items.map(
//                     (item, index) => (
//                       <span key={index}>
//                         {item.name} x{" "}
//                         {item.quantity}
//                         {index <
//                         transaction.items.length -
//                           1
//                           ? ", "
//                           : ""}
//                       </span>
//                     ),
//                   )}
//                 </TableCell>
//                 <TableCell
//                   className={payStyles.cell}
//                 >
//                   <p
//                     className={`${payStyles.badge} w-20 px-1 py-0.5 flex items-center justify-center rounded-lg`}
//                   >
//                     {transaction.paymentMethod}
//                   </p>
//                 </TableCell>
//                 <TableCell className="font-bold">
//                   $ {transaction.amount}
//                 </TableCell>
//                 <TableCell
//                   className={styles.cell}
//                 >
//                   <p
//                     className={`${styles.badge} w-20 px-1 py-0.5 flex items-center justify-center rounded-lg`}
//                   >
//                     {transaction.status}
//                   </p>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
