"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Plus, BrainCircuit, Settings, LogOut, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useQueries";

interface UserProfile {
    id: string;
    latest_dog_name: string | null;
}

export function Sidebar() {
    const pathname = usePathname();
    const { token, user: supabaseUser } = useAuth();

    // Use Query Hook instead of useEffect
    const { data: profile } = useUserProfile(token);

    const navItems = [
        { href: "/dashboard", label: "대시보드", icon: Home },
        { href: "/log", label: "기록 & 분석", icon: FileText },
        { href: "/coach", label: "AI 코칭", icon: BrainCircuit },
        { href: "/settings", label: "설정", icon: Settings },
    ];

    const dogName = profile?.latest_dog_name || "반려견 없음";
    const displayName = supabaseUser?.email?.split("@")[0] || "게스트";

    return (
        <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-100 z-40">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <Link href="/dashboard" className="flex items-center gap-1">
                    <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                        Tail<span className="text-brand-lime">Log</span>
                    </span>
                </Link>
            </div>

            {/* User Profile Summary */}
            <div className="p-6 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                        🐶
                    </div>
                    <div>
                        <div className="font-bold text-sm text-gray-900">{dogName}</div>
                        <div className="text-xs text-gray-500">{displayName}님</div>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-1">
                {/* Quick Action */}
                <Link
                    href="/quick-log"
                    className="flex items-center gap-3 px-4 py-3 mb-6 bg-brand-lime/10 text-brand-lime rounded-xl hover:bg-brand-lime/20 transition-colors font-bold"
                >
                    <Plus className="w-5 h-5" />
                    <span>빠른 기록하기</span>
                </Link>

                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                isActive
                                    ? "bg-gray-900 text-white shadow-md"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">로그아웃</span>
                </button>
            </div>
        </aside>
    );
}
