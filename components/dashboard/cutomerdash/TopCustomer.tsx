"use client";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { getTopCustomerColumns } from "./top-customer-column";
import { TopCustomersProps } from "./top-customer-column";
import { DataTable } from "@/components/ui/data-table";

export default function TopCustomer({
  topCustomers,
}: TopCustomersProps) {
  const { currency } = useCurrency();
  const columns = getTopCustomerColumns(currency);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-w-150">
      <h1 className="font-semibold text-[17px]">
        Top Customers & Loyalty Points
      </h1>
      <p className="text-gray-700">
        Highest value contributors this month
      </p>

      <DataTable
        columns={columns}
        data={topCustomers}
        searchColumn="customer"
        searchPlaceholder="Search customer..."
        pageSize={10}
        filters={[
          {
            columnId: "loyaltyTier",
            label: "Tier",
            options: [
              "Gold",
              "Silver",
              "Bronze",
              "None",
            ],
          },
        ]}
      />
    </div>
  );
}
