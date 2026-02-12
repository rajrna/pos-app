import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type { Customer } from "@/types/customer";

import {
  fetchCustomers,
  createCustomer,
  deleteCustomer,
} from "@/services/apiCustomer";

export const customerKeys = {
  all: ["customers"] as const,
  lists: () =>
    [...customerKeys.all, "list"] as const,
  list: (searchQuery?: string) =>
    [
      ...customerKeys.lists(),
      { searchQuery },
    ] as const,
  details: () =>
    [...customerKeys.all, "detail"] as const,
  detail: (id: string) =>
    [...customerKeys.details(), id] as const,
};
// Queries
// export function useCustomers(
//   searchQuery?: string,
// ) {
//   return useQuery({
//     queryKey: customerKeys.list(searchQuery),
//     queryFn: () => fetchCustomers(searchQuery),
//     staleTime: 30 * 1000, // 30 seconds
//   });
// }

// export function useCustomer(id: string) {
//   return useQuery({
//     queryKey: customerKeys.detail(id),
//     queryFn: () => fetchCustomerById(id),
//     enabled: !!id,
//   });
// }

// Mutations
export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      // Invalidate and refetch customer list
      queryClient.invalidateQueries({
        queryKey: customerKeys.lists(),
      });
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: customerKeys.lists(),
      });
    },
  });
}
