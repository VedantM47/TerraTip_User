"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    // Simulate API call here
    const isFirstTime = true; // replace with real check
    if (isFirstTime) {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-xl">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="-0.5 -0.5 16 16"
            fill="none"
            stroke="#2e6e5e"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4"
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
          <h1 className="text-3xl font-semibold text-teal-800">TerraTip</h1>
          <p className="mt-2 text-sm text-gray-500">Login with your email and password</p>
        </div>

        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-500">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="flex-1 bg-transparent text-sm outline-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-500">
                      <Lock className="h-4 w-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="flex-1 bg-transparent text-sm outline-none"
                        {...field}
                      />
                      <button
                        type="button"
                        className="ml-2 text-gray-500 focus:outline-none"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-lg bg-teal-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-600"
            >
              Login
            </Button>
          </form>
        </Form>

        <p className="mt-8 text-center text-xs text-gray-400">
          By continuing, you agree to our{" "}
          <span className="underline underline-offset-2">Terms</span> &{" "}
          <span className="underline underline-offset-2">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
