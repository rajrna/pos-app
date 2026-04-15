import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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
  const data = await res.json();
  return NextResponse.json(data, {
    status: res.status,
  });
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const body = await request.json();

  try {
    const response = await fetch(
      "https://api.beta.rebuzzpos.com/api/business/aboutBusiness",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const result = await response.json();
    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update business" },
      { status: 500 },
    );
  }
}
