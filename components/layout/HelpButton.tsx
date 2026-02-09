import { HelpCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function HelpButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="bg-blue-100"
    >
      <HelpCircle className="h-5 w-5 text-gray-600" />
    </Button>
  );
}
