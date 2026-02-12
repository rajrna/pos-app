import supabase from "./supabase";

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");
  console.log(data);
  if (error) {
    throw new Error(
      "Products could not be loaded",
    );
  }

  return data;
}
