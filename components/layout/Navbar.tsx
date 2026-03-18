"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { useSidebar } from "@/providers/SidebarProvider";

import User from "./User";
import HelpButton from "./HelpButton";
import { Button } from "../ui/button";
// import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const { toggleMobile } = useSidebar();
  return (
    <nav className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 text-gray-600"
            onClick={toggleMobile}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="text-xl font-semibold text-blue-600">
            <Link href="/">Rebuzz</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              2
            </Badge>
          </Button> */}
          <HelpButton />
          <User />
        </div>
      </div>
    </nav>
  );
}
