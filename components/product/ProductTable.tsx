import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ChevronDown,
  Search,
} from "lucide-react";

import ProductRow from "./ProductRow";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

import { fetchProducts } from "@/services/apiProduct";
import { customerKeys } from "@/hooks/useCustomers";

export default function ProductTable() {
  const [searchQuery, setSearchQuery] =
    useState("");
  const [debouncedQuery, setDebouncedQuery] =
    useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { isLoading, data, error } = useQuery({
    queryKey: customerKeys.list(debouncedQuery),
    queryFn: () => fetchProducts(debouncedQuery),
  });

  const products = data?.products || [];
  const total = data?.total || 0;

  if (isLoading)
    return (
      <div className="text-center py-12 text-gray-500">
        Loading products...
      </div>
    );

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="pl-10 bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-full bg-blue-50 text-blue-700 border-blue-200 px-3 py-1.5 text-base font-normal"
          >
            {total}
          </Badge>
          <span className="text-gray-600">
            {total === 1
              ? "products found"
              : "products found"}
          </span>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-white border-b">
            <TableHead>Product</TableHead>
            <TableHead className="font-semibold text-gray-900">
              <div className="flex items-center gap-1">
                Name
                <ChevronDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-gray-900">
              Category
            </TableHead>
            <TableHead className="font-semibold text-gray-900">
              Price
            </TableHead>
            {/* <TableHead className="font-semibold text-gray-900">
              <div className="flex items-center gap-1">
                Saved cards
                
              </div>
            </TableHead> */}
            {/* <TableHead className="font-semibold text-gray-900">
              Balance | Overdue
            </TableHead> */}
            {/* <TableHead className="w-12"></TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
