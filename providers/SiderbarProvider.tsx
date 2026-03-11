"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const SidebarContext = createContext<{
  isCollapsed: boolean;
  toggle: () => void;
}>({ isCollapsed: false, toggle: () => {} });

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] =
    useState(false);
  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggle: () => setIsCollapsed((p) => !p),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () =>
  useContext(SidebarContext);
