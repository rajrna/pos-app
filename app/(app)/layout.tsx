import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";
import "@/app/globals.css";

import { QueryProvider } from "@/providers/QueryProvider";
import { SidebarProvider } from "@/providers/SidebarProvider";
import { CurrencyProvider } from "@/lib/context/CurrencyContext";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";
import MobileSidebarOverlay from "@/components/layout/MobileSidebarOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invoices",
  description: "Track your sales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <SidebarProvider>
        <div className="fixed top-0 left-0 right-0 z-50 md:h-(--navbar-height)">
          <Navbar />
        </div>

        <div className="fixed top-(--navbar-height) left-0 bottom-0  z-40 hidden md:block">
          <Sidebar />
        </div>

        <MobileSidebarOverlay />

        <MainContent>
          <QueryProvider>
            <CurrencyProvider>
              {children}
            </CurrencyProvider>
          </QueryProvider>
        </MainContent>
      </SidebarProvider>
    </div>
  );
}
