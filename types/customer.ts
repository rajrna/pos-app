export interface Customer {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  balance: number;
  overdue: number;
  savedCards?: number;
  createdAt: string;
  updatedAt: string;
}
