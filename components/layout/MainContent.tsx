"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/SiderbarProvider";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebar();

  return (
    <main
      className={cn(
        "pt-(--navbar-height) transition-all duration-300",
        isCollapsed ? "pl-12" : "pl-56",
      )}
    >
      {children}
    </main>
  );
}
