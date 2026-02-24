interface TopItemProps {
  number: number;
  productName: string;
  noOfSale: number;
  price: number;
  numBgColor: string;
  numTextColor: string;
}

function TopItem({
  number,
  productName,
  noOfSale,
  price,
  numBgColor,
  numTextColor,
}: TopItemProps) {
  return (
    <div className="flex items-center justify-between py-4 ">
      <div className="flex items-start gap-2">
        <span
          className={`${numBgColor} ${numTextColor} font-semibold px-2 py-1 mt-1 border rounded-lg`}
        >
          # {number}
        </span>
        <div>
          <p className="font-semibold">
            {productName}
          </p>
          <p className="text-[12px] text-gray-500">
            {noOfSale} sold
          </p>
        </div>
      </div>

      <span className="text-green-700 font-semibold">
        ${price}
      </span>
    </div>
  );
}

export default function TopItems() {
  return (
    <div className="rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 p-4 min-w-70 flex-2">
      <h1 className="text-xl font-semibold">
        Top 3 Items Today
      </h1>
      <p className="">
        Best performers in today&apos;s session
      </p>
      <TopItem
        number={1}
        productName={"Classic Latte"}
        noOfSale={20}
        price={500}
        numBgColor={"bg-amber-200"}
        numTextColor={"text-amber-500"}
      />
      <TopItem
        number={2}
        productName={"Iced Caramel Macchiato"}
        noOfSale={30}
        price={600}
        numBgColor={"bg-gray-200"}
        numTextColor={"text-gray-500"}
      />

      <TopItem
        number={3}
        productName={"Toast"}
        noOfSale={50}
        price={700}
        numBgColor={"bg-orange-200"}
        numTextColor={"text-orange-500"}
      />
    </div>
  );
}
