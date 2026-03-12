import Transactions from "@/components/dashboard/orderhistory/Transactions";

export default function Page() {
  return (
    <div className="p-4">
      <div>
        <h1 className="text-3xl font-bold">
          Order History
        </h1>
        <p className="text-gray-600">
          Browse and search all transactions
        </p>
      </div>
      <div className="flex flex-wrap">
        <div></div>
      </div>
      <Transactions
        transactions={[
          {
            id: "ORD-421",
            date: "Jan 20",
            timestamp: "10:00",
            customer: "John Marston",
            amount: "50.50",
            paymentMethod: "Loyalty",
            items: [
              { name: "Latte", quantity: 5 },
              { name: "Sandwich", quantity: 2 },
            ],
            status: "completed",
          },
          {
            id: "ORD-422",
            date: "Jan 20",
            timestamp: "9:00",
            customer: "Arthur Morgan",
            amount: "45.00",
            paymentMethod: "Cash",
            items: [
              {
                name: "Black Coffee",
                quantity: 5,
              },
              { name: "Cookies", quantity: 2 },
            ],
            status: "completed",
          },
        ]}
      />
    </div>
  );
}
