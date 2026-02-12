"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
} from "@/components/ui/table";

import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceRow from "./InvoiceRow";
import Pagination from "./Pagination";
import InvoiceFilterSecondary from "./InvoiceFilterSecondary";
import { useQuery } from "@tanstack/react-query";
import { fetchInvoices } from "@/services/apiInvoice";
const invoicePerPageValues = [10, 25, 50, 100];

export default function InvoiceTable() {
  const {
    isLoading,
    data: invoices = [],
    error,
  } = useQuery({
    queryKey: ["invoice"],
    queryFn: fetchInvoices,
  });

  return (
    <>
      <InvoiceFilterSecondary />

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <InvoiceTableHeader />
          <TableBody>
            {invoices.map((invoice) => (
              <InvoiceRow
                key={invoice.id}
                invoice={invoice}
              />
            ))}
            <InvoiceRow invoice={invoices} />
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Show:
          </span>
          <Select defaultValue="25">
            <SelectTrigger className="w-20 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">
                10
              </SelectItem>
              <SelectItem value="25">
                25
              </SelectItem>
              <SelectItem value="50">
                50
              </SelectItem>
              <SelectItem value="100">
                100
              </SelectItem>
              {/* {invoicePerPageValues.map((num) => (
                <SelectItem
                  key={num}
                  value={"num"}
                >
                  {num}
                </SelectItem>
              ))} */}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">
            per page
          </span>
        </div>
        <Pagination />
      </div>
    </>
  );
}
