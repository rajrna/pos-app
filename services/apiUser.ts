import supabase from "./supabase";

export async function fetchCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*");
  console.log(data);
  if (error) {
    throw new Error(
      "Customers could not be loaded",
    );
  }

  return data;
}
