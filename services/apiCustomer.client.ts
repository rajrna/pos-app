import {
  Customer,
  mapRawCustomerToCustomer,
} from "@/lib/types/customer";

export async function fetchCustomersClient(): Promise<
  Customer[]
> {
  const res = await fetch("/api/customers");

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({}));
    throw new Error(
      errorData.message ||
        "Failed to fetch customers",
    );
  }

  const payload = await res.json();

  const rawUsers = payload?.data?.users || [];
  return rawUsers.map(mapRawCustomerToCustomer);
}
