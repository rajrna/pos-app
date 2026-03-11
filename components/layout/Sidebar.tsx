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
  const activeSectionFromUrl =
    navigationConfig.find(
      (item) =>
        item.type === "section" &&
        item.items.some(
          (subItem) => subItem.href === pathname,
        ),
    );

  const [openSectionLabel, setOpenSectionLabel] =
    useState<string | null>(() => {
      return activeSectionFromUrl?.type ===
        "section"
        ? activeSectionFromUrl.label
        : null;
    });

  const handleToggle = (label: string) => {
    setOpenSectionLabel((prev) =>
      prev === label ? null : label,
    );
  };

  return (
    <aside className="w-56 border-r bg-background h-screen flex flex-col">
      <div className="py-2 px-1">
        <Button
          className="w-35 bg-white text-blue-500 text-[14px] font-semibold hover:bg-blue-100 "
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
