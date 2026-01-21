import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LockedSectionProps {
    title: string;
    description?: string;
    bgClass?: string;
}

export function LockedAnalysisSection({ title, description, bgClass }: LockedSectionProps) {
    return (
        <section className={cn("relative px-6 py-6 overflow-hidden", bgClass)}>
            {/* Header (Visible) */}
            <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-500 rounded text-xs font-bold mb-2">
                    <Lock className="w-3 h-3" />
                    <span>가입 후 확인 가능</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 break-keep">{title}</h3>
                {description && <p className="text-gray-500 text-sm mt-1 break-keep">{description}</p>}
            </div>

            {/* Blurred Content Placeholder */}
            <div className="relative">
                <div className="space-y-4 filter blur-sm select-none opacity-50">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />

                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="h-24 bg-gray-100 rounded-xl" />
                        <div className="h-24 bg-gray-100 rounded-xl" />
                    </div>
                </div>

                {/* Overlay CTA - Absolute Center */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    {/* Optional: Add a button here if you want interaction on the locked area itself */}
                </div>
            </div>
        </section>
    );
}
