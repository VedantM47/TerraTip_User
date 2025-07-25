import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/properties", label: "Properties" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7FA] to-[#E5F4F8] text-slate-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-4 sm:p-6">
          {/* Logo + Brand Name */}
          <Link href="/dashboard" className="flex items-center gap-2 transition hover:opacity-90">
            <Image src="/logo.svg" alt="TerraTip Logo" width={32} height={32} />
            <span className="text-xl font-bold text-teal-700">TerraTip</span>
          </Link>

          {/* Nav Links */}
          <div className="flex gap-4 text-sm sm:text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1 transition hover:bg-teal-100",
                  pathname === link.href && "bg-teal-200 font-semibold"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="mx-auto w-full max-w-4xl p-4 sm:p-6">{children}</main>
    </div>
  );
}
