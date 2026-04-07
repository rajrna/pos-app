import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  InvoiceItem,
  InvoiceItemsSelectorProps,
} from "@/lib/types/invoice";

import { useCreateProduct } from "@/hooks/useProducts";

import {
  Trash2,
  CirclePlus,
  GripVertical,
  Check,
  ChevronsUpDown,
  Plus,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select";

export default function InvoiceItemsSelector({
  products,
  items,
  onItemsChange,
  masterDiscounts,
  onAddDiscount,
  onRemoveDiscount,
  refetchProducts,
}: InvoiceItemsSelectorProps) {
  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] =
    useState(false);
  const [search, setSearch] = useState("");
  const [activeRowId, setActiveRowId] = useState<
    string | null
  >(null);
  const { mutateAsync: createProductMutation } =
    useCreateProduct();

  // Consolidated Product State
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    costPrice: 0,
    description: "",
    discounts: [],
  });

  const resetModalFields = () => {
    setNewProduct({
      name: "",
      price: 0,
      costPrice: 0,
      description: "",
      discounts: [],
    });
    setSearch("");
  };

  const openCreateModal = (
    rowId: string,
    name: string,
  ) => {
    setActiveRowId(rowId);
    setNewProduct((prev) => ({ ...prev, name }));
    setIsModalOpen(true);
  };

  const handleSaveProduct = async () => {
    try {
      const result =
        await createProductMutation(newProduct);
      const savedProduct = result;

      onItemsChange(
        items.map((item) =>
          item.id === activeRowId
            ? {
                ...item,
                name: savedProduct.name,
                productId: savedProduct.id,
                price: savedProduct.price,
                description:
                  savedProduct.description,
              }
            : item,
        ),
      );
      setIsModalOpen(false);
      resetModalFields();
    } catch (err) {
      console.error("Mutation failed", err);
    }
  };
  const addItem = () => {
    onItemsChange([
      ...items,
      {
        id: crypto.randomUUID(),
        productId: "",
        name: "",
        description: "",
        quantity: 1,
        price: 0,
        discounts: [],
      },
    ]);
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    onItemsChange(
      items.map((item) => {
        if (item.id !== id) return item;
        return { ...item, [field]: value };
      }),
    );
  };

  const handleProductSelect = (
    itemId: string,
    productName: string,
  ) => {
    const product = products.find(
      (p) => p.name === productName,
    );

    onItemsChange(
      items.map((item) => {
        if (item.id !== itemId) return item;
        return {
          ...item,
          name: productName,
          productId: product?.id ?? "",
          price: product?.price ?? 0,
          description: product?.description ?? "",
          // AUTO-POPULATE: If product has discounts in the DB, add them here
          discounts: product?.discounts || [],
        };
      }),
    );
  };

  return (
    <>
      {items.map((item, idx) => (
        <TableRow
          // key={item.id}
          key={idx}
          className="border-b-0"
        >
          <TableCell className="w-6 px-1">
            <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
          </TableCell>

          <TableCell className="min-w-50">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between font-normal border-gray-300",
                    !item.name &&
                      "text-muted-foreground",
                  )}
                >
                  {item.name ||
                    "Select product..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-75 p-0"
                align="start"
              >
                <Command>
                  <CommandInput
                    placeholder="Search product..."
                    value={search}
                    onValueChange={setSearch}
                  />
                  <CommandList>
                    <CommandEmpty className="p-0">
                      <div className="py-6 text-center text-sm">
                        No product found.
                      </div>
                      <Button
                        variant="secondary"
                        className="w-full rounded-none border-t flex items-center justify-start gap-2 px-4 py-2"
                        onClick={() =>
                          openCreateModal(
                            item.id,
                            search,
                          )
                        }
                      >
                        <Plus className="h-4 w-4" />
                        <span>
                          Create &quot;{search}
                          &quot;
                        </span>
                      </Button>
                    </CommandEmpty>
                    <CommandGroup>
                      {products.map((product) => (
                        <CommandItem
                          key={product.id}
                          value={product.name}
                          onSelect={() =>
                            handleProductSelect(
                              item.id,
                              product.name,
                            )
                          }
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              item.name ===
                                product.name
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          <div className="flex flex-col">
                            <span>
                              {product.name}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              ${product.price}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </TableCell>

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
              placeholder="Test Description"
            />
          </TableCell>

          <TableCell className="w-24">
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                updateItem(
                  item.id,
                  "quantity",
                  Number(e.target.value),
                )
              }
              className="text-right"
            />
          </TableCell>

          <TableCell className="w-24">
            <Input
              type="number"
              value={item.price}
              onChange={(e) =>
                updateItem(
                  item.id,
                  "price",
                  Number(e.target.value),
                )
              }
              className="text-right"
            />
          </TableCell>

          {/* <TableCell className="w-24 text-right font-medium">
            $
            {(item.quantity * item.price).toFixed(
              2,
            )}
          </TableCell> */}
          <TableCell className="w-24 text-right font-medium">
            $
            {(() => {
              const rowSubtotal =
                item.quantity * item.price;
              const rowDiscount =
                item.discounts.reduce(
                  (sum, dId) => {
                    const d =
                      masterDiscounts.find(
                        (m) => m._id === dId,
                      );
                    if (!d) return sum;
                    return (
                      sum +
                      (d.type === "percentage"
                        ? (rowSubtotal * d.rate) /
                          100
                        : d.rate)
                    );
                  },
                  0,
                );
              return (
                rowSubtotal - rowDiscount
              ).toFixed(2);
            })()}
          </TableCell>
          <TableCell>
            <div className="flex  gap-1">
              {/* List applied discounts for this item */}
              {item.discounts.map((dId) => {
                const d = masterDiscounts.find(
                  (m) => m._id === dId,
                );
                if (!d) return null;
                return (
                  <Badge
                    key={dId}
                    className="flex justify-between gap-1 items-center bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    {d.name}
                    <button
                      type="button" // Critical to prevent form submission
                      className="ml-1 rounded-full outline-none hover:bg-blue-300 p-0.5 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemoveDiscount(
                          item.id,
                          dId,
                        );
                      }}
                    >
                      <X className="w-3 h-3 cursor-pointer hover:text-red-500" />
                      <span className="sr-only">
                        Remove discount
                      </span>
                    </button>
                  </Badge>
                );
              })}

              {/* Selector for this specific row */}
              <Select
                value=""
                onValueChange={(dId) => {
                  if (dId) {
                    onAddDiscount(item.id, dId);
                  }
                }}
              >
                <SelectTrigger className="h-7 w-full border-dashed">
                  {/* <Plus className="w-3 h-3 mr-1" />{" "} */}
                  Discount
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  side="bottom"
                  className="z-150"
                >
                  {masterDiscounts.map((d) => (
                    <SelectItem
                      key={d._id}
                      value={d._id}
                    >
                      {d.name} (
                      {d.type === "percentage"
                        ? `${d.rate}%`
                        : `$${d.rate}`}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TableCell>

          <TableCell className="w-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                onItemsChange(
                  items.filter(
                    (i) => i.id !== item.id,
                  ),
                )
              }
            >
              <Trash2 className="h-4 w-4 text-blue-500 hover:text-red-500" />
            </Button>
          </TableCell>
        </TableRow>
      ))}

      <TableRow className="bg-blue-50/30 hover:bg-blue-50/50">
        <TableCell colSpan={7}>
          <button
            onClick={addItem}
            className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors px-4 py-2"
          >
            <CirclePlus className="h-4 w-4" />
            Add an item
          </button>
        </TableCell>
      </TableRow>

      {/* PRODUCT CREATION DIALOG */}
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-blue-600">
              Create New Product
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Product Name
              </Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="costPrice">
                Cost Price
              </Label>
              <Input
                id="costPrice"
                type="number"
                value={newProduct.costPrice}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    costPrice: Number(
                      e.target.value,
                    ),
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">
                Selling Price
              </Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">
                Description
              </Label>
              <Input
                id="description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setIsModalOpen(false)
              }
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProduct}
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : "Save Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
