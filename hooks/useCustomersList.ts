import { useQuery } from "@tanstack/react-query";
import { fetchCustomersClient } from "@/services/apiCustomer.client";

export function useCustomersList() {
  return useQuery({
    queryKey: ["customers-list"],
    queryFn: fetchCustomersClient,
  });
}
export function useCustomerNames() {
  return useQuery({
    queryKey: ["customers-list"],
    queryFn: fetchCustomersClient,
  });
}
