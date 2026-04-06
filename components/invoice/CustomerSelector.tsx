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

import { useCustomerNames } from "@/hooks/useCustomersList";

interface CustomerSelectorProps {
  // customers: Customer[];

  onCustomerSelect: (customer: Customer) => void;
  onCreateNew?: () => void;
  value?: Customer | null;
}

export default function CustomerSelector({
  onCustomerSelect,
  onCreateNew,
  value, // This is your Single Source of Truth
}: CustomerSelectorProps) {
  const { data: customers = [], isLoading } =
    useCustomerNames();
  const [open, setOpen] = useState(false);

  // We don't need a separate displayCustomer variable or extra state.
  // We just check if 'value' has the data we need.
  const hasSelectedCustomer =
    value && (value.name || value.id);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="p-5 m-4 w-62.5 h-35 font-semibold text-blue-700 rounded-lg flex items-center justify-center border border-gray-300 cursor-pointer hover:bg-blue-50 transition-colors">
          {isLoading ? (
            <span className="text-gray-400">
              Loading...
            </span>
          ) : hasSelectedCustomer ? (
            <div className="text-center">
              <p className="font-semibold text-gray-900">
                {value.name}
              </p>
              <p className="text-sm text-gray-500 font-normal">
                {value.email}
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
            <CommandEmpty>
              No customers found.
            </CommandEmpty>
            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  // Command uses 'value' for filtering; ensure it's a string
                  value={customer.name}
                  onSelect={() => {
                    // Update the parent's state
                    onCustomerSelect(customer);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      // Check against the prop ID
                      value?.id === customer.id
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

// export default function CustomerSelector({
//   onCustomerSelect,
//   onCreateNew,
//   value,
// }: CustomerSelectorProps) {
//   // 1. Fetch data directly inside the component
//   const { data: customers = [], isLoading } =
//     useCustomerNames();

//   const [open, setOpen] = useState(false);
//   const displayCustomer = value;
//   const [
//     selectedCustomerId,
//     setSelectedCustomerId,
//   ] = useState<string | null>(null);

//   const selectedCustomer = customers.find(
//     (c) => c.id === selectedCustomerId,
//   );
//   const hasSelectedCustomer =
//     value && (value.name || value.id);

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <div className="p-5 m-4 w-62.5 h-35 font-semibold text-blue-700 rounded-lg flex items-center justify-center border border-gray-300 cursor-pointer hover:bg-blue-50 transition-colors">
//           {isLoading ? (
//             <span className="text-gray-400">
//               Loading...
//             </span>
//           ) : // ) : selectedCustomer ? (
//           hasSelectedCustomer ? (
//             <div className="text-center">
//               <p className="font-semibold text-gray-900">
//                 {value.name}
//               </p>
//               <p className="text-sm text-gray-500 font-normal">
//                 {value.email}
//               </p>
//             </div>
//           ) : (
//             <span>+ Add a customer</span>
//           )}
//         </div>
//       </PopoverTrigger>

//       <PopoverContent
//         className="w-72 p-0"
//         align="start"
//       >
//         <Command>
//           <CommandInput placeholder="Type a customer name" />
//           <CommandList>
//             {/* 2. CommandEmpty handles the "No results" case */}
//             <CommandEmpty>
//               No customers found.
//             </CommandEmpty>

//             <CommandGroup>
//               {customers.map((customer) => (
//                 <CommandItem
//                   key={customer.id}
//                   value={customer.name}
//                   onSelect={() => {
//                     // setSelectedCustomerId(
//                     //   customer.id,
//                     // );
//                     onCustomerSelect(customer); // Sends selected data back to parent
//                     setOpen(false);
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       // selectedCustomerId ===
//                       value?.id === customer.id
//                         ? "opacity-100"
//                         : "opacity-0",
//                     )}
//                   />
//                   {customer.name}
//                 </CommandItem>
//               ))}
//             </CommandGroup>

//             <CommandSeparator />
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
