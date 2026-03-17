import { TriangleAlert } from "lucide-react";

import { columns } from "./atrisk-customer-column";
import { DataTable } from "@/components/ui/data-table";

type SpendingLevel = "High" | "Medium" | "Low";

export type AtRiskCustomer = {
  rank: number;
  name: string;
  lastVisit: number;
  spendLevel: SpendingLevel;
};

type AtRiskCustomersProps = {
  riskCustomers: AtRiskCustomer[];
};

export default function AtRiskCustomer({
  riskCustomers,
}: AtRiskCustomersProps) {
  const numCustomers = riskCustomers.length;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 w-full">
      <h1 className="font-semibold text-[17px]">
        At-Risk Customers
      </h1>
      <div className="flex items-center justify-between">
        <p className="text-gray-700">
          Inactive customers who need
          re-engagement
        </p>
        <div className="text-yellow-600 border-yellow-500 border bg-yellow-100 flex rounded-2xl md:px-1  gap-1">
          <TriangleAlert
            size={12}
            className="mt-0.5"
          />
          <p className="md:text-[12px] text-[9px] font-semibold">
            {numCustomers} at risk
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={riskCustomers}
        searchColumn="name"
        searchPlaceholder="Search customer..."
        pageSize={10}
        filters={[
          {
            columnId: "spendLevel",
            label: "Spending Level",
            options: ["High", "Medium", "Low"],
          },
        ]}
      />

      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Alert Reason</TableHead>
            <TableHead>Spend Level</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riskCustomers.map((customer) => {
            const styles =
              spendLevelStyles[
                customer.spendLevel
              ];

            const { text } =
              getDaysColorCustomers(
                customer.lastVisit,
              );
            return (
              <TableRow key={customer.rank}>
                <TableCell className="font-semibold">
                  {customer.name}
                </TableCell>
                <TableCell
                  className={`font-semibold ${text}`}
                >
                  {customer.lastVisit} days ago
                </TableCell>
                <TableCell>
                  <p className="border text-sm text-gray-600 border-gray-500 p-1 rounded-2xl w-40 flex items-center justify-center">
                    Needs to be worked
                  </p>
                </TableCell>
                <TableCell>
                  <p
                    className={`w-15 flex items-center justify-center ${styles.badge} ${styles.cell} rounded-lg px-1`}
                  >
                    {customer.spendLevel}
                  </p>
                </TableCell>
                <TableCell>
                  <Button className="bg-gray-50 text-blue-600 hover:bg-blue-600 hover:text-gray-100 border-blue-500 border">
                    Send Offer
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
    </div>
  );
}
