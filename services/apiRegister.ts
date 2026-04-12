type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
};

type RegisterResult =
  | { success: true; data: unknown }
  | { success: false; error: string };

export async function registerUser(
  businessSlug: string,
  payload: RegisterPayload,
): Promise<RegisterResult> {
  try {
    const res = await fetch(
      //   `https://appapi.rebuzzpos.com/api/java/auth/register`,
      `https://api.beta.rebuzzpos.com/api/${businessSlug}/auth/register/pos`,
      // `https://appapi.rebuzzpos.com/api/${businessSlug}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "",
          address: "",
          ...payload,
        }),
      },
    );

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
      const errorMessages = Object.values(
        data.data as Record<string, string>,
      ).join(", ");
      return {
        success: false,
        error: errorMessages,
      };
    }
    return { success: true, data };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}
