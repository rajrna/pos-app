import { CreateInvoiceInput } from "@/types/invoice";
import supabase from "./supabase";

export async function fetchInvoices() {
  const { data, error } = await supabase
    .from("invoices")
    .select("*");
  console.log(data);
  if (error) {
    throw new Error(
      "Invoices couldn't be loaded.",
    );
  }

  return data;
}

export async function createInvoice(
  data: CreateInvoiceInput,
) {
  try {
    const { data: invoice, error: invoiceError } =
      await supabase
        .from("invoices")
        .insert({
          customer_id: data.customer_id,
          invoice_number: data.invoice_number,
          po_number: data.po_number,
          invoice_date: data.invoice_date,
          subtotal: data.subtotal,
          discount_description:
            data.discount_description,
          discount_value: data.discount_value,
          discount_type: data.discount_type,
          total: data.total,
          currency: data.currency,
          notes: data.notes,
          status: data.status || "Draft",
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (invoiceError) throw invoiceError;

    const itemsToInsert = data.items.map(
      (item) => ({
        invoice_id: invoice.invoice_id,
        product_id: item.product_id,
        product_name: item.name,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total: item.total,
        tax_rate: item.tax_rate,
      }),
    );

    const { error: itemsError } = await supabase
      .from("invoice_items")
      .insert(itemsToInsert);

    if (itemsError) {
      await supabase
        .from("invoices")
        .delete()
        .eq("invoice_id", invoice.invoice_id);
      throw itemsError;
    }
    return invoice;
  } catch (error) {
    console.error(
      "Error creating invoice:",
      error,
    );
    throw error;
  }
}
