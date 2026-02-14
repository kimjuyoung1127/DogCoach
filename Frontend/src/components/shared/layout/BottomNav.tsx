"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, FileText, Plus, BrainCircuit, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/dashboard", label: "홈", icon: Home },
        { href: "/log", label: "기록", icon: FileText },
        { href: "/dashboard?openDetailLog=1", label: "빠른 기록", icon: Plus, isFab: true }, // FAB
        { href: "/coach", label: "코칭", icon: BrainCircuit },
        { href: "/settings", label: "설정", icon: Settings },
    ];

    return (
        <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe lg:hidden"
        >
            <div className="flex items-end justify-between px-6 h-16 max-w-md mx-auto relative">
                {navItems.map((item) => {
                    const itemPath = item.href.split("?")[0];
                    const isActive = pathname === itemPath;
                    const Icon = item.icon;

                    if (item.isFab) {
                        return (
                            <div key={item.href} className="relative -top-5">
                                <Link
                                    href={item.href}
                                    className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-lime text-white shadow-lg shadow-brand-lime/40 transform transition-transform active:scale-95"
                                >
                                    <Icon className="w-7 h-7" strokeWidth={2.5} />
                                </Link>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-12 h-full transition-colors",
                                isActive ? "text-brand-lime" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <Icon className={cn("w-6 h-6 mb-1", item.label === "코칭" && "rotate-[60deg]")} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </motion.nav>
    );
}
