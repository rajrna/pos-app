import { Transaction } from "@/components/dashboard/orderhistory/transaction-columns";
import { mockTransactions } from "@/components/dashboard/orderhistory/mock-transactions";
import { authHeaders } from "../auth/login/session";
import {
  RawBillDetailResponse,
  RawBillListResponse,
} from "@/lib/types/bill";
import {
  mapBillsToTransactions,
  mapDetailBillToTransaction,
} from "@/lib/mappers/Transaction";

const BASE = "https://appapi.rebuzzpos.com/api";

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

export async function getTransactionDetail(
  invoiceNo: number,
): Promise<Transaction> {
  const res = await fetch(
    `${BASE}/business/ticket/${invoiceNo}/bill`,
    {
      headers: await authHeaders(),
    },
  );

  if (!res.ok)
    throw new Error(
      `Failed to fetch transaction detail: ${res.status}`,
    );

  const data: RawBillDetailResponse =
    await res.json();
  return mapDetailBillToTransaction(data);
}
