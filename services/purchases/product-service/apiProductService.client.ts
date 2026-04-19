import { mockProductService } from "@/components/bills/products-services/mock-product-services";
import { ProductService } from "@/components/bills/products-services/productservice-columns";

export async function fetchProductService(): Promise<
  ProductService[]
> {
  return mockProductService;
}
