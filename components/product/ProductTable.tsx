"use client";
import { DataTable } from "../ui/data-table";
import { getProductColumns } from "./product-column";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { Product } from "@/lib/types/product";

export default function ProductTable({
  products,
}: {
  products: Product[];
}) {
  console.log(products);
  const { currency } = useCurrency();
  const columns = getProductColumns(currency);

  return (
    <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 py-8 px-4">
      <h1 className="font-semibold text-xl">
        Products
      </h1>
      <p className="text-gray-400">
        All your products
      </p>
      <DataTable
        columns={columns}
        data={products}
        searchColumn="name"
        searchPlaceholder="Search product"
      />
    </div>
  );
}
