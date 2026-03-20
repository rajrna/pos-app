"use client";
import { ErrorBoundary } from "react-error-boundary";
import ChartError from "./charterror";

export default function ChartErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ChartError}>
      {children}
    </ErrorBoundary>
  );
}
