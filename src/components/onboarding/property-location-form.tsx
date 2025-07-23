"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LocationPickerMap from "@/components/location-picker-map";
import { addProperty } from "@/lib/utils/api/property";

const propertySchema = z.object({
  size: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "Size must be a number" })
      .min(1, { message: "Size must be greater than 0" })
  ),
  areaType: z.string().min(1, { message: "Area type is required" }),
  landType: z.string().min(1, { message: "Land type is required" }),
  coordinates: z.object({
    latitude: z.string().min(1, "Latitude required"),
    longitude: z.string().min(1, "Longitude required"),
  }),
});

type PropertyFormData = z.infer<typeof propertySchema>;

const PropertyLocationForm = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [latLng, setLatLng] = useState({ lat: "", lng: "" });

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      size: 100,
      areaType: "COMMERCIAL",
      landType: "",
      coordinates: {
        latitude: "",
        longitude: "",
      },
    },
  });

  const handleSubmit = async (data: PropertyFormData) => {
    console.log("Submitting form:", data);

    await addProperty(data)
      .then(() => {
        toast.success("Property added successfully!");
        router.push("/dashboard");
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || "Failed to add property. Please try again.";
        toast.error(msg);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-teal-800">Add Your First Property</h1>
          <p className="text-sm text-gray-500">Use the map or search to pinpoint your property</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              (data) => {
                handleSubmit(data);
              },
              (errors) => {
                if (Object.keys(errors).length > 0) {
                  toast.error("Please fix the highlighted errors.");
                }
              }
            )}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size (sqft)</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="areaType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area Type</FormLabel>
                  <FormControl>
                    <select className="w-full rounded-md border px-3 py-2 text-sm" {...field}>
                      <option value="COMMERCIAL">Commercial</option>
                      <option value="RESIDENTIAL">Residential</option>
                      <option value="AGRICULTURAL">Agricultural</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="landType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Land Type</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      placeholder="e.g., Open Plot"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick Location</FormLabel>
                  <FormControl>
                    <div className="rounded-md border p-2">
                      <LocationPickerMap
                        location={location}
                        setLocation={setLocation}
                        onLocationChange={(lat, lng) => {
                          setLatLng({ lat: String(lat), lng: String(lng) });
                          field.onChange({
                            latitude: String(lat),
                            longitude: String(lng),
                          });
                        }}
                      />
                      {latLng.lat && (
                        <p className="mt-2 text-xs text-gray-500">
                          Lat: {latLng.lat}, Lng: {latLng.lng}
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-teal-700 text-white hover:bg-teal-600">
              Finish Setup
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PropertyLocationForm;
