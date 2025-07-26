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
  Filler,
  type ScriptableContext,
  type TooltipItem,
  type ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

interface PriceTrendEntry {
  year: string;
  price: number;
}

export default function PropertyGrowthChart({
  portfolio,
}: {
  portfolio: { priceTrend: PriceTrendEntry[] } | null;
}) {
  if (!portfolio) return <div className="text-muted-foreground">Loading chart...</div>;

  const labels = portfolio.priceTrend.map((entry) => entry.year);
  const prices = portfolio.priceTrend.map((entry) => Math.round(entry.price / 100000)); // in Lakhs

  const data = {
    labels,
    datasets: [
      {
        label: "Value (₹ Lakhs)",
        data: prices,
        borderColor: "#00FFD1",
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
        pointBorderColor: "#0F172A",
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#CBD5E1",
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
          boxWidth: 0,
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
        ticks: {
          color: "#94A3B8",
        },
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
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
    <div className="w-full rounded-xl bg-[#0F172A] shadow-lg ring-1 ring-slate-700/20">
      <Line data={data} options={options} />
    </div>
  );
}
