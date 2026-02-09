"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const filterButtons = [
  {
    id: "unpaid" as const,
    label: "Unpaid",
    count: 0,
  },
  {
    id: "draft" as const,
    label: "Draft",
    count: 1,
  },
  {
    id: "all" as const,
    label: "All invoices",
    count: null,
  },
];

export default function InvoiceFilterSecondary() {
  const [selectedFilter, setSelectedFilter] =
    useState<"unpaid" | "draft" | "all">(
      "unpaid",
    );

  return (
    <div className="flex items-center gap-3 mb-6">
      {filterButtons.map((filter) => {
        const isActive =
          selectedFilter === filter.id;

        return (
          <Button
            key={filter.id}
            variant={
              isActive ? "outline" : "ghost"
            }
            onClick={() =>
              setSelectedFilter(filter.id)
            }
            className={
              isActive
                ? "bg-blue-50 text-blue-700 border-blue-200 rounded-full hover:bg-blue-100"
                : "text-gray-700 hover:bg-gray-100 rounded-full"
            }
          >
            {filter.label}
            {filter.count !== null && (
              <Badge
                variant="secondary"
                className="ml-2 bg-blue-600 text-white rounded-full px-2 py-0.5"
              >
                {filter.count}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
}
