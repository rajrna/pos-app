import { Transaction } from "@/components/dashboard/orderhistory/transaction-columns";
import { mapDetailBillToTransaction } from "@/lib/mappers/transaction";
import { RawBillDetailResponse } from "@/lib/types/bill";

// const BASE = "https://appapi.rebuzzpos.com/api";

export async function getTransactionDetail(
  invoiceNo: number,
): Promise<Transaction> {
  // Calls your own Next.js route handler which reads the httpOnly cookie server-side
  const res = await fetch(
    `/api/transactions/${invoiceNo}`,
    {
      method: "GET",
    },
  );
  if (!res.ok)
    throw new Error(
      `Failed to fetch transaction detail: ${res.status}`,
    );
  const data: RawBillDetailResponse =
    await res.json();
  // console.log("detail response:", data);
  return mapDetailBillToTransaction(data);
}
