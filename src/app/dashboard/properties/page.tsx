"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { getAllProperties } from "@/lib/utils/api/property";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ChartModal from "@/components/dashboard/chart-modal";

const libraries: "places"[] = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "200px",
};

interface Property {
  _id: string;
  size: number;
  areaType: string;
  landType: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export default function PropertyListPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllProperties();
        setProperties(res.data.properties);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      }
    }

    fetchData();
  }, []);

  if (!isLoaded) return <div className="py-10 text-center">Loading Map...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4 flex items-center gap-2">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <h2 className="mb-6 text-center text-3xl font-bold text-teal-700">Property Listings</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property._id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
          >
            <div className="p-4">
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">Size:</strong> {property.size} sqft
              </p>
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">Area Type:</strong> {property.areaType}
              </p>
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">Land Type:</strong> {property.landType}
              </p>
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">Latitude:</strong>{" "}
                {property.coordinates.latitude.toFixed(5)}
              </p>
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">Longitude:</strong>{" "}
                {property.coordinates.longitude.toFixed(5)}
              </p>
            </div>

            <div className="w-full">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{
                  lat: property.coordinates.latitude,
                  lng: property.coordinates.longitude,
                }}
                zoom={15}
                options={{
                  disableDefaultUI: true,
                  zoomControl: true,
                }}
              >
                <Marker
                  position={{
                    lat: property.coordinates.latitude,
                    lng: property.coordinates.longitude,
                  }}
                />
              </GoogleMap>
            </div>

            <div className="p-4">
              <button
                className="w-full rounded-md bg-teal-700 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-teal-600"
                onClick={() => setOpenModal(true)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Shared Modal */}
      <ChartModal open={openModal} onOpenChange={setOpenModal} />
    </div>
  );
}
