"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { DailyBriefing } from "@/components/dashboard/DailyBriefing";
import { QuickLogGrid } from "@/components/dashboard/QuickLogGrid";
import { MissionTracker } from "@/components/dashboard/MissionTracker";
import { ChallengeMap } from "@/components/dashboard/ChallengeMap";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Modern PWA Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:hidden transition-all">
                {/* Brand Logo */}
                <Link href="/dashboard" className="flex items-center gap-1">
                    <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                        Tail<span className="text-brand-lime">Log</span>
                    </span>
                </Link>

                {/* Notification Action */}
                <Link href="/notifications" className="relative p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors">
                    <Bell className="w-6 h-6" />
                    {/* Unread Indicator Badge */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white ring-1 ring-white" />
                </Link>
            </header>

            <main className="px-6 py-6 container mx-auto max-w-2xl">
                {/* 1. Daily Briefing (Top) */}
                <DailyBriefing streak={3} userName="지은" dogName="머루" />

                {/* 2. Zero Friction Action (Mid) */}
                <QuickLogGrid />

                {/* 3. Today's Mission (Mid) */}
                <MissionTracker />

                {/* 4. Endless Journey (Bottom) */}
                <ChallengeMap />
            </main>
        </div>
    );
}
