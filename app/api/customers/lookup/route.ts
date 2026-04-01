import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");
  const email = searchParams.get("email");
  const token = request.headers.get(
    "Authorization",
  );

  const queryParam = phone
    ? `phone=${phone}`
    : `email=${email}`;
  const externalUrl = `https://api.beta.rebuzzpos.com/api/business/users/roles/user?${queryParam}`;

  try {
    const response = await fetch(externalUrl, {
      headers: {
        Authorization: token || "",
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
