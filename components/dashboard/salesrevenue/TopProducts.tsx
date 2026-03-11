import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TopProduct = {
  name: string;
  category: string;
  revenue: string;
  percent: number;
};

type TopProductsProps = {
  topProducts: TopProduct[];
};

export default function TopProducts({
  topProducts,
}: TopProductsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-w-150">
      <h1 className="font-semibold text-[17px]">
        Top Selling Products
      </h1>
      <p className="text-gray-700">
        Products contributing most to revenue
        growth
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((product) => {
            return (
              <TableRow key={product.name}>
                <TableCell className="font-semibold">
                  {product.name}
                </TableCell>
                <TableCell>
                  {product.category}
                </TableCell>
                <TableCell className="font-semibold">
                  {product.revenue}
                </TableCell>
                <TableCell>
                  <p
                    className={`w-12 flex items-center justify-center rounded-lg px-1`}
                  >
                    {product.percent}%
                  </p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
