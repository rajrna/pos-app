import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL =
  "https://api.beta.rebuzzpos.com/api/business/ticket";

export async function DELETE(
  request: Request,
  {
    params,
  }: { params: Promise<{ invoice: string }> },
) {
  const { invoice } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const res = await fetch(
      `${BASE_URL}/${invoice}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
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
