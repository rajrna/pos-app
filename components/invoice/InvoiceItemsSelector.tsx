import { Fragment } from "react";
import {
  Trash2,
  CirclePlus,
  GripVertical,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { InvoiceItem } from "@/types/invoice";
import { InvoiceItemsSelectorProps } from "@/types/invoice";

import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";

const DEFAULT_ITEM: Omit<InvoiceItem, "id"> = {
  productId: "",
  name: "",
  description: "",
  quantity: 1,
  price: 0,
};

export default function InvoiceItemsSelector({
  products,
  items,
  onItemsChange,
}: InvoiceItemsSelectorProps) {
  const addItem = () => {
    onItemsChange([
      ...items,
      {
        id: crypto.randomUUID(),
        ...DEFAULT_ITEM,
      },
    ]);
  };

  const removeItem = (id: string) => {
    onItemsChange(
      items.filter((item) => item.id !== id),
    );
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    onItemsChange(
      items.map((item) => {
        if (item.id !== id) return item;

        if (field === "name") {
          const product = products.find(
            (p) =>
              p.name.toLowerCase() ===
              (value as string).toLowerCase(),
          );
          return {
            ...item,
            name: value as string,
            productId: product?.id ?? "",
            price: product?.price ?? 0,
          };
        }

        return { ...item, [field]: value };
      }),
    );
  };

  const calculateTotal = (
    quantity: number,
    price: number,
  ) => {
    return (quantity * price).toFixed(2);
  };

  return (
    <>
      {items.map((item) => (
        <Fragment key={item.id}>
          {/* Main Item Row */}
          <TableRow
            key={item.id}
            className="border-b-0"
          >
            <TableCell className="w-6 px-1">
              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
            </TableCell>

            {/* Product Name */}
            <TableCell className="min-w-40">
              <Input
                value={item.name}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "name",
                    e.target.value,
                  )
                }
                placeholder="ProductName"
                className="border-gray-300"
                list={`products-${item.id}`}
              />
              <datalist
                id={`products-${item.id}`}
              >
                {products.map((product) => (
                  <option
                    key={product.id}
                    value={product.name}
                  />
                ))}
              </datalist>
            </TableCell>

            {/* Description */}
            <TableCell className="min-w-48">
              <Input
                value={item.description}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "description",
                    e.target.value,
                  )
                }
                placeholder="Enter item description"
                className="border-gray-300 text-gray-400"
              />
            </TableCell>

            {/* Quantity */}
            <TableCell className="w-20">
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "quantity",
                    Number(e.target.value),
                  )
                }
                className="border-gray-300 text-right"
              />
            </TableCell>

            {/* Price */}
            <TableCell className="w-24">
              <Input
                type="number"
                min={0}
                step={0.01}
                value={item.price}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "price",
                    Number(e.target.value),
                  )
                }
                className="border-gray-300 text-right"
              />
            </TableCell>

            {/* Total */}
            <TableCell className="w-20 text-right font-medium">
              $
              {calculateTotal(
                item.quantity,
                item.price,
              )}
            </TableCell>

            {/* Delete */}
            <TableCell className="w-8">
              <Trash2
                className="h-4 w-4 text-blue-500 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() =>
                  removeItem(item.id)
                }
              />
            </TableCell>
          </TableRow>

          {/* Sub Row - Edit income account & Tax */}
          <TableRow
            key={`${item.id}-sub`}
            className="bg-blue-50/50 border-b"
          >
            <TableCell />
            <TableCell colSpan={2}>
              <span className="text-blue-600 font-semibold text-sm cursor-pointer hover:underline">
                Edit income account
              </span>
            </TableCell>
            <TableCell
              colSpan={2}
              className="text-right"
            >
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm text-gray-600">
                  Tax
                </span>
                <Select>
                  <SelectTrigger className="w-36 h-8 text-sm">
                    <SelectValue placeholder="Select a tax" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      No Tax
                    </SelectItem>
                    <SelectItem value="gst-10">
                      GST 10%
                    </SelectItem>
                    <SelectItem value="vat-20">
                      VAT 20%
                    </SelectItem>
                    <SelectItem value="hst-13">
                      HST 13%
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TableCell>
            <TableCell className="text-right text-gray-400">
              —
            </TableCell>
            <TableCell />
          </TableRow>
        </Fragment>
      ))}

      {/* Add Item Row */}
      <TableRow className="bg-blue-50/30 hover:bg-blue-50/50">
        <TableCell colSpan={7}>
          <button
            onClick={addItem}
            className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors px-13 py-1"
          >
            <CirclePlus className="h-4 w-4" />
            Add an item
          </button>
        </TableCell>
      </TableRow>
    </>
  );
}
