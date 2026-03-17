"use client";

import { useCurrency } from "@/lib/context/CurrencyContext";

import { DataTable } from "@/components/ui/data-table";

import {
  getProfitPerProductColumns,
  Product,
} from "./profit-per-product-column";

export default function ProfitPerProduct({
  products,
}: {
  products: Product[];
}) {
  const { currency } = useCurrency();
  const columns =
    getProfitPerProductColumns(currency);
  return (
    <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 py-8 px-4">
      <h1 className="font-semibold text-xl">
        Profit per Product
      </h1>
      <p className="text-gray-500">
        Revenue, cost and margins for top selling
        products .
      </p>

      <DataTable
        columns={columns}
        data={products}
        searchColumn="name"
        searchPlaceholder="Search products..."
        pageSize={5}
      />
    </div>
  );
}
