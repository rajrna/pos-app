import { useQuery } from "@tanstack/react-query";
import { fetchProductsListClient } from "@/services/apiProduct.client";

export function useProductsList() {
  return useQuery({
    queryKey: ["products-list"],
    queryFn: fetchProductsListClient,
  });
}

export function useProductNames() {
  return useQuery({
    queryKey: ["products-list"],
    queryFn: fetchProductsListClient,
  });
}
