"use client";
import CustomerSelector from "@/components/invoice/CustomerSelector";
import InvoiceDiscount from "@/components/invoice/InvoiceDiscount";
import InvoiceItemsSelector from "@/components/invoice/InvoiceItemsSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/pop-calendar";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomersList } from "@/hooks/useCustomersList";
import { useProductsList } from "@/hooks/useProductsList";
import { useState } from "react";

interface InvoiceItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

const DEFAULT_ITEM: Omit<InvoiceItem, "id"> = {
  productId: "",
  name: "",
  description: "",
  quantity: 1,
  price: 0,
};
interface Discount {
  id: string;
  description: string;
  value: number;
  type: "fixed" | "percentage";
}

export default function Page() {
  const {
    data: customers = [],
    isLoading: loadingCustomers,
  } = useCustomersList();
  const {
    data: products = [],
    isLoading: loadingProducts,
  } = useProductsList();

  const [items, setItems] = useState<
    InvoiceItem[]
  >([
    { id: crypto.randomUUID(), ...DEFAULT_ITEM },
  ]);

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.quantity * item.price,
    0,
  );

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

  const removeDiscount = (id: string) => {
    setDiscounts((prev) =>
      prev.filter((d) => d.id !== id),
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="md:text-4xl text-3xl font-bold text-gray-900">
          New Invoice
        </h1>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Save and Continue
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
                />
              </div>
            </div>

            {/* {Invoice dates} */}
            <div className="grid grid-cols-3 gap-4 items-start bp-1">
              <Label className="text-right pt-3 text-[16px] font-semibold text-gray-700">
                Invoice Date
              </Label>
              <div className="col-span-2 py-3 px-3">
                <DatePicker text={""} />
              </div>
            </div>
          </form>
        </div>
        {/* {order columns} */}
        <div className="mt-5">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200 border-b ">
                <TableHead className="w-6" />
                <TableHead className="font-semibold text-gray-900">
                  Items
                </TableHead>
                <TableHead className="text-gray-600">
                  Description
                </TableHead>
                <TableHead className="text-gray-600 text-right">
                  Quantity
                </TableHead>
                <TableHead className="text-gray-600 text-right">
                  Price
                </TableHead>
                <TableHead className="text-gray-600 text-right">
                  Amount
                </TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* <InvoiceItemsSelector
                products={products}
              /> */}
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
          />
        </div>
      </div>
    </div>
  );
}
