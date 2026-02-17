import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchProducts,
  deleteProduct,
  createProduct,
} from "@/services/apiProduct";

export const productKeys = {
  all: ["products"] as const,
  lists: () =>
    [...productKeys.all, "list"] as const,
  list: (searchQuery?: string) =>
    [
      ...productKeys.lists(),
      // { searchQuery },
      searchQuery || "",
    ] as const,
  details: () =>
    [...productKeys.all, "detail"] as const,
  detail: (id: string) =>
    [...productKeys.details(), id] as const,
};

export function useProducts(
  searchQuery?: string,
) {
  return useQuery({
    queryKey: productKeys.list(searchQuery),
    queryFn: () => fetchProducts(searchQuery),
    staleTime: 60 * 1000,
  });
}

//implement looking up detail of product later

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
}
