"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 pt-[env(safe-area-inset-top)] transition-all">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-lime flex items-center justify-center">
                        <span className="text-white text-lg">🐾</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">TailLog</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/about" className="text-gray-600 hover:text-brand-lime transition-colors text-sm font-medium">서비스 소개</Link>
                    <Link href="/pricing" className="text-gray-600 hover:text-brand-lime transition-colors text-sm font-medium">요금제</Link>
                    <Link href="/login" className="text-gray-600 hover:text-brand-lime transition-colors text-sm font-medium">로그인</Link>
                    <Link href="/checkup" className="px-5 py-2 rounded-full bg-brand-dark text-white text-sm font-bold hover:bg-gray-800 transition-colors">
                        무료로 시작하기
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

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link href="/about" className="text-gray-600 font-medium">서비스 소개</Link>
                        <Link href="/pricing" className="text-gray-600 font-medium">요금제</Link>
                        <Link href="/login" className="text-gray-600 font-medium">로그인</Link>
                        <Link href="/checkup" className="block text-center py-3 rounded-xl bg-brand-lime text-white font-bold">
                            무료 진단 시작하기
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
