"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "12px", // rounded corners
  border: "1px solid #e5e7eb", // light gray border (Tailwind: border-gray-200)
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)", // soft shadow
  overflow: "hidden", // clips the map inside rounded corners
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

interface Props {
  onLocationChange: (lat: number, lng: number, address: string) => void;
  location?: string;
  setLocation?: (loc: string) => void;
}

export default function LocationPickerMap({ onLocationChange, location, setLocation }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const [center, setCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);

  // 🔧 Pointer-event unlock workaround
  useEffect(() => {
    setTimeout(() => {
      document.body.style.pointerEvents = "";
    }, 0);
  }, []);

  useEffect(() => {
    if (!geocoder.current && window.google) {
      geocoder.current = new google.maps.Geocoder();
    }
  }, []);

  const reverseGeocode = useCallback(
    (lat: number, lng: number) => {
      if (!geocoder.current) return;
      geocoder.current.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const address = results[0].formatted_address;
          setLocation?.(address);
          onLocationChange(lat, lng, address);
        }
      });
    },
    [onLocationChange, setLocation]
  );

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      const lat = e.latLng?.lat();
      const lng = e.latLng?.lng();
      if (lat && lng) {
        setMarkerPosition({ lat, lng });
        setCenter({ lat, lng });
        reverseGeocode(lat, lng);
      }
    },
    [reverseGeocode]
  );

  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();

    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMarkerPosition({ lat, lng });
      setCenter({ lat, lng });
      reverseGeocode(lat, lng);
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="relative space-y-2">
      <div className="absolute left-2 top-2 z-[999] w-[calc(100%-1rem)]">
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a location"
            className="w-full rounded-md border bg-white p-2 shadow-md"
            value={location}
            onChange={(e) => setLocation?.(e.target.value)}
          />
        </Autocomplete>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        onClick={onMapClick}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={(e) => {
            const lat = e.latLng?.lat();
            const lng = e.latLng?.lng();
            if (lat && lng) {
              setMarkerPosition({ lat, lng });
              setCenter({ lat, lng });
              reverseGeocode(lat, lng);
            }
          }}
        />
      </GoogleMap>
    </div>
  );
}
