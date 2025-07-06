"use client";
import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/Profile");
  };
  const handleLogout = () => {
    
    router.push("/");
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between border-b bg-white px-4 py-3 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6">
            {/* TerraTip SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-0.5 -0.5 16 16"
              fill="none"
              stroke="#2e6e5e"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7.5 5 3.75 -1.875 -3.75 -1.875v6.25" strokeWidth="1" />
              <path
                d="m5 7.49375 -3.4375 1.9625a0.625 0.625 0 0 0 0 1.0875l5.3125 3.0375a1.25 1.25 0 0 0 1.25 0l5.3125 -3.0375a0.625 0.625 0 0 0 0 -1.0875L10 7.5"
                strokeWidth="1"
              />
              <path d="m4.05625 8.03125 6.8875 3.9375" strokeWidth="1" />
              <path d="M10.94375 8.03125 4.0625 11.96875" strokeWidth="1" />
            </svg>
          </div>
          <span className="text-xl font-bold text-green-700">Terra Tip</span>
        </div>

        {/* Hamburger Icon */}
        <div className="relative">
          <button
            className="text-gray-700"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-10 z-50 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
              <div className="border-b px-4 py-2 text-sm font-semibold text-gray-700">
                My Account
              </div>
              <ul className="py-1">
                <li
                  onClick={handleProfileClick}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <User className="h-4 w-4" /> Profile
                </li>
                <li
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="p-4">{/* Blank content */}</div>
    </div>
  );
}
