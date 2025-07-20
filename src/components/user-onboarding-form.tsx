// src/components/user-onboarding-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email("Invalid email").optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;
const userPhone = "9876543210"; // Later from context/api

export default function UserOnboardingForm() {
  const router = useRouter();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("User Info:", { ...data, phone: userPhone });
    router.push("/onboarding/property");
  };

  return (
    <div className="rounded-2xl bg-white px-6 py-8 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-teal-800">Complete Signup</h1>
        <p className="mt-1 text-sm text-gray-500">Just a few more details to get started</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <Input value={userPhone} disabled className="bg-gray-100 text-gray-500" />
          </div>
          <Button type="submit" className="w-full bg-teal-700 text-white hover:bg-teal-600">
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}
