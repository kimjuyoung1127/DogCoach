"use client";

import Lottie from "lottie-react";
import cuteDoggie from "@/data/Cute Doggie.json";
import jackie from "@/data/Jackie.json";
import { motion } from "framer-motion";

interface LottieLoadingProps {
    type?: "cute" | "jackie";
    message?: string;
    size?: number;
}

export const LottieLoading = ({ type = "cute", message = "정보를 불러오고 있어요...", size = 200 }: LottieLoadingProps) => {
    const animationData = type === "cute" ? cuteDoggie : jackie;

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ width: size, height: size }}
            >
                <Lottie
                    animationData={animationData}
                    loop={true}
                    className="w-full h-full"
                />
            </motion.div>
            {message && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 font-bold text-center break-keep"
                >
                    {message}
                </motion.p>
            )}
        </div>
    );
};
