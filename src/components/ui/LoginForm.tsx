"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Shield, Phone } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^[0-9]{10}$/, { message: "Invalid phone number" }),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

const LoginForm = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [sentOTP] = useState("312994"); // Simulated OTP

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handlePhoneSubmit = (data: PhoneFormData) => {
    // Simulate OTP being sent
    alert(`OTP sent to ${data.phone}: ${sentOTP}`);
    setShowOtpInput(true);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entered OTP:", otp);
    console.log("Expected OTP:", sentOTP);
  
    const trimmedOtp = otp.trim();
  
    if (trimmedOtp.length !== 6) {
      alert("❗Please enter a 6-digit OTP.");
      return;
    }
  
    if (trimmedOtp === sentOTP) {
        console.log("FORM SUBMITTED ✅");
      alert("✅ OTP Verified!");
    } else {
      alert("❌ Incorrect OTP. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-lg p-6 text-center shadow-md">
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-800">TerraTip</h1>

          {/* SVG Logo */}
          <div className="mt-6 mb-8 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
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
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
            <p className="text-gray-500">Sign in / Sign up with your phone number</p>
          </div>

          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
              className="space-y-6"
            >
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="block font-bold text-gray-600">Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="flex items-center border border-gray-300 rounded-sm px-4 py-2 focus-within:ring-2 focus-within:ring-teal-700 focus-within:border-teal-600">
                          <span className="mr-3 text-gray-500 font-semibold text-xs mt-1">IN</span>
                          <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="flex-1 outline-none bg-transparent"
                            {...field}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <p className="text-sm text-gray-400">
                      Enter your 10-digit mobile number
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!showOtpInput && (
                <Button
                  type="submit"
                  className="w-full bg-teal-800 hover:bg-teal-700 text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Sign In
                </Button>
              )}
            </form>
          </Form>

          {/* OTP Input - Only shown after phone validation */}
          {showOtpInput && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-5 text-gray-800" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Verification required</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Enter the 6-digit code sent to your phone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-left">
                <label className="block font-bold text-gray-600 mb-2">OTP</label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-teal-700 focus:border-teal-600"
                  maxLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-800 hover:bg-teal-700 text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Verify
              </Button>
            </form>
          )}

          <p className="text-xs text-gray-400 leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="text-gray-400 cursor-text text-sm">Terms of Service</span>{" "}
            and{" "}
            <span className="text-gray-400 cursor-text text-sm">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;