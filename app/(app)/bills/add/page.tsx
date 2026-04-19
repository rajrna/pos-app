"use client";

import { Vendor } from "@/components/bills/vendors/vendor-columns";
import VendorSelector from "@/components/bills/VendorSelector";
import { Button } from "@/components/ui/button";
import { BillItem } from "@/lib/types/expenses";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEFAULT_ITEM: Omit<BillItem, "id"> = {
  productId: "",
  name: "",
  quantity: 1,
  price: 0,
};
export default function Page() {
  const router = useRouter();

  const [selectedVendor, setSelectedVendor] =
    useState<Vendor | null>(null);
  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="md:text-4xl text-3xl font-bold text-gray-900">
          New Bill
        </h1>
        <div className="flex items-center gap-3">
          <Button
            // onClick={handleSave}
            // disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 z-100 rounded-2xl"
          >
            Save and Continue
            {/* {isPending
              ? "Saving..."
              : "Save and Continue"} */}
          </Button>
        </div>
      </div>

      <div className="my-5 border-gray-300 border shadow-lg rounded-lg">
        <div className="flex justify-between">
          <VendorSelector
            value={selectedVendor}
            onVendorSelect={(vendor) => {
              setSelectedVendor(vendor);
            }}
          />
        </div>
      </div>
    </div>
  );
}
