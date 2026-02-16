export interface Invoice {
  invoice_id: string;
  amount: number;
  status: string;
  created_at: string;
  customer_name: string;
}

export interface InvoiceStatsProps {
  invoices: Invoice[];
}
export interface InvoiceTableProps {
  invoices: Invoice[];
}
export interface InvoiceRowProps {
  invoice: Invoice;
}
