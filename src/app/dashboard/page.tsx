"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import PropertyGrowthChart from "@/components/dashboard/property-growth-chart";
import AddPropertyModal from "@/components/dashboard/add-property-modal";
import { getAllProperties } from "@/lib/utils/api/property";
import { Button } from "@/components/ui/button";

const libraries: "places"[] = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

interface Property {
  _id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export default function DashboardPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await getAllProperties();
        setProperties(res.data.properties);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    }

    fetchProperties();
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserName(parsed.name || parsed.email || "there");
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);

  const activeProperty = properties[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? properties.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === properties.length - 1 ? 0 : prev + 1));
  };

  const center = activeProperty
    ? {
        lat: activeProperty.coordinates.latitude,
        lng: activeProperty.coordinates.longitude,
      }
    : { lat: 20.5937, lng: 78.9629 };

  return (
    <main className="mx-auto max-h-[700px] max-w-3xl space-y-8 overflow-hidden overflow-y-auto p-4 sm:p-6 md:p-8">
      {userName && (
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">Welcome back, {userName}! 👋</h1>
          <p className="text-gray-500 text-muted-foreground">
            {`Here's what's happening with your properties today`}
          </p>
        </div>
      )}
      {/* Growth Section */}
      <section className="rounded-xl bg-white p-4 shadow-sm dark:bg-card">
        <h2 className="mb-3 text-xl font-semibold text-foreground sm:text-2xl">
          📈 Property Value Growth
        </h2>
        <PropertyGrowthChart />
      </section>

      {/* Property Section */}
      <section className="space-y-4 rounded-xl bg-white p-4 shadow-sm dark:bg-card">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">🏠 Your Properties</h2>
          <div className="flex flex-col gap-2 sm:flex-row">
            <AddPropertyModal />
            <a
              href="/dashboard/properties"
              className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-teal-700"
            >
              View Properties
            </a>
          </div>
        </div>

        {isLoaded && activeProperty ? (
          <div className="space-y-4 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
              options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              }}
            >
              <Marker position={center} />
            </GoogleMap>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between rounded-2xl bg-muted p-3 shadow-inner sm:p-4">
              <Button
                onClick={handlePrev}
                variant="ghost"
                className="rounded-full bg-white shadow transition hover:bg-primary"
                size="icon"
              >
                ←
              </Button>

              <p className="text-sm font-medium text-muted-foreground">
                Property <span className="text-foreground">{activeIndex + 1}</span> of{" "}
                {properties.length}
              </p>

              <Button
                onClick={handleNext}
                variant="ghost"
                className="hover:bg-primar rounded-full bg-white shadow transition"
                size="icon"
              >
                →
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Loading map...</div>
        )}
      </section>
    </main>
  );
}
