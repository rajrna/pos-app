"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

export default function SidebarItem({
  label,
  href,
  icon: Icon,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-foreground text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive &&
          "bg-accent text-accent-foreground",
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}
