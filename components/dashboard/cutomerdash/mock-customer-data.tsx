import { CustomerApiResponse } from "@/lib/dashboardstats";
import { TopCustomer } from "./top-customer-column";
import { AtRiskCustomer } from "./AtRiskCustomer";

export const mockCustomerStats: CustomerApiResponse =
  {
    totalMembers: { value: "50" },
    activeCustomers: { value: "100" },
    pointsRedeemed: { value: "5000" },
    pointsPerMember: { value: "120" },
  };

export const mockTopCustomers: TopCustomer[] = [
  {
    rank: 1,
    customer: "Lenny",
    numVisits: 11,
    totalSpent: 60,
    loyaltyTier: "Gold",
    loyaltyPoints: 60,
  },
  {
    rank: 2,
    customer: "Sadie Adler",
    numVisits: 10,
    totalSpent: 50,
    loyaltyTier: "Gold",
    loyaltyPoints: 50,
  },
  {
    rank: 3,
    customer: "Uncle",
    numVisits: 5,
    totalSpent: 30,
    loyaltyTier: "Silver",
    loyaltyPoints: 30,
  },
];

export const mockAtRiskCustomers: AtRiskCustomer[] =
  [
    {
      rank: 1,
      name: "Mary Linton",
      lastVisit: 15,
      spendLevel: "High",
    },
    {
      rank: 2,
      name: "Strauss",
      lastVisit: 2,
      spendLevel: "Medium",
    },
  ];
