import { Product } from "./product";

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

export interface CreateInvoiceInput {
  customer_id: string;
  invoice_number: string;
  po_number?: string;
  invoice_date: string;
  items: {
    product_id: string;
    name: string;
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
    tax_rate?: string;
  }[];
  discount_description?: string;
  discount_value?: number;
  discount_type?: "fixed" | "percentage";
  subtotal: number;
  total: number;
  currency: string;
  notes?: string;
  status?: string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}
export interface Discount {
  id: string;
  description: string;
  value: number;
  type: "fixed" | "percentage";
}

export interface InvoiceItemsSelectorProps {
  products: Product[];
  items: InvoiceItem[];
  onItemsChange: (items: InvoiceItem[]) => void;
}
