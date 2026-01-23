import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface Props {
    value: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    duration?: number;
}

export function AnimatedCounter({ value, className, prefix = "", suffix = "", duration = 2 }: Props) {
    const count = useMotionValue(0);
    const display = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        // Use animate() for explicit duration control
        const controls = animate(count, value, { duration: duration });
        return controls.stop;
    }, [value, duration, count]);

    return (
        <motion.span className={className}>
            {prefix}
            <motion.span>{display}</motion.span>
            {suffix}
        </motion.span>
    );
}
