// store/invoiceStore.ts
import { create } from "zustand";
import { Invoice } from "@/types/invoice";

interface Filters {
  status: string;
  dateRange: string;
  searchTerm: string;
}

interface InvoiceStore {
  invoices: Invoice[];
  filters: Filters;
  setInvoices: (invoices: Invoice[]) => void;
  setFilters: (filters: Filters) => void;
  updateFilter: (
    key: keyof Filters,
    value: string,
  ) => void;
  getFilteredInvoices: () => Invoice[];
}

export const useInvoiceStore =
  create<InvoiceStore>((set, get) => ({
    invoices: [],
    filters: {
      status: "all",
      dateRange: "all",
      searchTerm: "",
    },

    setInvoices: (invoices) => set({ invoices }),

    setFilters: (filters) => set({ filters }),

    updateFilter: (key, value) =>
      set((state) => ({
        filters: {
          ...state.filters,
          [key]: value,
        },
      })),

    getFilteredInvoices: () => {
      const { invoices, filters } = get();

      return invoices.filter((invoice) => {
        // Status filter
        if (
          filters.status !== "all" &&
          invoice.status !== filters.status
        ) {
          return false;
        }

        // Date range filter
        if (filters.dateRange === "today") {
          const isToday = (
            dateString: string,
          ) => {
            const date = new Date(dateString);
            const today = new Date();
            return (
              date.toDateString() ===
              today.toDateString()
            );
          };
          if (!isToday(invoice.created_at))
            return false;
        }

        // Search filter
        if (
          filters.searchTerm &&
          !invoice.customer_name
            ?.toLowerCase()
            .includes(
              filters.searchTerm.toLowerCase(),
            )
        ) {
          return false;
        }

        return true;
      });
    },
  }));
