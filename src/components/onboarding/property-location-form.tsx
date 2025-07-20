"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LocationPickerMap from "@/components/location-picker-map";

export default function PropertyLocationForm() {
  const router = useRouter();
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    console.log("📍 Selected Property Location:", {
      coordinates,
      address,
    });
    router.push("/dashboard"); // Or /home
  };

  return (
    <div className="rounded-2xl bg-white px-6 py-8 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-teal-800">Add Your First Property</h1>
        <p className="text-sm text-gray-500">Use the map or search to pinpoint your property</p>
      </div>

      <LocationPickerMap
        location={location}
        setLocation={setLocation}
        onLocationChange={(lat, lng, addr) => {
          setCoordinates({ lat, lng });
          setAddress(addr);
        }}
      />

      <Button
        onClick={handleSubmit}
        className="mt-6 w-full bg-teal-700 text-white hover:bg-teal-600"
      >
        Finish Setup
      </Button>
    </div>
  );
}
