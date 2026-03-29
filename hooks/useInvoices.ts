import { CreateTicketInput } from "@/lib/types/ticket";
import { createTicket } from "@/services/apiInvoice.client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateTicketInput) =>
      createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
      toast.success(
        "Invoice created successfully!",
      );
      router.push("/invoices"); // update path as needed
    },
    onError: (error: Error) => {
      toast.error(
        `Failed to create invoice: ${error.message}`,
      );
    },
  });
}
