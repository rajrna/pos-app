import {
  SlowProduct,
  slowProductColumns,
} from "./slow-product-columns";
import { DataTable } from "@/components/ui/data-table";

type SlowProductsProps = {
  slowProducts: SlowProduct[];
};

export default function SlowProducts({
  slowProducts,
}: SlowProductsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 w-full">
      <h1 className="font-semibold text-[17px]">
        Slow Moving Products
      </h1>
      <p className="text-gray-700">
        No sales in 3+ days, attention required.
      </p>

      <DataTable
        columns={slowProductColumns}
        data={slowProducts}
        pageSize={5}
      />
      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Days Idle</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slowProducts.map((product) => {
            const { text } = getDaysColor(
              product.days,
            );
            return (
              <TableRow key={product.name}>
                <TableCell className="font-semibold">
                  {product.name}
                </TableCell>
                <TableCell
                  className={`font-semibold ${text}`}
                >
                  {product.days} days
                </TableCell>
                <TableCell className="text-gray-500">
                  {product.stockAmount} units
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
    </div>
  );
}
