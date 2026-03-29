// app/api/customers/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        status: "fail",
        message: "No token found",
      },
      { status: 401 },
    );
  }

  const res = await fetch(
    "https://api.beta.rebuzzpos.com/api/business/users/roles/user",
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
