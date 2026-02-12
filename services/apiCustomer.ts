import {
  Customer,
  CreateCustomerInput,
} from "@/types/customer";
import supabase from "./supabase";

function transformCustomer(row: any): Customer {
  return {
    id: row.id,
    name: row.name,
    firstName: row.first_name || undefined,
    lastName: row.last_name || undefined,
    email: row.email || undefined,
    phone: row.phone || undefined,
    balance: parseFloat(row.balance) || 0,
    overdue: parseFloat(row.overdue) || 0,
    savedCards: row.saved_cards || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

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

export async function deleteCustomer(id) {
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
  const { data, error } = await supabase
    .from("customers")
    .insert([
      {
        name: input.name,
        first_name: input.firstName || null,
        last_name: input.lastName || null,
        email: input.email || null,
        phone: input.phone || null,
        balance: 0,
        overdue: 0,
        saved_cards: 0,
      },
    ])
    .select();
  if (error) {
    throw new Error("Failed to create customer");
  }
  return transformCustomer(data);
}
