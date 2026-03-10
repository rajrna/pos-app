import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Shift = {
  label: string;
  orders: number;
  avgTime: string;
  revenue: string;
  staff: number;
};

type ShiftAnalysisReportProps = {
  title?: string;
  description?: string;
  shifts: Shift[];
};

export default function ShiftAnalysisReport({
  title = "Shift Analysis Report",
  description = "Performance comparison across morning, afternoon, and evening",
  shifts,
}: ShiftAnalysisReportProps) {
  return (
    <div className="border min-w-56 px-10 py-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <h1 className="font-semibold">{title}</h1>
      <p>{description}</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Shift</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Avg Time</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Staff</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shifts.map((shift) => (
            <TableRow
              key={shift.label}
              className="border-b-2"
            >
              <TableCell>{shift.label}</TableCell>
              <TableCell className="font-bold">
                {shift.orders}
              </TableCell>
              <TableCell className="text-gray-600">
                {shift.avgTime}
              </TableCell>
              <TableCell className="text-green-600 font-semibold">
                {shift.revenue}
              </TableCell>
              <TableCell>{shift.staff}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
