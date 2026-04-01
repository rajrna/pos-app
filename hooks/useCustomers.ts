import { useQuery } from "@tanstack/react-query";

import { fetchCustomersClient } from "@/services/apiCustomer.client";

export const customerKeys = {
  all: ["customers"] as const,
  lists: () =>
    [...customerKeys.all, "list"] as const,
  list: (searchQuery?: string) =>
    [
      ...customerKeys.lists(),

      searchQuery || "",
    ] as const,
  details: () =>
    [...customerKeys.all, "detail"] as const,
  detail: (id: string) =>
    [...customerKeys.details(), id] as const,
};

// Queries
export function useCustomers(
  searchQuery?: string,
) {
  return useQuery({
    queryKey: customerKeys.list(searchQuery),
    queryFn: () => fetchCustomersClient(),
    staleTime: 10 * 1000, // 30 seconds
  });
}
