"use client";

import { motion } from "framer-motion";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";

interface ScaleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    scale?: number;
    asChild?: boolean;
}

const MotionSlot = motion(Slot);

export function ScaleButton({
    children,
    className,
    scale = 0.95,
    asChild = false,
    ...props
}: ScaleButtonProps) {
    const Comp = asChild ? MotionSlot : motion.button;

    return (
        <Comp
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: scale }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={className}
            {...props as any}
        >
            {children}
        </Comp>
    );
}
