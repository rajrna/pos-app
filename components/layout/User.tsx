import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
export default function User() {
  return (
    <div className="bg-blue-100 rounded-[8px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-3"
          >
            <span className="font-medium text-gray-900">
              Meowtrix
            </span>
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 hover:bg-gray-100"
            >
              STARTER
            </Badge>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48"
        >
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
