"use client";

import { cn } from "@/lib/utils";

interface PeriodTabsProps {
  activeWindow: number;
  onTabChange: (days: number) => void;
}

const TABS = [
  { days: 7, label: "7일" },
  { days: 15, label: "15일" },
  { days: 30, label: "30일" },
];

export function PeriodTabs({ activeWindow, onTabChange }: PeriodTabsProps) {
  return (
    <div className="flex gap-2">
      {TABS.map(({ days, label }) => (
        <button
          key={days}
          onClick={() => onTabChange(days)}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-black transition-all",
            activeWindow === days
              ? "bg-violet-500 text-white shadow-md shadow-violet-200"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
