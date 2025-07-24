"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { getPropertyPortfolio } from "@/lib/utils/api/property";
import type { ScriptableContext, TooltipItem } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function PropertyGrowthChart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getPropertyPortfolio();
        const priceTrend = response.data?.portfolio?.priceTrend || [];

        // Sort by year just in case
        const sortedTrend = [...priceTrend].sort((a, b) => Number(a.year) - Number(b.year));

        setLabels(sortedTrend.map((entry) => entry.year));
        setPrices(sortedTrend.map((entry) => Math.round(entry.price / 100000))); // convert to ₹ Lakhs
      } catch (error) {
        console.error("Failed to load portfolio data:", error);
      }
    }

    fetchData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Value (₹ Lakhs)",
        data: prices,
        borderColor: "#00FFD1", // Neon teal
        backgroundColor: (ctx: ScriptableContext<"line">) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(0,255,209,0.25)");
          gradient.addColorStop(1, "rgba(0,255,209,0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#00FFD1",
        pointBorderColor: "#0F172A", // dark slate
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "#CBD5E1",
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) => `₹${context.raw} Lakhs`,
        },
      },
    },
    scales: {
      x: {
        offset: false,
        ticks: {
          color: "#94A3B8",
        },
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#94A3B8",
        },
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
      },
    },
  };

  return (
    <div className="h-72 w-full rounded-xl bg-[#0F172A] p-10 shadow-lg ring-1 ring-slate-700/20">
      <h3 className="text-lg font-semibold text-slate-200">Portfolio Growth</h3>
      <Line data={data} options={options} />
    </div>
  );
}
