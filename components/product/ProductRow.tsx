import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";
import { formatCurrency } from "@/utils/helper";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

// import toast from "react-hot-toast";

export default function ProductRow({ product }) {
  const {
    image,
    id: productId,
    name,
    price,
    category,
  } = product;

  const queryClient = useQueryClient();
  //   const { isPending: isDeleting, mutate } =
  //     useMutation({
  //       mutationFn: (id) => deleteCustomer(id),
  //       onSuccess: () => {
  //         toast.success("Cabin deleted");
  //         queryClient.invalidateQueries({
  //           queryKey: ["customer"],
  //         });
  //       },
  //       onError: (err) => toast.error(err.message),
  //     });
  return (
    <TableRow
      key={productId}
      className="border-b last:border-0"
    >
      <TableCell>{image || "T-T"}</TableCell>
      <TableCell className="font-medium text-gray-900">
        {name || "-"}
      </TableCell>
      <TableCell className="text-gray-700">
        {category || "—"}
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            {formatCurrency(price)}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border border-blue-200 hover:bg-blue-50"
            >
              <ChevronDown className="h-4 w-4 text-blue-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem className="text-red-600">
              <button
                onClick={() => mutate(productId)}
                // disabled={}
              >
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
