// app/api/auth/login/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server";
import {
  LoginRequest,
  LoginResponse,
} from "@/lib/types/auth";

export async function POST(req: NextRequest) {
  const body: LoginRequest = await req.json();

  const res = await fetch(
    "https://api.beta.rebuzzpos.com/api/java/auth/login/pos",

    // "https://appapi.rebuzzpos.com/api/java/auth/login/pos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        app: "user",
      },
      body: JSON.stringify({
        hasKey: "any",
        keykey: "any",
        hasValueFor: "any",
        deviceToken: "any",
        ...body,
      }),
    },
  );

  const json: LoginResponse = await res.json();

  if (json.status !== "success") {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    ok: true,
    data: json.data,
  });

  // Set token in httpOnly cookie — JS can't read this
  response.cookies.set("token", json.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
