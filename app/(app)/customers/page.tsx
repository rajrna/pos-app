"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import CustomerTable from "@/components/customer/CustomerTable";
import { UserPlus } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Customers
        </h1>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-2xl">
            <UserPlus />
            <Link href="/customers/add">
              Add a customer
            </Link>
          </Button>
        </div>
      </div>

      <CustomerTable />
    </div>
  );
}
