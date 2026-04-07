import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  try {
    if (token) {
      await fetch(
        "https://api.beta.rebuzzpos.com/api/java/auth/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch (error) {
    console.error(
      "Backend logout failed:",
      error,
    );
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
