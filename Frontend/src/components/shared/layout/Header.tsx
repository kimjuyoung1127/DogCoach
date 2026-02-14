"use client";

import Link from "next/link";
import { Menu, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDogProfile } from "@/hooks/useQueries";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();
    const { user, token, loading } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        setIsUserMenuOpen(false);
        setIsMenuOpen(false);
    };

    const isLoggedIn = !!user && !user.is_anonymous;
    const { data: dogProfile } = useDogProfile(token);
    const hasDog = isLoggedIn && !!dogProfile?.basic?.id;

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 pt-[env(safe-area-inset-top)] transition-all">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime/50">
                        <motion.img
                            whileHover={{ scale: 1.06, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            src="/HeaderLogo.png"
                            alt="TailLog"
                            className="h-14 md:h-16 w-auto object-contain transition-all duration-200 group-hover:opacity-90 group-hover:drop-shadow-[0_6px_10px_rgba(132,204,22,0.25)]"
                        />
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/#service-intro" className="text-gray-600 hover:text-brand-lime transition-colors text-sm font-medium">
                        서비스 소개
                    </Link>
                    <Link href="/#pricing" className="text-gray-600 hover:text-brand-lime transition-colors text-sm font-medium">
                        요금제
                    </Link>

                    {loading ? (
                        // Loading Skeleton
                        <div className="w-20 h-4 bg-gray-100 rounded animate-pulse" />
                    ) : isLoggedIn ? (
                        // User Dropdown
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 text-gray-700 hover:text-brand-lime transition-colors font-medium px-2 py-1 rounded-lg hover:bg-gray-50"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                    <UserIcon className="w-4 h-4 text-gray-500" />
                                </div>
                                <span className="text-sm">내 계정</span>
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                        <p className="text-xs text-gray-500">로그인 계정</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
                                    </div>
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        대시보드
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        로그아웃
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="text-gray-600 hover:text-brand-lime transition-colors text-sm font-medium">
                            로그인
                        </Link>
                    )}

                    <Link
                        href={hasDog ? "/dashboard" : "/survey"}
                        className="px-5 py-2 rounded-full bg-brand-dark text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                    >
                        {hasDog ? "내 대시보드로 이동" : "무료로 시작하기"}
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link href="/#service-intro" className="text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                            서비스 소개
                        </Link>
                        <Link href="/#pricing" className="text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                            요금제
                        </Link>

                        {isLoggedIn ? (
                            <>
                                <Link href="/dashboard" className="text-gray-900 font-bold flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                                    <LayoutDashboard className="w-4 h-4" />
                                    대시보드
                                </Link>
                                <button onClick={handleLogout} className="text-red-500 font-medium flex items-center gap-2 text-left">
                                    <LogOut className="w-4 h-4" />
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>로그인</Link>
                        )}

                        <Link
                            href={hasDog ? "/dashboard" : "/survey"}
                            className="block text-center py-3 rounded-xl bg-brand-lime text-white font-bold"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {hasDog ? "내 대시보드로 이동" : "무료로 시작하기"}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
