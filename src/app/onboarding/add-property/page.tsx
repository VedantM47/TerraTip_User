"use client";
import React from "react";

// NOTE: For production, use a proper map library like react-leaflet or Google Maps JS API.
// This is a minimal placeholder using an <iframe> for OpenStreetMap for demo purposes.

export default function AddProperty() {
  // For a real app, you would use state to store the selected location.
  // Here, we just show a static map as a placeholder.

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 0",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 6px 32px rgba(67, 160, 71, 0.10)",
          padding: "24px 8px 20px 8px",
          width: "100%",
          maxWidth: 380,
          margin: "0 8px",
        }}
      >
        <h2
          style={{
            marginBottom: 6,
            color: "#388e3c",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: 0.1,
            textAlign: "center",
          }}
        >
          Select Your Property Location
        </h2>
        <p
          style={{
            marginBottom: 18,
            color: "#43a047",
            fontSize: 15,
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Move the map and drop the pin at your property location.
        </p>
        <div
          style={{
            width: "100%",
            height: 260,
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 18,
            border: "1.5px solid #a5d6a7",
            position: "relative",
            background: "#f1f8e9",
          }}
        >
          {/* Map placeholder: OpenStreetMap iframe */}
          <iframe
            title="Select location"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.5946%2C12.9716%2C77.5946%2C12.9716&amp;layer=mapnik"
            allowFullScreen
          />
          {/* Pin icon overlay */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -100%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="10" fill="#43a047" fillOpacity="0.2" />
              <path
                d="M16 6C12.6863 6 10 8.68629 10 12C10 16.5 16 26 16 26C16 26 22 16.5 22 12C22 8.68629 19.3137 6 16 6ZM16 14.5C14.6193 14.5 13.5 13.3807 13.5 12C13.5 10.6193 14.6193 9.5 16 9.5C17.3807 9.5 18.5 10.6193 18.5 12C18.5 13.3807 17.3807 14.5 16 14.5Z"
                fill="#43a047"
              />
            </svg>
          </div>
        </div>
        <button
          type="button"
          style={{
            width: "100%",
            padding: "14px 0",
            background: "linear-gradient(90deg, #43a047 70%, #66bb6a 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 0.5,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(67, 160, 71, 0.10)",
            marginTop: 10,
            transition: "background 0.2s",
          }}
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
}
