"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    shimmerColor?: string;
}

export function ShimmerButton({ children, className, shimmerColor = "rgba(255,255,255,0.4)", ...props }: ShimmerButtonProps) {
    return (
        <button
            className={cn(
                "relative overflow-hidden transition-transform active:scale-[0.98]",
                className
            )}
            {...props}
        >
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "linear",
                    repeatDelay: 1
                }}
                style={{
                    background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
                }}
                className="absolute inset-0 skew-x-12 opacity-50 z-10 pointer-events-none"
            />
            <span className="relative z-20 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
}
