import { Button } from "../ui/button";

export default function Pagination() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        1–1 of 1
      </span>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled
        >
          <span className="text-gray-400">‹</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled
        >
          <span className="text-gray-400">›</span>
        </Button>
      </div>
    </div>
  );
}
