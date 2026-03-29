import { Transaction } from "@/components/dashboard/orderhistory/transaction-columns";
// import { mockTransactions } from "@/components/dashboard/orderhistory/mock-transactions";
import { authHeaders } from "../auth/login/session";
import { RawBillListResponse } from "@/lib/types/bill";
import { mapBillsToTransactions } from "@/lib/mappers/transaction";
// import { mapBillsToTransactions } from "@/lib/mappers/transaction";

// const BASE = "https://appapi.rebuzzpos.com/api";
const BASE = "https://api.beta.rebuzzpos.com/api";

export async function getTransactions(): Promise<
  Transaction[]
> {
  const res = await fetch(
    `${BASE}/business/ticket/bills?limit=10`,
    {
      headers: await authHeaders(),
    },
  );

  if (!res.ok)
    throw new Error(
      `Failed to fetch transactions: ${res.status}`,
    );

  const data: RawBillListResponse =
    await res.json();
  return mapBillsToTransactions(data);
  // return mockTransactions;
}
