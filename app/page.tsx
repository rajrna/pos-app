import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import InvoiceSs from "@/public/InvoiceScreenshot.png";

export default function Page() {
  return (
    <div className=" min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="flex items-start justify-between px-22 py-6">
        <div>
          <h1 className="text-blue-950 text-xl font-bold">
            ReBuzz
          </h1>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button className="border-0 hover:bg-gray-100 hover:text-blue-600 bg-gray-100 px-8 py-6   text-blue-900 text-[16px] font-semibold">
            <Link href="/dashboard">Log in</Link>
          </Button>

          <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-[16px] font-semibold rounded-3xl ">
            <Link href="/signup">
              Get started for free
            </Link>
          </Button>
        </div>
      </nav>
      {/* BODY CONTENT */}
      <div className="flex flex-col items-center text-center space-y-4 ">
        <h2 className="text-blue-900 font-semibold">
          SIMPLE MONEY MANGEMENT SOLUTION
        </h2>
        <h1 className="text-blue-900 text-5xl font-semibold">
          Manage your money like a boss
        </h1>
        <p className="text-blue-900 text-xl ">
          Rebuzz lets small business owners like
          you create beautiful invoices, accept
          online payments,
          <br />
          and make accounting easy—all in one
          place.
        </p>

        <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-6 text-blue-900 text-[16px] font-semibold rounded-3xl ">
          <Link href="/signup">
            Get started for free
          </Link>
        </Button>

        <div className="col-span-2 rounded-xl shadow-sm">
          <Image
            src={InvoiceSs}
            placeholder="blur"
            quality={80}
            width={800}
            alt="Screenshot of rebuzz app"
          />
        </div>
      </div>
    </div>
  );
}
