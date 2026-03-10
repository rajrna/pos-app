import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type LoyaltyTier =
  | "Gold"
  | "Silver"
  | "Bronze"
  | "None";

type TopCustomer = {
  rank: number;
  name: string;
  numVisits: number;
  totalSpent: number;
  loyaltyTier: LoyaltyTier;
  loyaltyPoints: number;
};

type TopCustomersProps = {
  topCustomers: TopCustomer[];
};

const tierStyles: Record<
  LoyaltyTier,
  { cell: string; badge: string }
> = {
  Gold: {
    cell: "text-yellow-800",
    badge: "bg-yellow-200",
  },
  Silver: {
    cell: "text-silver-800",
    badge: "bg-silver-200",
  },
  Bronze: {
    cell: "text-brown-800",
    badge: "bg-brown-200",
  },
  None: {
    cell: "text-gray-800",
    badge: "bg-gray-200",
  },
};
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

      <Table>
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
                    className={`w-12 flex items-center justify-center ${styles.badge} ${styles.cell}  text-yellow-900 rounded-lg px-1`}
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
      </Table>
    </div>
  );
}
