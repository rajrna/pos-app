import VerifyForm from "@/components/dashboard/signup/VerifyForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <VerifyForm />
    </Suspense>
  );
}
