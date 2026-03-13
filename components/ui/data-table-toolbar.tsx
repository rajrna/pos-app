"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  TransactionStatus,
  PaymentMethod,
} from "@/lib/transaction";

const STATUSES: TransactionStatus[] = [
  "completed",
  "pending",
  "failed",
  "refunded",
];
const PAYMENT_METHODS: PaymentMethod[] = [
  "Card",
  "Cash",
  "Loyalty",
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumn?: string;
  searchPlaceholder?: string;
}

interface FilterConfig {
  columnId: string;
  label: string;
  options: string[];
}
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumn?: string;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  searchPlaceholder = "Search...",
}: DataTableToolbarProps<TData>) {
  const [dateRange, setDateRange] =
    React.useState<DateRange | undefined>();

  // Derive active filter values directly from table state
  const selectedStatuses =
    (table
      .getColumn("status")
      ?.getFilterValue() as TransactionStatus[]) ??
    [];
  const selectedPayments =
    (table
      .getColumn("paymentMethod")
      ?.getFilterValue() as PaymentMethod[]) ??
    [];
  const isFiltered =
    selectedStatuses.length > 0 ||
    selectedPayments.length > 0 ||
    dateRange?.from;

  function toggleValue<T>(
    current: T[],
    value: T,
    columnId: string,
  ) {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    table
      .getColumn(columnId)
      ?.setFilterValue(
        next.length ? next : undefined,
      );
  }

  function clearAll() {
    table
      .getColumn("status")
      ?.setFilterValue(undefined);
    table
      .getColumn("paymentMethod")
      ?.setFilterValue(undefined);
    table
      .getColumn("date")
      ?.setFilterValue(undefined);
    setDateRange(undefined);
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      {searchColumn && (
        <Input
          placeholder={searchPlaceholder}
          value={
            (table
              .getColumn(searchColumn)
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table
              .getColumn(searchColumn)
              ?.setFilterValue(e.target.value)
          }
          className="max-w-xs"
        />
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            {dateRange?.from
              ? dateRange.to
                ? `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d, yyyy")}`
                : format(
                    dateRange.from,
                    "MMM d, yyyy",
                  )
              : "Date range"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={(range) => {
              setDateRange(range);
              table
                .getColumn("date")
                ?.setFilterValue(
                  range
                    ? {
                        from: range.from,
                        to: range.to,
                      }
                    : undefined,
                );
            }}
            numberOfMonths={2}
          />
          {dateRange?.from && (
            <div className="border-t p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => {
                  setDateRange(undefined);
                  table
                    .getColumn("date")
                    ?.setFilterValue(undefined);
                }}
              >
                Clear dates
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Status
            {selectedStatuses.length > 0 && (
              <>
                <Separator
                  orientation="vertical"
                  className="mx-2 h-4"
                />
                <Badge variant="secondary">
                  {selectedStatuses.length}
                </Badge>
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>
            Filter by status
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {STATUSES.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={selectedStatuses.includes(
                status,
              )}
              onCheckedChange={() =>
                toggleValue(
                  selectedStatuses,
                  status,
                  "status",
                )
              }
              className="capitalize"
            >
              {status}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Payment
            {selectedPayments.length > 0 && (
              <>
                <Separator
                  orientation="vertical"
                  className="mx-2 h-4"
                />
                <Badge variant="secondary">
                  {selectedPayments.length}
                </Badge>
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>
            Filter by payment
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {PAYMENT_METHODS.map((method) => (
            <DropdownMenuCheckboxItem
              key={method}
              checked={selectedPayments.includes(
                method,
              )}
              onCheckedChange={() =>
                toggleValue(
                  selectedPayments,
                  method,
                  "paymentMethod",
                )
              }
            >
              {method}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
          >
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((col) => col.getCanHide())
            .map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                className="capitalize"
                checked={col.getIsVisible()}
                onCheckedChange={(value) =>
                  col.toggleVisibility(!!value)
                }
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {isFiltered && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
        >
          Reset <X className="ml-1 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
