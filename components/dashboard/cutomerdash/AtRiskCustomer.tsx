import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TriangleAlert } from "lucide-react";

type SpendingLevel = "High" | "Medium" | "Low";

type AtRiskCustomer = {
  rank: number;
  name: string;
  lastVisit: number;
  spendLevel: SpendingLevel;
};

type AtRiskCustomersProps = {
  riskCustomers: AtRiskCustomer[];
};

const spendLevelStyles: Record<
  SpendingLevel,
  { cell: string; badge: string }
> = {
  High: {
    cell: "text-yellow-800",
    badge: "bg-yellow-200",
  },
  Medium: {
    cell: "text-blue-800",
    badge: "bg-blue-200",
  },
  Low: {
    cell: "text-gray-800",
    badge: "bg-gray-200",
  },
};

export default function AtRiskCustomer({
  riskCustomers,
}: AtRiskCustomersProps) {
  const numCustomers = riskCustomers.length;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-w-150">
      <h1 className="font-semibold">
        At-Risk Customers
      </h1>
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Inactive customers who need
          re-engagement
        </p>
        <div className="text-yellow-600 border-yellow-500 border bg-yellow-100 flex rounded-2xl px-1 gap-1">
          <TriangleAlert
            size={12}
            className="mt-0.5"
          />
          <p className="text-[12px] font-semibold">
            {numCustomers} at risk
          </p>
        </div>
      </div>

      <Table>
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
            return (
              <TableRow key={customer.rank}>
                <TableCell className="font-semibold">
                  {customer.name}
                </TableCell>
                <TableCell>
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
                  <Button className="bg-gray-50 text-blue-600 border-blue-500 border">
                    Send Offer
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
