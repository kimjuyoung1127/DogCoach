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
        x: direction === "forward" ? 20 : -20,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: "forward" | "back") => ({
        x: direction === "forward" ? -20 : 20,
        opacity: 0,
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
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
