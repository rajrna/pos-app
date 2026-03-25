import { getTransactions } from "@/services/dashboard/apiTransactionServer";
import Transactions from "@/components/dashboard/orderhistory/Transactions";
import SampleDataBadge from "@/components/ui/sampledatabadge";
import { mockTransactions } from "@/components/dashboard/orderhistory/mock-transactions";

export default async function Page() {
  const [transactions] = await Promise.all([
    getTransactions(),
  ]);
  const isEmpty =
    !transactions || transactions.length === 0;
  const displayData = isEmpty
    ? mockTransactions
    : transactions;
  return (
    <div className="p-4">
      <div className="py-2 min-w-0 border-b-2">
        {isEmpty && <SampleDataBadge />}
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
      {isEmpty ? (
        <Transactions
          transactions={displayData}
        />
      ) : (
        <Transactions
          transactions={transactions}
        />
      )}
    </div>
  );
}
