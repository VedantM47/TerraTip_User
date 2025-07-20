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

// Simulated user data (in real app, get from context or API)
const userPhone = "9876543210";

export default function HomePage() {
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
    router.push("/property");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-teal-800">Complete Signup</h1>
          <p className="mt-1 text-sm text-gray-500">Just a few more details to get started</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" className="rounded-lg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone (disabled) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
              <Input
                type="tel"
                value={userPhone}
                disabled
                className="rounded-lg bg-gray-100 text-gray-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-lg bg-teal-700 py-3 text-sm font-medium text-white hover:bg-teal-600"
            >
              Next
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
