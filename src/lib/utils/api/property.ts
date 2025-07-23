// src/utils/api/property.ts
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

// Get userId from localStorage
function getUserId(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userId");
  }
  return null;
}

// Add a property
export async function addProperty({
  size,
  areaType,
  coordinates,
  landType,
}: {
  size: number;
  areaType: string;
  coordinates: { latitude: string; longitude: string };
  landType: string;
}) {
  const token = getAuthToken();
  const userId = getUserId();

  if (!token || !userId) throw new Error("Missing auth token or user ID");

  const res = await axios.post(
    `${baseUrl}/client/user/property/${userId}/`,
    {
      size,
      areaType,
      coordinates,
      landType,
    },
    {
      headers: {
        "Content-Type": "application/json",
        authToken: token,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

// Get all properties
export async function getAllProperties() {
  const token = getAuthToken();
  const userId = getUserId();

  if (!token || !userId) throw new Error("Missing auth token or user ID");

  const res = await axios.get(`${baseUrl}/client/user/property/${userId}/`, {
    headers: {
      authToken: token,
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

// Get property portfolio
export async function getPropertyPortfolio() {
  const token = getAuthToken();
  const userId = getUserId();

  if (!token || !userId) throw new Error("Missing auth token or user ID");

  const res = await axios.get(`${baseUrl}/client/user/property/portfolio/${userId}`, {
    headers: {
      authToken: token,
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
