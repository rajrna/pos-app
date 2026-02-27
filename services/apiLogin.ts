const BASE = "https://appapi.rebuzzpos.com/api";

type LoginPayload = {
  email_or_phone: string;
  password: string;
  deviceToken: string;
};

type ApiResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

function extractError(data: any): string {
  if (typeof data.data === "string")
    return data.data;
  if (typeof data.data?.message === "string")
    return data.data.message;
  return Object.values(
    data.data as Record<string, string>,
  ).join(", ");
}

export async function loginUser(
  slug: string,
  payload: LoginPayload,
): Promise<ApiResult> {
  try {
    const res = await fetch(
      `${BASE}/${slug}/auth/login/pos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    // const text = await res.text();
    // console.log("Raw response:", text);
    // const data = JSON.parse(text);
    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error:
          data?.message ??
          `Request failed with status ${res.status}`,
      };
    }

    if (data.status === "fail") {
      return {
        success: false,
        error: extractError(data),
      };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}
