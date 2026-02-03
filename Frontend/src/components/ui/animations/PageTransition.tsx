"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    direction: "forward" | "back";
    stepKey: number | string;
    className?: string;
}

const variants = {
    enter: (direction: "forward" | "back") => ({
        x: direction === "forward" ? 40 : -40,
        opacity: 0,
        scale: 0.98,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: "forward" | "back") => ({
        x: direction === "forward" ? -40 : 40,
        opacity: 0,
        scale: 0.98,
    }),
};

export function PageTransition({ children, direction, stepKey, className }: Props) {
    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={stepKey}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1]
                }}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
