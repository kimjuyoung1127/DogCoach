import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
}
