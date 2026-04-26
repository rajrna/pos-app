import Link from "next/link";

import { Button } from "@/components/ui/button";
import ProductTable from "@/components/product/ProductTable";
import { PackagePlus } from "lucide-react";
// import { fetchProducts } from "@/services/apiProduct.server";
import { fetchProducts } from "@/services/product/apiProduct.server";
export default async function Page() {
  const [products] = await Promise.all([
    fetchProducts(),
  ]);
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="md:text-4xl text-3xl font-bold text-gray-900">
          Products
        </h1>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-2xl">
            <PackagePlus />
            <Link href="/products/add">
              Add new product
            </Link>
          </Button>
        </div>
      </div>

      <ProductTable products={products} />
    </div>
  );
}
