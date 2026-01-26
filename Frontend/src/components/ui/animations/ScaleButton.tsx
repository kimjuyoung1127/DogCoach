"use client";

import { motion } from "framer-motion";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ScaleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    scale?: number;
}

export function ScaleButton({ children, className, scale = 0.95, ...props }: ScaleButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: scale }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={className}
            {...props as any} // Cast to any to avoid complex Framer Motion type conflits with HTML props
        >
            {children}
        </motion.button>
    );
}
