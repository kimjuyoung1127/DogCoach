"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/shared/layout/Header";
import { Footer } from "@/components/shared/layout/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Paths where footer should be hidden for better focus on content (e.g., Survey)
    const hiddenFooterPaths = ["/survey", "/result"];
    const showFooter = !hiddenFooterPaths.includes(pathname);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1 w-full">
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
}
