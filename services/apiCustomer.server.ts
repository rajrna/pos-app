import { authHeaders } from "./auth/login/session";
import {
  Customer,
  mapRawCustomerToCustomer,
  RawCustomer,
  RawCustomerListResponse,
} from "@/lib/types/customer";

const BASE = "https://api.beta.rebuzzpos.com/api";

export async function fetchCustomers(): Promise<
  Customer[]
> {
  const res = await fetch(
    `${BASE}/business/users/roles/user`,
    {
      headers: await authHeaders(),
    },
  );

  if (!res.ok)
    throw new Error(
      `Failed to fetch customers: ${res.status}`,
    );

  const data: RawCustomerListResponse =
    await res.json();
  // return mapRawCustomerToCustomer(data);
  // console.log(
  //   "API Response:",
  //   JSON.stringify(data, null, 2),
  // );
  return data.data.users.map((rawItem) =>
    mapRawCustomerToCustomer(rawItem),
  );
}
