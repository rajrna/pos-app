import { useQuery } from "@tanstack/react-query";
import { fetchCustomersList } from "@/services/apiCustomer";

export function useCustomersList() {
  return useQuery({
    queryKey: ["customers-list"],
    queryFn: fetchCustomersList,
  });
}
