export type Bill = {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
  status: string;
};

export type BillStatus =
  | "completed"
  | "pending"
  | "failed"
  | "refunded";

export const statusStyles: Record<
  BillStatus,
  { cell: string; badge: string }
> = {
  completed: {
    cell: "text-green-800",
    badge: "bg-green-300",
  },
  pending: {
    cell: "text-yellow-800",
    badge: "bg-yellow-200",
  },
  failed: {
    cell: "text-red-800",
    badge: "bg-red-300",
  },
  refunded: {
    cell: "text-gray-800",
    badge: "bg-gray-300",
  },
};
