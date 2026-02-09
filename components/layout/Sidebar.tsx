"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { navigationConfig } from "@/lib/navigation";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

export default function Sidebar() {
  const pathname = usePathname();

  // 1. Calculate which section SHOULD be open based on the URL
  // We do this outside of useState/useEffect so it's always fresh
  const activeSectionFromUrl =
    navigationConfig.find(
      (item) =>
        item.type === "section" &&
        item.items.some(
          (subItem) => subItem.href === pathname,
        ),
    );

  // 2. Initialize state. If there's an active URL, use that label, otherwise null.
  // We use a "lazy initializer" (the function inside useState) so it only runs once.
  const [openSectionLabel, setOpenSectionLabel] =
    useState<string | null>(() => {
      return activeSectionFromUrl?.type ===
        "section"
        ? activeSectionFromUrl.label
        : null;
    });

  // 3. Keep manual toggle logic
  const handleToggle = (label: string) => {
    setOpenSectionLabel((prev) =>
      prev === label ? null : label,
    );
  };

  return (
    <aside className="w-56 border-r bg-background h-screen flex flex-col">
      <div className="p-1">
        <Button
          className="w-35 bg-white text-blue-500 text-sm font-bold hover:bg-blue-200"
          size="sm"
        >
          <Plus className="w-2 h-2 mr-1 font-bold" />
          Create new
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {navigationConfig.map((item) => {
            const isSectionActive =
              activeSectionFromUrl?.label ===
              item.label;
            const isOpen =
              openSectionLabel === item.label ||
              (openSectionLabel === null &&
                isSectionActive);

            return item.type === "single" ? (
              <SidebarItem
                key={item.href}
                {...item}
              />
            ) : (
              <SidebarSection
                key={item.label}
                label={item.label}
                icon={item.icon}
                items={item.items}
                isOpen={isOpen}
                onToggle={() =>
                  handleToggle(item.label)
                }
              />
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
