// import { CreateTicketInput } from "@/lib/types/ticket";
// import { createTicket } from "@/services/apiInvoice.client";

// import {
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export function useCreateInvoice() {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   return useMutation({
//     mutationFn: (data: CreateTicketInput) =>
//       createTicket(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["invoices"],
//       });
//       toast.success(
//         "Invoice created successfully!",
//       );
//       router.push("/invoices"); // update path as needed
//     },
//     onError: (error: Error) => {
//       toast.error(
//         `Failed to create invoice: ${error.message}`,
//       );
//     },
//   });
// }
import { useMutation } from "@tanstack/react-query";
import { CreateTicketInput } from "@/lib/types/ticket";

const API_URL =
  "https://api.beta.rebuzzpos.com/api/business/ticket";

async function createInvoice(
  data: CreateTicketInput,
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add your auth token here if required, e.g.:
      // "Authorization": `Bearer ${yourToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response
      .json()
      .catch(() => ({}));
    throw new Error(
      errorBody?.message ??
        `Request failed with status ${response.status}`,
    );
  }

  return response.json(); // returns the created invoice, including its `id`
}

export function useCreateInvoice() {
  return useMutation({
    mutationFn: createInvoice,
  });
}
