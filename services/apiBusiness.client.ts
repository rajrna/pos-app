interface Business {
  _id: string;
  businessName: string;
  adminId: string;
  address: string;
  panNumber: number;
  owner: string;
  businessType: string;
  showInOrdering: boolean;
  phoneNumber: string;
  accurateLocation: string;
}
type BusinessFormValues = {
  businessName: string;
  address: string;
  accurateLocation?: string;
  phoneNumber: string;

  panNumber: number;
  owner: string;
  businessType: string;
};
export async function fetchBusinessData(): Promise<Business> {
  const res = await fetch("/api/admin/profile");
  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({}));
    throw new Error(
      errorData.message ||
        "Failed to fetch business data",
    );
  }
  const rawData = await res.json();
  const data = rawData?.data?.business || [];
  return data;
}

export async function updateBusinessData({
  businessData,
}: {
  businessData: BusinessFormValues;
}) {
  const res = await fetch("/api/admin/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(businessData),
  });

  const result = await res.json();
  if (!res.ok || result.status !== "success") {
    throw new Error(
      result.message ||
        "Failed to update business data",
    );
  }
  return result;
}
