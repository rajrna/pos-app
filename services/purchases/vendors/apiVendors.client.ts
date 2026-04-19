import { mockVendorData } from "@/components/bills/vendors/mock-vendor-data";
import { Vendor } from "@/components/bills/vendors/vendor-columns";

export async function fetchVendors(): Promise<
  Vendor[]
> {
  return mockVendorData;
}
