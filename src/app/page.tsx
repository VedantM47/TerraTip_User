"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Phone } from "lucide-react";

const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^[0-9]{10}$/, { message: "Invalid phone number" }),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [sentOTP, setSentOTP] = useState("312994"); // Simulated OTP
  const [enteredPhone, setEnteredPhone] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [step, timer]);

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handlePhoneSubmit = (data: PhoneFormData) => {
    setEnteredPhone(data.phone);
    setStep("otp");
    setTimer(300); // reset timer
    alert(`OTP sent to ${data.phone}: ${sentOTP}`);
  };

  const handleOTPSubmit = () => {
    const userOtp = otp.join("");
    if (userOtp === sentOTP) {
      alert("✅ Phone verified successfully!");
    } else {
      setOtpError("❌ Incorrect OTP. Please try again.");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg text-center space-y-6">
        {/* Logo and Title */}
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

        {/* Phone Step */}
        {step === "phone" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-black">Welcome</h2>
            <p className="text-sm text-gray-500">
              Sign in / Sign up with your phone number
            </p>

            <Form {...phoneForm}>
              <form
                onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
                className="space-y-4 text-left"
              >
                <FormField
                  control={phoneForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                          <span className="mr-2 text-sm font-semibold">IN</span>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            className="w-full border-none outline-none text-sm"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        Enter your 10-digit mobile number
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-emerald-200 hover:bg-emerald-300 text-emerald-900 font-semibold"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </form>
            </Form>

            <p className="text-[11px] text-gray-400 text-center mt-4">
              By continuing, you agree to our{" "}
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy Policy</span>
            </p>
          </div>
        )}

        {/* OTP Step */}
        {step === "otp" && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-black">Welcome</h2>
            <p className="text-sm text-gray-500">
              Enter the 6-digit code sent to your phone
            </p>

            {/* Verification message box */}
            <div className="bg-blue-50 text-sm text-gray-700 border border-blue-200 rounded-md p-3 flex gap-2 items-start">
              <div className="mt-0.5 text-blue-600">🛡️</div>
              <div>
                <p className="font-semibold">Verification required</p>
                <p>
                  Enter the 6-digit code sent to your phone. If you don’t receive it
                  within 30 seconds, you can request a new code.
                </p>
              </div>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                key={index}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                title={`Digit ${index + 1}`}
                aria-label={`Digit ${index + 1}`}
                maxLength={1}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={digit}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!/^\d?$/.test(val)) return;
                  const newOtp = [...otp];
                  newOtp[index] = val;
                  setOtp(newOtp);
                  if (val && inputRefs.current[index + 1]) {
                    inputRefs.current[index + 1]?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index] && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
              />
              
              ))}
            </div>

            {otpError && (
              <p className="text-sm text-red-500 text-center">{otpError}</p>
            )}

            {/* Resend + Timer */}
            <div className="text-sm text-gray-500 flex justify-between px-1">
              <span>
                Didn’t receive code?{" "}
                <button
                  className="text-emerald-600 underline"
                  onClick={() => {
                    setSentOTP("654321"); // Replace with real resend logic
                    setTimer(300);
                    alert("New OTP sent!");
                  }}
                >
                  Resend
                </button>
              </span>
              <span>{formatTime(timer)}</span>
            </div>

            <Button
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm"
              onClick={handleOTPSubmit}
            >
              🛡️ Verify
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
