import { columns } from "./top-customer-column";
import { TopCustomersProps } from "./top-customer-column";
import { DataTable } from "@/components/ui/data-table";

// type TopCustomer = {
//   rank: number;
//   name: string;
//   numVisits: number;
//   totalSpent: number;
//   loyaltyTier: LoyaltyTier;
//   loyaltyPoints: number;
// };

export default function TopCustomer({
  topCustomers,
}: TopCustomersProps) {
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

      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Visits</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Loyalty Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topCustomers.map((customer) => {
            const styles =
              tierStyles[customer.loyaltyTier];
            return (
              <TableRow key={customer.rank}>
                <TableCell className="text-gray-700">
                  {customer.rank}
                </TableCell>
                <TableCell className="font-semibold">
                  {customer.name}
                </TableCell>
                <TableCell>
                  {customer.numVisits}
                </TableCell>
                <TableCell className="font-semibold">
                  {customer.totalSpent}
                </TableCell>
                <TableCell>
                  <p
                    className={`w-12 flex items-center justify-center ${styles.badge} ${styles.cell}  rounded-lg px-1`}
                  >
                    {customer.loyaltyTier}
                  </p>
                </TableCell>
                <TableCell>
                  {customer.loyaltyPoints}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
    </div>
  );
}
