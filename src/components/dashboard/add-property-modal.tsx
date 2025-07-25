"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import LocationPickerMap from "@/components/location-picker-map";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addProperty } from "@/lib/utils/api/property";

// Schema
const propertySchema = z.object({
  size: z.preprocess(
    (val) => Number(val),
    z.number({ invalid_type_error: "Size must be a number" }).min(1, {
      message: "Size must be greater than 0",
    })
  ),
  areaType: z
    .string()
    .min(1, { message: "Area type is required" })
    .refine((val) => ["URBAN", "RURAL"].includes(val.toUpperCase()), {
      message: "Invalid area type",
    }),
  landType: z
    .string()
    .min(1, { message: "Land type is required" })
    .refine((val) => ["RESIDENTIAL", "COMMERCIAL"].includes(val.toUpperCase()), {
      message: "Invalid land type",
    }),
  coordinates: z.object({
    latitude: z.string().min(1, "Latitude is required"),
    longitude: z.string().min(1, "Longitude is required"),
  }),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export default function AddPropertyModal({ onPropertyAdded }: { onPropertyAdded: () => void }) {
  const [location, setLocation] = useState("");
  const [latLng, setLatLng] = useState({ lat: "", lng: "" });
  const [open, setOpen] = useState(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      size: 1000,
      areaType: "URBAN",
      landType: "RESIDENTIAL",
      coordinates: {
        latitude: "0",
        longitude: "0",
      },
    },
  });

  const handleSubmit = async (data: PropertyFormData) => {
    try {
      await addProperty({
        ...data,
        areaType: data.areaType.toUpperCase(),
        landType: data.landType.toUpperCase(),
      });
      toast.success("Property added successfully!");
      // form.reset();
      onPropertyAdded?.();
      setOpen(false);
    } catch {
      toast.error("Failed to add property.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand text-white hover:bg-brand/90">Add Property</Button>
      </DialogTrigger>

      <DialogContent
        className="w-96 rounded-lg shadow-xl sm:max-w-lg"
        onInteractOutside={(e) => {
          const path = e.composedPath();
          for (const el of path) {
            if (el instanceof HTMLElement && el.classList.contains("pac-container")) {
              e.preventDefault();
              break;
            }
          }
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-brand">
            Add Property Details
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set property location and details.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit, () =>
              toast.error("Please fix the highlighted errors.")
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // 🚫 Prevent form submit on Enter
              }
            }}
            className="space-y-4"
          >
            {/* 📍 Location Picker */}
            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick Location</FormLabel>
                  <FormControl>
                    <div>
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
            <div className="flex justify-between">
              {/* 📐 Size */}
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size (sq. ft.)</FormLabel>
                    <FormControl>
                      <Input
                        className="w-20"
                        type="number"
                        min={1}
                        placeholder="Enter size"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 🏙️ Area Type */}
              <FormField
                control={form.control}
                name="areaType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area Type</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val.toUpperCase())}
                    >
                      <FormControl>
                        <SelectTrigger className="border border-input bg-white text-black">
                          <SelectValue placeholder="Select area type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="URBAN">Urban</SelectItem>
                        <SelectItem value="RURAL">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 🌍 Land Type */}
              <FormField
                control={form.control}
                name="landType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Land Type</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val.toUpperCase())}
                    >
                      <FormControl>
                        <SelectTrigger className="border border-input bg-white text-black">
                          <SelectValue placeholder="Select land type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                        <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full bg-brand text-white hover:bg-brand/90">
              Submit Property
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
