import { DataTable } from "@/components/ui/data-table";
import {
  budgetColumns,
  BudgetItem,
} from "./budget-column";

export default function BudgetTable({
  budgetData,
}: {
  budgetData: BudgetItem[];
}) {
  return (
    <div className="flex-2 min-w-95 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 py-8 px-4">
      <h1 className="font-semibold text-xl">
        Budget vs Actual
      </h1>
      <p className="text-gray-500">
        Spending vs Planned Budget per Category
      </p>

      <DataTable
        columns={budgetColumns}
        data={budgetData}
        pageSize={10}
      />
    </div>
  );
}
