const BASE = "https://api.beta.rebuzzpos.com/api";

type ApiResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

function extractError(data: any): string {
  return Object.values(
    data.data as Record<string, string>,
  ).join(", ");
}

export async function verifyToken(
  slug: string,
  email: string,
  token: string,
): Promise<ApiResult> {
  try {
    const res = await fetch(
      `${BASE}/${slug}/auth/email_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      },
    );
    const data = await res.json();
    if (!res.ok)
      return {
        success: false,
        error:
          data?.message ?? `Error ${res.status}`,
      };
    if (data.status === "fail")
      return {
        success: false,
        error: extractError(data),
      };
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

export async function resendToken(
  slug: string,
  email: string,
): Promise<ApiResult> {
  try {
    const res = await fetch(
      `${BASE}/${slug}/auth/email_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );
    const data = await res.json();
    if (!res.ok)
      return {
        success: false,
        error:
          data?.message ?? `Error ${res.status}`,
      };
    if (data.status === "fail")
      return {
        success: false,
        error: extractError(data),
      };
    return { success: true, data };
  } catch {
    return {
      success: false,
      error:
        "Failed to resend code. Please try again.",
    };
  }
}
