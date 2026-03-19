"use client";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { formatCurrency } from "@/lib/utils";

type Rank = 1 | 2 | 3;

type TopProduct = {
  rank: Rank;
  productName: string;
  noOfSale: number;
  totalRevenue: number;
};

type TopProductProps = {
  topProducts: TopProduct[];
};

type SingleProductProps = {
  product: TopProduct;
};

const rankStyles: Record<
  Rank,
  { badge: string }
> = {
  1: { badge: "bg-amber-200 text-amber-500" },
  2: { badge: "bg-gray-200 text-gray-500" },
  3: { badge: "bg-orange-200 text-orange-500" },
};

function TopProductItem({
  product,
}: SingleProductProps) {
  const styles = rankStyles[product.rank];
  const { currency } = useCurrency();

  return (
    <div className="flex items-center justify-between py-2 md:py-4">
      <div className="flex items-start gap-2">
        <span
          className={`font-semibold px-2 py-1 mt-1 border rounded-lg ${styles.badge}`}
        >
          #{product.rank}
        </span>
        <div>
          <p className="font-semibold">
            {product.productName}
          </p>
          <p className="text-[12px] text-gray-500">
            {product.noOfSale} sold
          </p>
        </div>
      </div>
      <span className="text-green-700 font-semibold">
        {formatCurrency(
          product.totalRevenue as number,
          currency,
        )}
      </span>
    </div>
  );
}

export default function TopItems({
  topProducts,
}: TopProductProps) {
  return (
    <div className="rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 p-2 md:p-4  flex-2">
      <h1 className="text-[16px] md:text-xl mt-1 font-semibold">
        Top 3 Items Today
      </h1>
      <p className="sm:text-[12px]">
        Best performers in today&apos;s session
      </p>
      {!topProducts ||
      topProducts.length === 0 ? (
        <div className="flex items-center justify-center py-4 md:py-8 text-gray-400">
          <p>No sales data available</p>
        </div>
      ) : (
        topProducts.map((product) => (
          <TopProductItem
            key={product.rank}
            product={product}
          />
        ))
      )}
    </div>
  );
}
