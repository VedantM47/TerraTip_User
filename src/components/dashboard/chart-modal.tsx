"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Info, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropertyGrowthChart from "./property-growth-chart";

interface PriceTrendEntry {
  year: string;
  price: number;
}

interface ChartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: {
    areaType: string;
    landType: string;
    size: number;
    priceTrend?: Record<string, number>;
  } | null;
}

export default function ChartModal({ open, onOpenChange, property }: ChartModalProps) {
  const [growthView, setGrowthView] = useState<0 | 1 | 2>(0);

  const trendArray: PriceTrendEntry[] | null = property?.priceTrend
    ? Object.entries(property.priceTrend)
        .filter(([year, price]) => year && typeof price === "number")
        .map(([year, price]) => ({ year: String(year), price }))
        .sort((a, b) => Number(a.year) - Number(b.year))
    : null;

  const calculateGrowth = (yearsBack: number): number | null => {
    if (!trendArray || trendArray.length < 2) return null;

    const latest = trendArray[trendArray.length - 1];
    if (!latest) return null;

    const base = trendArray.find((entry) => Number(latest.year) - Number(entry.year) === yearsBack);
    if (!base || base.price === 0) return null;

    const growth = ((latest.price - base.price) / base.price) * 100;
    return Math.round(growth * 100) / 100;
  };

  const growthLabels = ["Last 5 Years", "Last 3 Years", "Last 1 Year"];
  const growthValues = [calculateGrowth(5), calculateGrowth(3), calculateGrowth(1)];

  const handleRotateInfo = () => {
    setGrowthView((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md rounded-xl bg-slate-50 p-4 text-slate-800 shadow-xl sm:max-w-2xl sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 sm:text-2xl">
            📈 Portfolio Growth
          </DialogTitle>
        </DialogHeader>

        {property && (
          <div className="space-y-3">
            {/* Property Info */}
            <div className="grid grid-cols-1 gap-1 text-xs text-slate-600 sm:grid-cols-3 sm:text-sm">
              <p>
                <strong>Area Type:</strong> {property.areaType}
              </p>
              <p>
                <strong>Land Type:</strong> {property.landType}
              </p>
              <p>
                <strong>Size:</strong> {property.size} sqft
              </p>
            </div>

            {/* Total Value */}
            {trendArray && trendArray.length > 0 && (
              <div className="rounded-xl bg-white p-3 text-sm shadow-sm sm:p-4">
                <p className="text-xs text-slate-500">Estimated Current Value</p>
                <p className="text-lg font-bold text-slate-800 sm:text-xl">
                  ₹ {trendArray[trendArray.length - 1]?.price.toLocaleString("en-IN")}
                </p>
              </div>
            )}

            {/* Growth Info */}
            <div className="flex items-center justify-between rounded-xl bg-slate-100 p-3 shadow-sm sm:p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={growthView}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-slate-700 sm:text-sm"
                >
                  <p className="text-slate-500">{growthLabels[growthView]}</p>
                  {growthValues[growthView] !== null ? (
                    <p
                      className={`text-lg font-semibold sm:text-xl ${
                        growthValues[growthView]! >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {growthValues[growthView]}%
                    </p>
                  ) : (
                    <p className="text-red-500">Not enough data</p>
                  )}
                </motion.div>
              </AnimatePresence>
              <button
                onClick={handleRotateInfo}
                className="text-slate-500 transition hover:text-slate-800"
                title="Rotate Growth Info"
              >
                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Chart */}
            {trendArray && trendArray.length > 1 ? (
              <div className="overflow-hidden rounded-xl bg-slate-900 p-3 sm:p-4">
                <PropertyGrowthChart portfolio={{ priceTrend: trendArray }} />
              </div>
            ) : (
              <div className="rounded-xl bg-slate-100 py-6 text-center text-slate-500 shadow-inner sm:py-10">
                <Info className="mx-auto mb-2 h-6 w-6 sm:h-8 sm:w-8" />
                <p className="text-base font-medium sm:text-lg">Data Unavailable</p>
                <p className="text-xs sm:text-sm">
                  No price trend data available for this property yet.
                </p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
