"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { getAllProperties } from "@/lib/utils/api/property";
import ChartModal from "@/components/dashboard/chart-modal";

const libraries: "places"[] = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "12px", // rounded corners
  border: "1px solid #e5e7eb", // light gray border (Tailwind: border-gray-200)
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)", // soft shadow
  overflow: "hidden", // clips the map inside rounded corners
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
    <div className="bg-gray-100">
      <h2 className="mb-4 text-center text-3xl font-bold text-teal-700">Property Listings</h2>

      <div className="w-100 grid max-h-[600px] grid-cols-1 gap-6 overflow-hidden overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property._id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
          >
            <div className="p-4 font-normal">
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">Size:</strong> {property.size} sqft
              </p>
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">Area Type:</strong> {property.areaType}
              </p>
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">Land Type:</strong> {property.landType}
              </p>
            </div>

            <div className="w-full rounded-lg p-2">
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
