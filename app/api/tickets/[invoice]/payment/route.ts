import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL =
  "https://api.beta.rebuzzpos.com/api/business/ticket";

export async function PUT(
  request: Request,
  {
    params,
  }: { params: Promise<{ invoice: string }> },
) {
  const { invoice } = await params;
  console.log(invoice);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await request.json();

  try {
    const res = await fetch(
      `${BASE_URL}/${invoice}/make-payment`,
      {
        method: "PUT",
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
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
