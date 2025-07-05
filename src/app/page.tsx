
"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';
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

const Index = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [sentOTP, setSentOTP] = useState("312994");
  const [, setEnteredPhone] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(300);

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
    setTimer(300);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-lg p-6 text-center shadow-md">
        {/* Logo and Title */}
        <div className="text-center">
        <h1 className="text-3xl font-bold text-teal-800 " >TerraTip</h1>


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

        {/* Phone Step */}
        {step === "phone" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
              <p className= "text-gray-500">Sign in / Sign up with your phone number</p>
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
                      <FormLabel className="block font-bold text-gray-600 ">Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="flex items-center border text- border-gray-300 rounded-sm px-4 py-2 focus-within:ring-2 focus-within:ring-teal-700 focus-within:border-teal-600">
                             <span className="mr-3 text-gray-500 font-semibold text-xs mt-1 ">IN</span>

                            <input
                              type="tel"
                              placeholder="Enter your phone number"
                              className="flex-1 outline-none bg-transparent"
                              {...field}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <p className="text-sm text-gray-400 ">
                        Enter your 10-digit mobile number
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-teal-800 hover:bg-teal-700 text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Sign In
                </Button>
              </form>
            </Form>

            <p className="text-xs text-gray-400 leading-relaxed">
              By continuing, you agree to our{" "}
              <span className=" text-gray-400 cursor-text text-sm">Terms of Service</span>{" "}
              and{" "}
              <span className=" text-gray-400  cursor-text text-sm">Privacy Policy</span>
            </p>
          </div>
        )}

        {/* OTP Step */}
        {step === "otp" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome</h2>
              <p className="text-gray-600">Enter the 6-digit code sent to your phone</p>
            </div>

            {/* Verification Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <div className="flex items-start space-x-3">
              <Shield className="w-6 h-5 text-gray-800" />
                <div>
                  <p className="font-semibold text-sm text-gray-900">Verification required</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Enter the 6-digit code sent to your phone. If you don't receive it within 30
                    seconds, you can request a new code.
                  </p>
                </div>
              </div>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-800 focus:border-teal-700"
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
                  placeholder="."
                />
                
              ))}
            </div>

            {otpError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {otpError}
              </p>
            )}

            {/* Resend and Timer */}
            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="font-semibold  text-gray-600">Didn't receive code? </span>
                <button
                  className="font-semibold text-teal-600 hover:text-teal-700 "
                  onClick={() => {
                    setSentOTP("654321");
                    setTimer(300);
                    setOtpError("");
                    alert("New OTP sent!");
                  }}
                >
                  Resend
                </button>
              </div>
              <span className="text-gray-500 font-mono">{formatTime(timer)}</span>
            </div>

            <Button
              className="w-full bg-teal-800 hover:bg-teal-700 text-white py-3 rounded-lg font-medium text-sm"
              onClick={handleOTPSubmit}
            >
              <Shield className="w-5 h-8 text-gray-200" /> <p className=" text-gray-200 text-lg">Verify</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index