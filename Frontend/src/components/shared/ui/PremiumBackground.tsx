"use client";

import React from "react";

export const PremiumBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fbfbfd]">
            {/* Tech Grid Overlay */}
            <div className="absolute inset-0 tech-grid opacity-40" />

            {/* Organic Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-lime/10 blur-[120px] rounded-full animate-blob" />
            <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-brand-orange/5 blur-[100px] rounded-full animate-blob [animation-delay:2s]" />
            <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-brand-lime/5 blur-[140px] rounded-full animate-blob [animation-delay:4s]" />

            {/* Dynamic Scrim */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40 pointer-events-none" />
        </div>
    );
};
