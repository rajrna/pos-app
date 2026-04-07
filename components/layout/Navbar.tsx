import Link from "next/link";

import User from "./User";
import HelpButton from "./HelpButton";

import MobileButton from "./MobileButton";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    "https://api.beta.rebuzzpos.com/api/business/aboutBusiness",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const result = await res.json();
  const businessData = result.data?.business;
  return (
    <nav className="w-full border-b bg-white z-200">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <MobileButton />
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
          <User
            initialBusinessName={
              businessData?.businessName ||
              "My Business"
            }
          />
        </div>
      </div>
    </nav>
  );
}
