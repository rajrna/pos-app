import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE =
  "https://api.beta.rebuzzpos.com/api/business/ticket";

export async function PUT(
  request: Request,
  {
    params,
  }: { params: Promise<{ invoice: string }> },
) {
  const { invoice } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const body = await request.json();

  try {
    const response = await fetch(
      `${BASE}/${invoice}/update-ticketName`,
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
      { error: "Failed to update ticket" },
      { status: 500 },
    );
  }
}
