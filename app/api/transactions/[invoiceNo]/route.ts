import {
  NextRequest,
  NextResponse,
} from "next/server";
import { authHeaders } from "@/services/auth/login/session";

const BASE = "https://appapi.rebuzzpos.com/api";

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: { invoiceNo: string } },
// ) {
//   const { invoiceNo } = await params;

//   const res = await fetch(
//     `${BASE}/business/ticket/${params.invoiceNo}/bill`,
//     { headers: await authHeaders() },
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     return NextResponse.json(
//       { error: "Failed to fetch" },
//       { status: res.status },
//     );
//   }

//   return NextResponse.json(data);
// }
export async function GET(
  _req: NextRequest,
  {
    params,
  }: { params: Promise<{ invoiceNo: string }> },
) {
  const { invoiceNo } = await params; // ← await it

  const res = await fetch(
    `${BASE}/business/ticket/${invoiceNo}/bill`,
    { headers: await authHeaders() },
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: res.status },
    );
  }

  return NextResponse.json(data);
}
