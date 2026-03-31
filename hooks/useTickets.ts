import { useMutation } from "@tanstack/react-query";
import { createTicket } from "@/services/apiTicket.client";
import toast from "react-hot-toast";

export function useCreateTicket() {
  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      toast.success(
        "Invoice saved successfully!",
      );
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
