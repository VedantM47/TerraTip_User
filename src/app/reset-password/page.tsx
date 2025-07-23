import { Suspense } from "react";
import PasswordResetForm from "@/components/password-reset-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<p className="text-gray-500">Loading form...</p>}>
        <PasswordResetForm />
      </Suspense>
    </div>
  );
}
