"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const data = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
  datasets: [
    {
      label: "Value (in ₹ Lakhs)",
      data: [50, 58, 65, 72, 85, 95],
      borderColor: "#1C824D", // brand green
      backgroundColor: "rgba(28, 130, 77, 0.15)",
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#1C824D",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#4B5563", // gray-700
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#6B7280" },
    },
    y: {
      ticks: { color: "#6B7280" },
    },
  },
};

export default function PropertyGrowthChart() {
  return (
    <div className="h-64 w-full rounded-lg bg-muted p-2 shadow-inner sm:p-4">
      <Line data={data} options={options} />
    </div>
  );
}
