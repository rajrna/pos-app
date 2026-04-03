import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const phone = searchParams.get("phone");
  const email = searchParams.get("email");

  const queryParam = phone
    ? `phone=${phone}`
    : `email=${email}`;
  const BASE = `https://api.beta.rebuzzpos.com/api/business/users/roles/user?${queryParam}`;

  try {
    const response = await fetch(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Lookup failed" },
      { status: 500 },
    );
  }
}
