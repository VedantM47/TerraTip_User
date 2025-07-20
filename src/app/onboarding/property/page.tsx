// src/app/onboarding/property/page.tsx
"use client";

import PropertyLocationForm from "@/components/onboarding/property-location-form";

export default function PropertyOnboardingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-xl">
        <PropertyLocationForm />
      </div>
    </main>
  );
}
