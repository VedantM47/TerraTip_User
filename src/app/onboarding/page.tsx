// src/app/onboarding/page.tsx
"use client";

import UserOnboardingForm from "@/components/user-onboarding-form";

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <UserOnboardingForm />
      </div>
    </main>
  );
}
