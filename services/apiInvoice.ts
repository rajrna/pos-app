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
