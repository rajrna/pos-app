import { CreateDiscountDialog } from "./CreateDiscount";

interface DiscountCreationProps {
  subtotal: number;
  finalTotal: number;
}

export default function InvoiceDiscountCreate({
  subtotal,
  finalTotal,
}: DiscountCreationProps) {
  return (
    <>
      <div className="flex justify-between w-max-50 items-center py-4 border-t border-b bg-gray-50/50 px-4">
        <div className="flex flex-col">
          <CreateDiscountDialog />
        </div>

        <div className="text-right space-y-1">
          <div className="flex justify-end gap-8 text-sm">
            <span className="text-gray-500">
              Subtotal
            </span>
            <span className="font-semibold">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-end gap-8 text-lg font-bold text-blue-600">
            <span>Grand Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
