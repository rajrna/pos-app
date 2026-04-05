import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    "https://api.beta.rebuzzpos.com/api/business/discount/getall",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();
  return NextResponse.json(data, {
    status: res.status,
  });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const body = await request.json();

  const res = await fetch(
    "https://api.beta.rebuzzpos.com/api/business/discount/create",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  return NextResponse.json(data, {
    status: res.status,
  });
}
