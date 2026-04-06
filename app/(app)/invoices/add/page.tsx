"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useBusiness } from "@/hooks/useBusiness";
import { useDiscounts } from "@/hooks/useDiscounts";
import { useCreateTicket } from "@/hooks/useTickets";
import { useProductsList } from "@/hooks/useProductsList";
import { useCustomersList } from "@/hooks/useCustomersList";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { DatePicker } from "@/components/ui/pop-calendar";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomerSelector from "@/components/invoice/CustomerSelector";
import AddInvoiceHeader from "@/components/invoice/AddInvoiceHeader";
import InvoiceItemsSelector from "@/components/invoice/InvoiceItemsSelector";
import InvoiceDiscountCreate from "@/components/invoice/InvoiceDiscountCreate";

import { Discount } from "@/lib/types/invoice";
import { Customer } from "@/lib/types/customer";
import { InvoiceItem } from "@/lib/types/invoice";
import { CreateTicketInput } from "@/lib/types/ticket";

const DEFAULT_ITEM: Omit<InvoiceItem, "id"> = {
  productId: "",
  name: "",
  description: "",
  quantity: 1,
  price: 0,
  discounts: [],
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
  const { data: business } = useBusiness();
  // const createInvoiceMutation = useCreateTicket();

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [invoiceTitle, setInvoiceTitle] =
    useState("");

  const [invoiceNumber, setInvoiceNumber] =
    useState("");
  // const [poNumber, setPoNumber] = useState("");
  // const [invoiceDate, setInvoiceDate] =
  useState<Date>(new Date());
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState<
    InvoiceItem[]
  >([
    {
      id: crypto.randomUUID(),
      ...DEFAULT_ITEM,
      discounts: [],
    },
  ]);

  const { data: masterDiscounts = [] } =
    useDiscounts();
  const [
    selectedDiscountIds,
    setSelectedDiscountIds,
  ] = useState<string[]>([]);

  const [discounts, setDiscounts] = useState<
    Discount[]
  >([
    {
      _id: crypto.randomUUID(),
      name: "",
      isEnabled: false,
      rate: 0,
      type: "fixed",
    },
  ]);

  const [currency, setCurrency] = useState("usd");

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.quantity * item.price,
    0,
  );

  const totalDiscountValue =
    selectedDiscountIds.reduce((sum, id) => {
      const d = masterDiscounts.find(
        (m) => m._id === id,
      );
      if (!d) return sum;
      return (
        sum +
        (d.type === "percentage"
          ? (subtotal * d.rate) / 100
          : d.rate)
      );
    }, 0);
  // 1. Calculate the subtotal of all items AFTER their individual discounts
  const itemsSubtotal = items.reduce(
    (sum, item) => {
      const rowRawTotal =
        item.quantity * item.price;
      const rowDiscount = item.discounts.reduce(
        (dSum, dId) => {
          const d = masterDiscounts.find(
            (m) => m._id === dId,
          );
          if (!d) return dSum;
          return (
            dSum +
            (d.type === "percentage"
              ? (rowRawTotal * d.rate) / 100
              : d.rate)
          );
        },
        0,
      );
      return sum + (rowRawTotal - rowDiscount);
    },
    0,
  );

  // 2. Calculate global discounts based on the itemsSubtotal
  const globalDiscountValue =
    selectedDiscountIds.reduce((sum, id) => {
      const d = masterDiscounts.find(
        (m) => m._id === id,
      );
      if (!d) return sum;
      return (
        sum +
        (d.type === "percentage"
          ? (itemsSubtotal * d.rate) / 100
          : d.rate)
      );
    }, 0);

  const finalTotal = Math.max(
    0,
    itemsSubtotal - globalDiscountValue,
  );

  const handleDiscountSelect = (id: string) => {
    if (!selectedDiscountIds.includes(id)) {
      setSelectedDiscountIds((prev) => [
        ...prev,
        id,
      ]);
    }
  };

  const handleItemDiscountAdd = (
    itemId: string,
    discountId: string,
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              discounts: [
                ...new Set([
                  ...item.discounts,
                  discountId,
                ]),
              ],
            }
          : item,
      ),
    );
  };

  const handleItemDiscountRemove = (
    itemId: string,
    discountId: string,
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              discounts: item.discounts.filter(
                (id) => id !== discountId,
              ),
            }
          : item,
      ),
    );
  };

  const handleDiscountRemove = (id: string) => {
    setSelectedDiscountIds((prev) =>
      prev.filter((dId) => dId !== id),
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
        invoiceTitle ??
        selectedCustomer?.name ??
        "Walk-in Customer",
      customerEmail:
        selectedCustomer?.email || "",
      phoneNumber: selectedCustomer?.phone || "",
      total: subtotal,
      discount: totalDiscountValue,
      totalDiscount: totalDiscountValue,
      grandTotal: finalTotal,
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
          discounts: item.discounts.map((id) => {
            const master = masterDiscounts.find(
              (m) => m._id === id,
            );
            return {
              _id: master?._id,
              name: master?.name,
              rate: master?.rate,
              type: master?.type,
              isEnabled: true,
              isSelected: true,
            };
          }),
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
          Business address and contact details,
          title, summary
        </h2>
        <div>
          <h2 className="font-bold text-lg">
            {business?.businessName ||
              "My Business"}
          </h2>
          <p className="text-sm text-gray-500">
            {business?.address},{" "}
          </p>
          <p>{business?.panNumber}</p>
        </div>
      </div>

      <div className="my-5 border-gray-300 border shadow-lg rounded-lg ">
        <div className="flex justify-between">
          <CustomerSelector
            onCustomerSelect={(customer) => {
              setSelectedCustomer(customer);
            }}
          />
          <form>
            <div className="grid grid-cols-3 gap-4 items-start bp-1 mt-1">
              <Label className="text-right pt-4 text-[16px] font-semibold text-blue-600">
                Invoice Title
              </Label>
              <div className="col-span-2 py-3 px-3">
                <Input
                  className="hover:bg-blue-100 font-semibold px-6"
                  id="invoiceTitle"
                  placeholder="Invoice"
                  value={invoiceTitle}
                  onChange={(e) =>
                    setInvoiceTitle(
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>
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
                masterDiscounts={masterDiscounts}
                onAddDiscount={
                  handleItemDiscountAdd
                }
                onRemoveDiscount={
                  handleItemDiscountRemove
                }
              />
            </TableBody>
          </Table>
        </div>
        <div>
          <InvoiceDiscountCreate
            subtotal={subtotal}
            finalTotal={finalTotal}
          />
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
