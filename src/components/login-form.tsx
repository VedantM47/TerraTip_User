"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Shield, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebaseConfig";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

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
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  useEffect(() => {
  if (typeof window !== "undefined" && !(window as any).recaptchaVerifier) {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {
          console.log("reCAPTCHA solved");
        },
        "expired-callback": () => {
          console.warn("reCAPTCHA expired");
        },
      },
    );
     }
}, []);

  const handlePhoneSubmit = async (data: PhoneFormData) => {
    const fullPhone = `+91${data.phone}`;
    setPhoneNumber(fullPhone);

    const appVerifier = (window as any).recaptchaVerifier;
    console.log("appVerifier", appVerifier)

    try {
      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      console.log("REsult", result)
      setConfirmationResult(result);
      alert(`✅ OTP sent to ${fullPhone}`);
      setShowOtpInput(true);
    } catch (err: any) {
      console.error("Error sending OTP:", err.message);
      alert("❌ Failed to send OTP: " + err.message);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedOtp = otp.trim();

    if (trimmedOtp.length !== 6) {
      alert("❗Please enter a 6-digit OTP.");
      return;
    }

    if (!confirmationResult) {
      alert("⚠️ OTP was not sent properly. Please try again.");
      return;
    }

    try {
      await confirmationResult.confirm(trimmedOtp);
      alert("✅ OTP Verified! You're logged in.");
    } catch (err: any) {
      console.error("OTP verification failed:", err.message);
      alert("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-800">TerraTip</h1>
          <div className="mb-8 mt-6 flex justify-center">
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
            <h2 className="mb-2 text-2xl font-bold text-gray-800">Welcome</h2>
            <p className="text-gray-500">Sign in / Sign up with your phone number</p>
          </div>

          <Form {...phoneForm}>
            <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-6">
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="block font-bold text-gray-600">Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="flex items-center rounded-sm border border-gray-300 px-4 py-2 focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-700">
                          <span className="mr-3 mt-1 text-xs font-semibold text-gray-500">IN</span>
                          <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="flex-1 bg-transparent outline-none"
                            {...field}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <p className="text-sm text-gray-400">Enter your 10-digit mobile number</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!showOtpInput && (
                <Button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-800 py-3 text-sm font-medium text-white hover:bg-teal-700"
                >
                  <Phone className="h-4 w-4" />
                  Sign In
                </Button>
              )}
            </form>
          </Form>

          {showOtpInput && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-left">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-6 text-gray-800" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Verification required</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Enter the 6-digit code sent to your phone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-left">
                <label className="mb-2 block font-bold text-gray-600">OTP</label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:border-teal-600 focus:ring-2 focus:ring-teal-700"
                  maxLength={6}
                />
              </div>

              <Button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-800 py-3 text-sm font-medium text-white hover:bg-teal-700"
              >
                <Shield className="h-4 w-4" />
                Verify
              </Button>
            </form>
          )}

          <p className="text-xs leading-relaxed text-gray-400">
            By continuing, you agree to our{" "}
            <span className="cursor-text text-sm text-gray-400">Terms of Service</span> and{" "}
            <span className="cursor-text text-sm text-gray-400">Privacy Policy</span>
          </p>
        </div>

        {/* 🔐 Invisible reCAPTCHA placeholder */}
        <div id="recaptcha-container" />
      </div>
    </div>
  );
};

export default LoginForm;
