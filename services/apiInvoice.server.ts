import { authHeaders } from "@/services/auth/login/session";
import {
  RawTicketListResponse,
  RawTicket,
} from "@/lib/types/ticket";

const BASE = "https://api.beta.rebuzzpos.com/api";

export async function fetchInvoices(): Promise<
  RawTicket[]
> {
  const res = await fetch(
    `${BASE}/business/ticket/unarchived`,
    {
      headers: await authHeaders(),
    },
  );

  if (!res.ok)
    throw new Error(
      `Failed to fetch invoices: ${res.status}`,
    );

  const data: RawTicketListResponse =
    await res.json();
  return data.data.tickets;
}
