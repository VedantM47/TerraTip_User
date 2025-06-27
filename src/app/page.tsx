"use client";

import { Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneSchema = z.object({
  phone: z
    .string()
    .length(10, { message: "Phone number must be 10 digits" })
    .regex(/^\d{10}$/, { message: "Invalid phone number" }),
});

type PhoneData = z.infer<typeof phoneSchema>;

export default function LoginPage() {
  const form = useForm<PhoneData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = (data: PhoneData) => {
    alert(`OTP sent to ${data.phone}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-lg p-6 space-y-6 text-center">
        {/* Logo */}
        <div className="flex justify-center items-center gap-2">
          <div className="w-10 h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-0.5 -0.5 16 16"
              fill="none"
              stroke="#2e6e5e"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <desc>Land Plot Icon - TerraTip Logo</desc>
              <path d="m7.5 5 3.75 -1.875 -3.75 -1.875v6.25" strokeWidth="1" />
              <path
                d="m5 7.49375 -3.4375 1.9625a0.625 0.625 0 0 0 0 1.0875l5.3125 3.0375a1.25 1.25 0 0 0 1.25 0l5.3125 -3.0375a0.625 0.625 0 0 0 0 -1.0875L10 7.5"
                strokeWidth="1"
              />
              <path d="m4.05625 8.03125 6.8875 3.9375" strokeWidth="1" />
              <path d="M10.94375 8.03125 4.0625 11.96875" strokeWidth="1" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-emerald-700">TerraTip</h1>
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-black">Welcome</h2>
          <p className="text-sm text-gray-500">
            Sign in / Sign up with your phone number
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="mr-2 text-sm font-semibold">🇮🇳</span>
              <input
                {...form.register("phone")}
                type="text"
                placeholder="Enter your phone number"
                className="w-full border-none outline-none text-sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter your 10-digit mobile number
            </p>
            {form.formState.errors.phone && (
              <p className="text-xs text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-200 hover:bg-emerald-300 text-emerald-900 font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Sign In
          </button>
        </form>

        <p className="text-[11px] text-gray-400 text-center mt-4">
          By continuing, you agree to our{" "}
          <span className="underline">Terms of Service</span> and{" "}
          <span className="underline">Privacy Policy</span>
        </p>
      </div>
    </main>
  );
}
<div className="bg-red-500 text-white p-4 rounded-lg text-center">
  Tailwind is working!
</div>
