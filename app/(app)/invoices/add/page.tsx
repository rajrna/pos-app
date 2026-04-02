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
// import { useCreateInvoice } from "@/hooks/useInvoices";
import { useProductsList } from "@/hooks/useProductsList";

import { InvoiceItem } from "@/lib/types/invoice";
import { Discount } from "@/lib/types/invoice";
import { Customer } from "@/lib/types/customer";
import { CreateTicketInput } from "@/lib/types/ticket";
import { useRouter } from "next/navigation";
import { useCreateTicket } from "@/hooks/useTickets";

const DEFAULT_ITEM: Omit<InvoiceItem, "id"> = {
  productId: "",
  name: "",
  description: "",
  quantity: 1,
  price: 0,
};

export default function Page() {
  const router = useRouter();

  const { mutate: saveTicket, isPending } =
    useCreateTicket();

  const {
    data: customers = [],
    isLoading: loadingCustomers,
  } = useCustomersList();
  const {
    data: products = [],
    isLoading: loadingProducts,
  } = useProductsList();
  // const createInvoiceMutation = useCreateTicket();

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [invoiceNumber, setInvoiceNumber] =
    useState("");
  // const [poNumber, setPoNumber] = useState("");
  // const [invoiceDate, setInvoiceDate] =
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
      let val = 0;
      if (d.type === "percentage") {
        val = (subtotal * d.value) / 100;
      } else {
        val = d.value;
      }
      return sum + val;
    },
    0,
  );

  const total = Math.max(
    0,
    subtotal - totalDiscount,
  );

  const removeDiscount = (id: string) => {
    setDiscounts((prev) =>
      prev.filter((d) => d.id !== id),
    );
  };

  const handleSave = () => {
    console.log("Button clicked");
    // Validation
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }

    if (
      items.length === 0 ||
      items.every((item) => !item.name)
    ) {
      toast.error("Please add at least one item");
      return;
    }

    const ticketData: CreateTicketInput = {
      ticketName:
        selectedCustomer?.name ??
        "Walk-in Customer",
      customerEmail:
        selectedCustomer?.email || "",
      phoneNumber: selectedCustomer?.phone || "",
      total: subtotal,
      discount: totalDiscount,
      totalDiscount: totalDiscount,
      grandTotal: total,
      taxId: null,
      note: `${notes}${invoiceNumber ? `|Invoice: ${invoiceNumber}` : ""}`,

      items: items
        .filter(
          (item) =>
            item.name && item.quantity > 0,
        )
        .map((item) => ({
          id: item.productId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          note: null,
          discounts: [],
          isTaxable: false,
        })),
    };
    console.log(
      "2. Payload Prepared:",
      ticketData,
    );

    saveTicket(ticketData, {
      onSuccess: (response) => {
        console.log("Success", response);
        toast.success("Invoice saved");
        const newId =
          response?.data?.ticket?.invoice ||
          response?.data?.ticket?.invoice;
        if (newId) {
          router.push(`/invoices/${newId}`);
          // router.push(`/invoices/`);
        }
      },
      onError: (err) => {
        console.log("Failed", err);
        toast.error(
          `Save failed: ${err.message}`,
        );
      },
    });
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
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 z-100 rounded-2xl"
          >
            {isPending
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
            // customers={customers}
            onCustomerSelect={(customer) => {
              setSelectedCustomer(customer);
            }}
          />
          <form>
            {/* <div className="grid grid-cols-3 gap-4 items-start bp-1">
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
            </div> */}

            {/* {Po number} */}
            {/* <div className="grid grid-cols-3 gap-4 items-start bp-1">
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
            </div> */}

            {/* {Invoice dates} */}
            {/* <div className="grid grid-cols-3 gap-4 items-start bp-1">
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
            </div> */}
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
