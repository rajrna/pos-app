import { Search } from "lucide-react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "../ui/pop-calendar";
// import { Calendar } from "../ui/calendar";
export default function InvoiceFilters() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Badge
          variant="outline"
          className="rounded-full bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
        >
          0
        </Badge>
        <span className="text-sm text-gray-600">
          active filters
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Select defaultValue="all-customers">
          <SelectTrigger className="w-70 bg-white">
            <SelectValue placeholder="All customers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-customers">
              All customers
            </SelectItem>
            <SelectItem value="customer-1">
              Customer 1
            </SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-statuses">
          <SelectTrigger className="w-50 bg-white">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-statuses">
              All statuses
            </SelectItem>
            <SelectItem value="draft">
              Draft
            </SelectItem>
            <SelectItem value="unpaid">
              Unpaid
            </SelectItem>
            <SelectItem value="paid">
              Paid
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 max-w-50">
          <DatePicker text={"From"} />
        </div>

        <div className="relative flex-1 max-w-50">
          <DatePicker text={"To"} />
        </div>

        <div className="relative flex-1 max-w-75">
          <Input
            type="text"
            placeholder="Enter invoice #"
            className="bg-white pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
