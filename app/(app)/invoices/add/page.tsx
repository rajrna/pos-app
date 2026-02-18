"use client";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/pop-calendar";
import {
  Table,
  TableBody,
} from "@/components/ui/table";

import CustomerSelector from "@/components/invoice/CustomerSelector";
import InvoiceDiscount from "@/components/invoice/InvoiceDiscount";
import InvoiceItemsSelector from "@/components/invoice/InvoiceItemsSelector";
import AddInvoiceHeader from "@/components/invoice/AddInvoiceHeader";

import { useCustomersList } from "@/hooks/useCustomersList";
import { useCreateInvoice } from "@/hooks/useInvoices";
import { useProductsList } from "@/hooks/useProductsList";

import { CreateInvoiceInput } from "@/types/invoice";
import { InvoiceItem } from "@/types/invoice";
import { Discount } from "@/types/invoice";

const DEFAULT_ITEM: Omit<InvoiceItem, "id"> = {
  productId: "",
  name: "",
  description: "",
  quantity: 1,
  price: 0,
};

export default function Page() {
  const {
    data: customers = [],
    isLoading: loadingCustomers,
  } = useCustomersList();
  const {
    data: products = [],
    isLoading: loadingProducts,
  } = useProductsList();
  const createInvoiceMutation =
    useCreateInvoice();

  const [
    selectedCustomerId,
    setSelectedCustomerId,
  ] = useState<string | null>(null);
  const [invoiceNumber, setInvoiceNumber] =
    useState("");
  const [poNumber, setPoNumber] = useState("");
  const [invoiceDate, setInvoiceDate] =
    useState<Date>(new Date());
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState<
    InvoiceItem[]
  >([
    { id: crypto.randomUUID(), ...DEFAULT_ITEM },
  ]);

  const [discounts, setDiscounts] = useState<
    Discount[]
  >([
    {
      id: crypto.randomUUID(),
      description: "",
      value: 0,
      type: "fixed",
    },
  ]);

  const [currency, setCurrency] = useState("usd");

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.quantity * item.price,
    0,
  );

  const updateDiscount = (
    id: string,
    field: keyof Discount,
    value: string | number,
  ) => {
    setDiscounts((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, [field]: value }
          : d,
      ),
    );
  };

  const totalDiscount = discounts.reduce(
    (sum, d) => {
      if (d.type === "percentage") {
        return sum + (subtotal * d.value) / 100;
      }
      return sum + d.value;
    },
    0,
  );

  const total = subtotal - totalDiscount;

  const removeDiscount = (id: string) => {
    setDiscounts((prev) =>
      prev.filter((d) => d.id !== id),
    );
  };

  const handleSave = () => {
    // Validation
    if (!selectedCustomerId) {
      toast.error("Please select a customer");
      return;
    }

    if (!invoiceNumber) {
      toast.error(
        "Please enter an invoice number",
      );
      return;
    }

    if (
      items.length === 0 ||
      items.every((item) => !item.name)
    ) {
      toast.error("Please add at least one item");
      return;
    }

    // Prepare data
    const invoiceData: CreateInvoiceInput = {
      customer_id: selectedCustomerId,
      invoice_number: invoiceNumber,
      po_number: poNumber || undefined,
      invoice_date: invoiceDate.toISOString(),
      items: items
        .filter((item) => item.name) // Only include items with names
        .map((item) => ({
          product_id: item.productId,
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.price,
          total: item.quantity * item.price,
        })),
      discount_description:
        discounts[0]?.description,
      discount_value: discounts[0]?.value,
      discount_type: discounts[0]?.type,
      subtotal,
      total,
      currency,
      notes: notes || undefined,
      status: "Draft",
    };

    createInvoiceMutation.mutate(invoiceData);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="md:text-4xl text-3xl font-bold text-gray-900">
          New Invoice
        </h1>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSave}
            disabled={
              createInvoiceMutation.isPending
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
          >
            {createInvoiceMutation.isPending
              ? "Saving..."
              : "Save and Continue"}
          </Button>
        </div>
      </div>

      <div className="p-3 border rounded-lg">
        <h2 className="font-semibold">
          Business adress and contact details,
          title, summary and logo
        </h2>
      </div>

      <div className="my-5 border-gray-300 border shadow-lg rounded-lg ">
        <div className="flex justify-between">
          <CustomerSelector
            customers={customers}
            onCustomerSelect={
              setSelectedCustomerId
            }
          />
          <form>
            <div className="grid grid-cols-3 gap-4 items-start bp-1">
              <Label className="text-right pt-3 text-[16px] font-semibold text-gray-700">
                Invoice no.
              </Label>
              <div className="col-span-2 py-3 px-3">
                <Input
                  className="border-blue-200"
                  id="invoicenum"
                  placeholder="0"
                  value={invoiceNumber}
                  onChange={(e) =>
                    setInvoiceNumber(
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>

            {/* {Po number} */}
            <div className="grid grid-cols-3 gap-4 items-start bp-1">
              <Label className="text-right pt-3 text-[16px] font-semibold text-gray-700">
                P.O./S.O.
              </Label>
              <div className="col-span-2 py-3 px-3">
                <Input
                  id="ponum"
                  className="border-blue-200"
                  value={poNumber}
                  onChange={(e) =>
                    setPoNumber(e.target.value)
                  }
                />
              </div>
            </div>

            {/* {Invoice dates} */}
            <div className="grid grid-cols-3 gap-4 items-start bp-1">
              <Label className="text-right pt-3 text-[16px] font-semibold text-gray-700">
                Invoice Date
              </Label>
              <div className="col-span-2 py-3 px-3">
                <DatePicker
                  text={""}
                  // date={invoiceDate}
                  // onDateChange={setInvoiceDate}
                />
              </div>
            </div>
          </form>
        </div>
        {/* {order columns} */}
        <div className="mt-5">
          <Table>
            <AddInvoiceHeader />
            <TableBody>
              <InvoiceItemsSelector
                products={products}
                items={items}
                onItemsChange={setItems}
              />
              <InvoiceDiscount
                subtotal={subtotal}
                discounts={discounts}
                currency={currency}
                onDiscountUpdate={updateDiscount}
                onDiscountRemove={removeDiscount}
                onCurrencyChange={setCurrency}
              />
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col justify-start py-3 px-3 mb-4">
          <h2 className="font-semibold text-gray-400 px-2">
            Notes/Terms
          </h2>
          <input
            className="focus:outline-none p-2"
            placeholder="Enter notes or terms of service"
            type="text"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}
