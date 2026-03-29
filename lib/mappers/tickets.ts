import { Invoice } from "../types/invoice";
import { RawTicket } from "../types/ticket";

export function mapRawTicketToInvoice(
  raw: RawTicket,
): Invoice {
  return {
    invoice_id: raw.ticketName,
    customer_name: raw.customerEmail || "Guest",
    amount: Number(raw.grandTotal) || 0, // Fixes the NaN issue
    created_at:
      raw.createdAt || new Date().toISOString(),
    status: raw.paidStatus || "pending",
  };
}
