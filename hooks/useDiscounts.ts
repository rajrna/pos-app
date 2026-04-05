import {
  createDiscount,
  fetchDiscounts,
} from "@/services/apiDiscounts.client";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDiscounts = () => {
  return useQuery({
    queryKey: ["discount"],
    queryFn: fetchDiscounts,

    staleTime: 20 * 1000,
  });
};
export const useCreateDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discount"],
      });
      toast.success(
        "Discount created successfully",
      );
    },
  });
};
