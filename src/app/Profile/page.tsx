"use client";
import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Simulated user state
  const [name, setName] = useState("John Doe");
  const [phone] = useState("9876543210");
  const [email, setEmail] = useState("john@example.com");

  const handleUpdate = () => {
    alert(`✅ Updated!\nName: ${name}\nEmail: ${email}`);
    // Here you’d send data to backend
  };

  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/Profile"); // or router.refresh() if you're already there
  };
  const handleLogout = () => {
    router.push("/");
  };

  
  return (
    <div>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between border-b bg-white px-4 py-3 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6">
            {/* Logo */}
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
        <div className="relative md:hidden">
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

          {menuOpen && (
            <div className="absolute right-0 top-10 z-50 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
              <div className="border-b px-4 py-2 text-sm font-semibold text-gray-700">
                My Account
              </div>
              <ul className="py-1">
                <li className="flex cursor-not-allowed items-center gap-2 px-4 py-2 text-gray-400">
                  <User className="h-4 w-4" /> Profile
                </li>

                <li
                  
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Profile Form */}
      <div className="mx-auto mt-10 max-w-md space-y-6 p-4">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              placeholder="."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phone}
              disabled
              className="mt-1 w-full rounded border bg-gray-100 p-2 text-gray-500"
              placeholder="."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              placeholder="."
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full rounded bg-teal-700 py-2 text-white hover:bg-teal-600"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
