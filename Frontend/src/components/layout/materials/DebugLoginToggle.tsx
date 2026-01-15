"use client";

import { motion } from "framer-motion";

interface DebugLoginToggleProps {
    isLoggedIn: boolean;
    onToggle: () => void;
}

export function DebugLoginToggle({ isLoggedIn, onToggle }: DebugLoginToggleProps) {
    if (process.env.NODE_ENV !== 'development') return null;

    return (
        <motion.button
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className="fixed top-4 left-4 z-50 px-3 py-1.5 rounded-full text-xs font-bold border shadow-lg transition-colors flex items-center gap-2"
            style={{
                backgroundColor: isLoggedIn ? '#dcfce7' : '#fee2e2', // green-100 : red-100
                color: isLoggedIn ? '#15803d' : '#991b1b', // green-700 : red-800
                borderColor: isLoggedIn ? '#86efac' : '#fca5a5', // green-300 : red-300
            }}
        >
            <span>🚧 DEBUG: {isLoggedIn ? 'LOGGED IN (User)' : 'GUEST (Visitor)'}</span>
        </motion.button>
    );
}
