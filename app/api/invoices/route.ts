import {
  NextRequest,
  NextResponse,
} from "next/server";
import { authHeaders } from "@/services/auth/login/session";

const BASE = "https://api.beta.rebuzzpos.com/api";

export async function GET() {
  const res = await fetch(
    `${BASE}/business/ticket/unarchived`,
    {
      headers: await authHeaders(),
    },
  );

  const data = await res.json();
  if (!res.ok)
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: res.status },
    );
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(
    `${BASE}/business/ticket`,
    {
      method: "POST",
      headers: await authHeaders(),
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  if (!res.ok)
    return NextResponse.json(
      { error: "Failed to create" },
      { status: res.status },
    );
  return NextResponse.json(data);
}
