import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { QueryProvider } from "@/providers/QueryProvider";
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
      <div className="fixed top-0 left-0 right-0 z-50 h-(--navbar-height)">
        <Navbar />
      </div>

      <div className="fixed top-(--navbar-height) left-0 bottom-0 w-(--sidebar-width) z-40">
        <Sidebar />
      </div>

      <main className="pt-(--navbar-height) pl-(--sidebar-width)">
        <QueryProvider>{children}</QueryProvider>
      </main>
    </div>
  );
}
