import { Transaction } from "@/components/dashboard/orderhistory/transaction-columns";
import { mockTransactions } from "@/components/dashboard/orderhistory/mock-transactions";

export async function getTransactions(): Promise<
  Transaction[]
> {
  return mockTransactions;
}
