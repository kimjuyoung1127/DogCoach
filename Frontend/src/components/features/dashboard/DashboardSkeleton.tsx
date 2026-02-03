import { LottieLoading } from "@/components/shared/ui/LottieLoading";

export const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center pb-20">
            <LottieLoading type="jackie" message="대시보드를 준비하고 있어요..." size={300} />

            {/* Subtle skeleton placeholders below to maintain structure */}
            <div className="w-full max-w-sm px-6 space-y-4 mt-8 animate-pulse">
                <div className="h-4 bg-gray-50 rounded-full w-3/4 mx-auto"></div>
                <div className="h-2 bg-gray-50 rounded-full w-1/2 mx-auto"></div>
            </div>
        </div>
    );
};
