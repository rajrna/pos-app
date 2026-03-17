import { getTransactions } from "@/services/dashboard/apiTransaction";
import Transactions from "@/components/dashboard/orderhistory/Transactions";

export default async function Page() {
  const [transactions] = await Promise.all([
    getTransactions(),
  ]);
  return (
    <div className="p-4">
      <div>
        <h1 className="text-3xl font-bold">
          Order History
        </h1>
        <p className="text-gray-600">
          Browse and search all transactions
        </p>
      </div>
      <div className="flex flex-wrap">
        <div></div>
      </div>
      <Transactions transactions={transactions} />
    </div>
  );
}
