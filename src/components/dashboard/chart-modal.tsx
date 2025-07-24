// components/dashboard/chart-modal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PropertyGrowthChart from "./property-growth-chart";

interface ChartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChartModal({ open, onOpenChange }: ChartModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-6">
        <DialogHeader>
          <DialogTitle className="text-slate-200">Portfolio Growth</DialogTitle>
        </DialogHeader>
        <div className="h-[400px] w-full">
          <PropertyGrowthChart />
        </div>
      </DialogContent>
    </Dialog>
  );
}
