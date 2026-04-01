import { Customer } from "@/lib/types/customer";

import { useState } from "react";
import { Check, CirclePlus } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCustomerNames } from "@/hooks/useCustomersList";

interface CustomerSelectorProps {
  // customers: Customer[];
  onCustomerSelect: (customer: Customer) => void;
  onCreateNew?: () => void;
}

export default function CustomerSelector({
  onCustomerSelect,
  onCreateNew,
}: CustomerSelectorProps) {
  // 1. Fetch data directly inside the component
  const { data: customers = [], isLoading } =
    useCustomerNames();

  const [open, setOpen] = useState(false);
  const [
    selectedCustomerId,
    setSelectedCustomerId,
  ] = useState<string | null>(null);

  const selectedCustomer = customers.find(
    (c) => c.id === selectedCustomerId,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="p-5 m-4 w-62.5 h-35 font-semibold text-blue-700 rounded-lg flex items-center justify-center border border-gray-300 cursor-pointer hover:bg-blue-50 transition-colors">
          {isLoading ? (
            <span className="text-gray-400">
              Loading...
            </span>
          ) : selectedCustomer ? (
            <div className="text-center">
              <p className="font-semibold text-gray-900">
                {selectedCustomer.name}
              </p>
              <p className="text-sm text-gray-500 font-normal">
                {selectedCustomer.email}
              </p>
            </div>
          ) : (
            <span>+ Add a customer</span>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-72 p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Type a customer name" />
          <CommandList>
            {/* 2. CommandEmpty handles the "No results" case */}
            <CommandEmpty>
              No customers found.
            </CommandEmpty>

            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.name}
                  onSelect={() => {
                    setSelectedCustomerId(
                      customer.id,
                    );
                    onCustomerSelect(customer); // Sends selected data back to parent
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCustomerId ===
                        customer.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {customer.name}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
