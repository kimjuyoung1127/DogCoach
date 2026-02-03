import { useEffect, useState } from "react";
import { animate } from "framer-motion";

interface Props {
    value: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    duration?: number;
}

export function AnimatedCounter({ value, className, prefix = "", suffix = "", duration = 2 }: Props) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: duration,
            onUpdate: (latest) => setDisplayValue(Math.round(latest)),
        });
        return controls.stop;
    }, [value, duration]);

    return (
        <span className={className}>
            {prefix}{displayValue}{suffix}
        </span>
    );
}
