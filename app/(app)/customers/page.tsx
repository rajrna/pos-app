"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

import CustomerTable from "@/components/customer/CustomerTable";

export default function Page() {
  const [searchQuery, setSearchQuery] =
    useState("");
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Customers
        </h1>
        <div className="flex items-center gap-3">
          <Button
            // onClick={openCustomerModal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add a customer
          </Button>
        </div>
      </div>
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
            {/* {total} */}0
          </Badge>
          <span className="text-gray-600">
            {/* {total === 1
              ? "customer found"
              : "customers found"} */}
          </span>
        </div>
      </div>
      <CustomerTable />
    </div>
  );
}
