import { BillView } from "@/lib/types/expenses";

export const mockBillData: BillView[] = [
  {
    id: "1",
    bill_no: 1,
    vendor_name: "John's Shop",
    subtotal: 50,
    created_at: "2026-04-23",
    due_date: "2026-04-27",
    status: "Unpaid",
  },
];
