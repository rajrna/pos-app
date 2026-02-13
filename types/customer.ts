export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  balance: number;
  overdue: number;
  savedCards?: string | number;
  createdAt: string;
  updatedAt: string;
}
export interface CreateCustomerInput {
  name: string;
  email?: string;
  phone?: string;
}
