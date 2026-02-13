import supabase from "./supabase";
import {
  Customer,
  CreateCustomerInput,
} from "@/types/customer";

function transformCustomer(row: any): Customer {
  return {
    id: row.id,
    name: row.name,
    // firstName: row.first_name || undefined,
    // lastName: row.last_name || undefined,
    email: row.email || undefined,
    phone: row.phone || undefined,
    balance: parseFloat(row.balance) || 0,
    overdue: parseFloat(row.overdue) || 0,
    savedCards: row.saved_cards || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function fetchAllCustomers() {
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

export async function fetchCustomers(
  searchQuery?: string,
): Promise<{
  customers: Customer[];
  total: number;
}> {
  try {
    let query = supabase
      .from("customers")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (searchQuery && searchQuery.trim()) {
      query = query.or(
        `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`,
      );
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(
        "Customer could not be loaded",
      );
    }
    return {
      customers: data
        ? data.map(transformCustomer)
        : [],
      total: count || 0,
    };
  } catch (error) {
    console.log(
      "Error fetching customers",
      error,
    );
    throw error;
  }
}

export async function deleteCustomer(id: string) {
  const { data, error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);
  if (error) {
    throw new Error("Couldn't be deleted");
  }
  return data;
}

export async function createCustomer(
  input: CreateCustomerInput,
): Promise<Customer> {
  try {
    const { data, error } = await supabase
      .from("customers")
      .insert([
        {
          name: input.name,
          email: input.email || null,
          phone: input.phone || null,
          balance: 0,
          overdue: 0,
          // saved_cards: 0,
        },
      ])
      .select()
      .single();
    if (error) {
      console.error("Supabase error:", error);
      throw new Error(
        "Failed to create customer" +
          error.message,
      );
    }
    return transformCustomer(data);
  } catch (error) {
    console.error(
      "Error creating customer:",
      error,
    );
    throw error;
  }
}
