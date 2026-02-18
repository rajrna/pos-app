import { createInvoice } from "@/services/apiInvoice";
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
    mutationFn: createInvoice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
      toast.success(
        "Invoice created successfully!",
      );

      router.push(`/invoices/${data.invoice_id}`);
    },
    onError: (error: Error) => {
      toast.error(
        `Failed to create invoice: ${error.message}`,
      );
    },
  });
}
