import type { Metadata } from "next";

import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { CurrencyProvider } from "@/lib/context/CurrencyContext";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: {
    template: "%s - Rebuzz",
    default: "Rebuzz POS",
  },
  description: "Track your sales",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const currencyCode =
    cookieStore.get("currency")?.value;
  return (
    <QueryProvider>
      <CurrencyProvider
        initialCurrencyCode={currencyCode}
      >
        <html lang="en">
          <body>{children}</body>
        </html>
      </CurrencyProvider>
    </QueryProvider>
  );
}
