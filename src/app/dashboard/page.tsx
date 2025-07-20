"use client";
import PropertyGrowthChart from "@/components/dashboard/property-growth-chart";
import AddPropertyModal from "@/components/dashboard/add-property-modal";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-4 sm:p-6 md:p-8">
      {/* Growth Section */}
      <section className="rounded-xl bg-white p-4 shadow-sm dark:bg-card">
        <h2 className="mb-3 text-xl font-semibold text-foreground sm:text-2xl">
          📈 Property Value Growth
        </h2>
        <PropertyGrowthChart />
      </section>

      {/* Property Section */}
      <section className="rounded-xl bg-white p-4 shadow-sm dark:bg-card">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">🏠 Your Properties</h2>
          <AddPropertyModal />
        </div>
      </section>
    </main>
  );
}
