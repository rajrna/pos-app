"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ProductTable from "@/components/product/ProductTable";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Products
        </h1>
        <div className="flex items-center gap-3">
          <Button
            // onClick={openCustomerModal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link href="/products/add">
              Add new products
            </Link>
          </Button>
        </div>
      </div>

      <ProductTable />
    </div>
  );
}
