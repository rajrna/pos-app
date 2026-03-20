export default function ChartError() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full h-64 flex flex-col items-center justify-center gap-2">
      <p className="text-gray-600 font-medium text-sm">
        Failed to load chart
      </p>
      <p className="text-gray-400 text-xs">
        Please refresh the page
      </p>
    </div>
  );
}
