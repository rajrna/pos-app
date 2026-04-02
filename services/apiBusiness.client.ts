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

export async function fetchBusinessData(): Promise<Business> {
  const res = await fetch("/api/admin/profile");
  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({}));
    throw new Error(
      errorData.message ||
        "Failed to fetch products",
    );
  }
  const rawData = await res.json();
  const data = rawData?.data?.business || [];
  return data;
}
