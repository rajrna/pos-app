// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";

// import type {
//   Customer,
//   CreateCustomerInput,
// } from "@/types/customer";

// import { fetchCustomers } from "@/services/apiUser";

// // Queries
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
