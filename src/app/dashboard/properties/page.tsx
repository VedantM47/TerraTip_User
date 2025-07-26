"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { getAllProperties } from "@/lib/utils/api/property";
import ChartModal from "@/components/dashboard/chart-modal";

const libraries: "places"[] = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  overflow: "hidden",
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Property {
  _id: string;
  size: number;
  areaType: string;
  landType: string;
  coordinates: Coordinates;
  priceTrend?: Record<string, number>;
}

export default function PropertyListPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    getAllProperties()
      .then((res) => setProperties(res.data.properties))
      .catch((err) => console.error("Failed to fetch properties:", err));
  }, []);

  const formatINRCurrency = (value: number): string =>
    value >= 1_00_00_000
      ? `₹${(value / 1_00_00_000).toFixed(2)} Cr`
      : `₹${(value / 1_00_000).toFixed(2)} L`;

  const calculateGrowth = (trend?: Record<string, number>, yearsBack = 3): number | null => {
    if (!trend) return null;
    const arr = Object.entries(trend)
      .map(([year, price]) => ({ year: Number(year), price }))
      .sort((a, b) => a.year - b.year);
    const latest = arr.at(-1);
    const base = arr.find((e) => latest && latest.year - e.year === yearsBack);
    if (!latest || !base || base.price === 0) return null;
    return Math.round(((latest.price - base.price) / base.price) * 100 * 100) / 100;
  };

  if (!isLoaded) return <div className="py-10 text-center">Loading Map...</div>;

  // Summary calculations
  const totalArea = properties.reduce((sum, p) => sum + p.size, 0);
  const latestValues = properties.map((p) =>
    p.priceTrend && Object.values(p.priceTrend).length
      ? Math.max(...Object.values(p.priceTrend))
      : 0
  );
  const totalValue = latestValues.reduce((sum, v) => sum + v, 0);
  const baseValues = properties.map((p) => {
    if (!p.priceTrend) return 0;
    const arr = Object.entries(p.priceTrend)
      .map(([y, price]) => ({ year: Number(y), price }))
      .sort((a, b) => a.year - b.year);
    const base = arr.find((e) => arr.at(-1) && arr.at(-1)!.year - e.year === 3);
    return base?.price ?? 0;
  });
  const totalBase = baseValues.reduce((sum, v) => sum + v, 0);
  const totalAppreciationPercent =
    totalBase > 0 ? Math.round(((totalValue - totalBase) / totalBase) * 100 * 100) / 100 : null;

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold">My Properties</h2>

      {/* Summary Paragraph */}
      <p className="mx-auto mb-8 max-w-2xl text-center text-gray-700">
        Your portfolio is currently worth{" "}
        <span className="font-bold text-teal-700">{formatINRCurrency(totalValue)}</span>, covers a
        total of <span className="font-bold text-teal-700">{totalArea.toLocaleString()} sqft</span>
        {totalAppreciationPercent !== null ? (
          <>
            , and has{" "}
            <span
              className={`font-bold ${
                totalAppreciationPercent >= 0 ? "text-teal-700" : "text-red-600"
              }`}
            >
              {totalAppreciationPercent}%
            </span>{" "}
            appreciation over the last 3 years.
          </>
        ) : (
          ", and no 3‑year growth data is available."
        )}
      </p>
      {/* End Summary */}

      <div className="grid max-h-[625px] grid-cols-1 gap-6 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, idx) => {
          const latestValue =
            property.priceTrend && Object.values(property.priceTrend).length
              ? Math.max(...Object.values(property.priceTrend))
              : null;
          const growth3Y = calculateGrowth(property.priceTrend, 3);

          return (
            <div
              key={property._id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-xl"
            >
              {/* Header */}
              <div className="px-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900">Property {idx + 1}</h3>
              </div>

              {/* Unified Info + Value Panel */}
              <div className="m-4 flex justify-between gap-4 rounded-lg bg-slate-100 p-4 sm:flex-row">
                {/* Left: Core Details */}
                <div className="text-sm font-semibold text-gray-700">
                  <p>{property.size} sqft</p>
                  <p>{property.areaType}</p>
                  <p>{property.landType}</p>
                </div>

                {/* Right: Latest Value + Growth */}
                {latestValue !== null && (
                  <div className="text-right text-sm">
                    <p className="text-lg font-semibold text-slate-900">
                      {formatINRCurrency(latestValue)}
                    </p>
                    {growth3Y !== null && (
                      <p
                        className={`text-sm font-medium ${
                          growth3Y >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {growth3Y}% (3Y Growth)
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="px-4">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{
                    lat: property.coordinates.latitude,
                    lng: property.coordinates.longitude,
                  }}
                  zoom={15}
                  options={{ disableDefaultUI: true, zoomControl: true }}
                >
                  <Marker
                    position={{
                      lat: property.coordinates.latitude,
                      lng: property.coordinates.longitude,
                    }}
                  />
                </GoogleMap>
              </div>

              {/* Actions */}
              <div className="p-4">
                <button
                  className="w-full rounded-md bg-teal-700 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-teal-600"
                  onClick={() => {
                    setSelectedProperty(property);
                    setOpenModal(true);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ChartModal
        open={openModal}
        onOpenChange={(open) => {
          setOpenModal(open);
          if (!open) setSelectedProperty(null);
        }}
        property={selectedProperty}
      />
    </div>
  );
}
