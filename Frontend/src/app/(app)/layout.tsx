import { BottomNav } from "@/components/shared/layout/BottomNav";
import { Sidebar } from "@/components/shared/layout/Sidebar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Desktop Sidebar (Fixed Left) */}
            <Sidebar />

            {/* Main Content Area */}
            {/* lg:pl-64 to push content right when sidebar is visible */}
            <main className="flex-1 w-full pb-24 lg:pb-10 lg:pl-64">
                {children}
            </main>

            {/* Mobile Bottom Navigation (Fixed Bottom) */}
            <BottomNav />
        </div>
    );
}
