import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createTicket,
  updateTicket,
} from "@/services/apiTicket.client";
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

export function useUpdateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTicket,
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
      toast.success(
        "Invoice updated successfully!",
      );
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
