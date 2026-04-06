"use client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function Page() {
  const { invoice } = useParams();
  //   const { data, isLoading, error } =
  //     useTicketDetails(invoice as string);
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="md:text-4xl text-3xl font-bold text-gray-900">
          Update Invoice
        </h1>
        <div className="flex items-center gap-3">
          <Button
            // onClick={handleSave}
            // disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 z-100 rounded-2xl"
          >
            {/* {isPending
              ? "Saving..."
              : "Save and Continue"} */}
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
