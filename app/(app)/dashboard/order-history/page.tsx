import { getTransactions } from "@/services/dashboard/apiTransaction";
import Transactions from "@/components/dashboard/orderhistory/Transactions";

export default async function Page() {
  const [transactions] = await Promise.all([
    getTransactions(),
  ]);
  return (
    <div className="p-4">
      <div className="py-2 min-w-0 border-b-2">
        <h1 className="text-[16px] md:text-xl font-bold truncate">
          Order History
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
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
