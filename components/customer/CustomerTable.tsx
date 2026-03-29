import { DataTable } from "../ui/data-table";
import {
  Customer,
  getCustomerColumns,
} from "./customer-columns";

export default function CustomerTable({
  customers,
}: {
  customers: Customer[];
}) {
  return (
    <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 py-8 px-4">
      <h1 className="font-semibold text-xl">
        Customers
      </h1>
      <p className="text-gray-400">
        All your customers
      </p>
      <DataTable
        columns={getCustomerColumns}
        data={customers}
        searchColumn="name"
        searchPlaceholder="Search customer"
      />
    </div>
  );
}
