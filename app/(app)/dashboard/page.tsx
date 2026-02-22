import StatBox from "@/components/dashboard/StatBox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BanknoteArrowUp,
  DollarSign,
  Flame,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="  w-295 px-2">
      <div className="flex justify-between items-center w-290 px-3 py-2">
        <div className="py-4">
          {/* for header text */}
          <h1 className="font-bold text-2xl">
            Dashboard Overview
          </h1>
          <p>
            Welcome back, Ek. What is happening
            with Rebuzz pos
          </p>
        </div>
        <div>
          {/* for header buttons */}
          <Button>
            <Link href="/invoices/add">
              Create order
            </Link>
          </Button>
        </div>
      </div>
      <div className="px-2 flex items-center justify-between border-b-2 py-2">
        <div className="gap-2 flex">
          {/* for buttons */}
          <Button>
            <LayoutDashboard />
            Overview
          </Button>
          <Button>
            <BanknoteArrowUp />
            Growth Tracker
          </Button>
          <Button>
            <Flame />
            Heatmap
          </Button>
        </div>
        <div className="flex justify-between items-center gap-1">
          <p>FILTER BY:</p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Last week" />
            </SelectTrigger>
          </Select>
        </div>
      </div>

      {/* actual contents */}
      <div>
        <div className="flex items-center justify-center">
          <StatBox
            statTitle="Total Sales"
            amount={999999}
            percent={12}
          />
          <StatBox
            statTitle="Total Orders"
            amount={1234}
            percent={10}
          />
          <StatBox
            statTitle="Total Orders"
            amount={1234}
            percent={10}
          />
          <StatBox
            statTitle="Total Orders"
            amount={1234}
            percent={10}
          />
        </div>
      </div>
    </div>
  );
}
