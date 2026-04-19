import BillHeader from "@/components/bills/BillHeader";
import BillTable from "@/components/bills/BillTable";
import { fetchBills } from "@/services/purchases/bills/apiBill.client";

export default async function Page() {
  const [bills] = await Promise.all([
    fetchBills(),
  ]);
  return (
    <div className="min-h-screen p-8">
      <BillHeader />
      <BillTable bills={bills} />
    </div>
  );
}
