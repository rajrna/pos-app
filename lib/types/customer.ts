export type RawCustomer = {
  _id: string;
  name: string;
  email: string | null;
  phone: string;
  countryCode?: string;
  loyaltyPoint: number;
  numberOfPurchases?: number;
  totalDueAmount?: number;
  isDeactivated?: boolean;
  note?: string | null;
};
export type RawCustomerListResponse = {
  status: string;
  data: {
    users: RawCustomer[];
  };
};

export type Customer = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  totalDueAmount?: number;
  loyaltyPoint: number;
};

export interface IndividualCustomer {
  name: string;
  phone: string;
  email: string | null;
  totalDueAmount?: number;
  loyaltyPoint: number;
}

export function mapRawCustomerToCustomer(
  raw: RawCustomer,
): Customer {
  return {
    id: raw._id,
    name: raw.name,
    email: raw.email,
    phone: raw.phone,
    totalDueAmount: raw.totalDueAmount,
    loyaltyPoint: raw.loyaltyPoint,
  };
}

export interface CreateCustomerInput {
  name: string;
  email?: string;
  phone?: string;
}

export interface CustomerTableProps {
  customers: Customer[];
}

export interface CustomerRowProps {
  customer: Customer;
}
