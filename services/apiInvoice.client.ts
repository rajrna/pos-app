// services/invoices/apiInvoices.client.ts
import { mapRawTicketToInvoice } from "@/lib/mappers/tickets";
import { Invoice } from "@/lib/types/invoice";
import { RawTicket } from "@/lib/types/ticket";
import { CreateTicketInput } from "@/lib/types/ticket";

// export async function fetchInvoicesClient(): Promise<
//   RawTicket[]
// > {
//   const res = await fetch("/api/invoices");
//   if (!res.ok)
//     throw new Error(
//       `Failed to fetch invoices: ${res.status}`,
//     );
//   const data = await res.json();
//   return data.data.tickets;
// }
export async function fetchInvoicesClient(): Promise<
  Invoice[]
> {
  const res = await fetch("/api/invoices");

  if (!res.ok) {
    throw new Error(
      `Failed to fetch invoices: ${res.status}`,
    );
  }

  const payload = await res.json();

  // 1. Extract the raw array (handling potential undefined with optional chaining)
  const rawTickets: RawTicket[] =
    payload?.data?.tickets || [];

  // 2. Map RawTicket[] to Invoice[] so your ColumnDef finds the right keys
  return rawTickets.map((ticket) =>
    mapRawTicketToInvoice(ticket),
  );
}
export async function createTicket(
  payload: CreateTicketInput,
): Promise<void> {
  const res = await fetch("/api/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error(
      `Failed to create ticket: ${res.status}`,
    );
}
