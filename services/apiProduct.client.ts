import {
  mapRawProductToProduct,
  Product,
} from "@/lib/types/product";

export async function fetchProductsListClient(): Promise<
  Product[]
> {
  const res = await fetch("/api/products");

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({}));
    throw new Error(
      errorData.message ||
        "Failed to fetch products",
    );
  }
  const payload = await res.json();

  const rawProducts =
    payload?.data?.products || [];
  return rawProducts.map(mapRawProductToProduct);
}

export async function createProduct(
  productData: any,
): Promise<Product> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok)
    throw new Error("Failed to create product");

  const result = await res.json();
  return mapRawProductToProduct(
    result.data.products,
  );
}
