"use client";

import { useState } from "react";
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
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { resetPasswordApi } from "@/lib/utils/api/auth";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function PasswordResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetPasswordApi({
      ...data,
      token,
      email,
      name,
      phone,
    })
      .then(() => {
        toast.success("Password reset successfully. Please login.");
        router.push("/");
      })
      .catch((error) => {
        console.error("Error resetting password:", error);

        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to reset password. Try again.";

        toast.error(message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-semibold text-teal-800">
          <ShieldCheck className="h-6 w-6 text-teal-700" />
          Reset Password
        </h1>
        <p className="mt-1 text-sm text-gray-500">Choose a new password to secure your account</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            const result = resetPasswordSchema.safeParse(data);
            if (!result.success) {
              const issues = result.error.issues;
              const msg =
                issues.find((i) => i.path.includes("confirmPassword"))?.message ||
                issues[0]?.message ||
                "Invalid input";
              toast.error(msg);
              return;
            }
            onSubmit(data);
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-600" />
                  New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-600" />
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-700 text-white transition-colors hover:bg-teal-600"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
