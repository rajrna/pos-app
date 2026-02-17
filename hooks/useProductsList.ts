import { useQuery } from "@tanstack/react-query";

import { fetchProductsList } from "@/services/apiProduct";

export function useProductsList() {
  return useQuery({
    queryKey: ["products-list"],
    queryFn: fetchProductsList,
  });
}
