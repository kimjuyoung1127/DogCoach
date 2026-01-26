export const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20 animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-white p-6 pt-8 rounded-b-[2.5rem] shadow-sm mb-8 border-b border-gray-100 h-[200px]">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="flex gap-4">
                    <div className="flex-1 h-24 bg-gray-200 rounded-2xl"></div>
                    <div className="flex-1 h-24 bg-gray-200 rounded-2xl"></div>
                </div>
            </div>

            {/* Coaching Skeleton */}
            <div className="px-6 mb-8">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="flex gap-3 overflow-hidden">
                    <div className="h-8 bg-gray-200 rounded-full w-24"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-28"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                </div>
            </div>

            {/* Quick Log Skeleton */}
            <div className="px-6 mb-8">
                <div className="flex justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
                    ))}
                </div>
            </div>

            {/* Recent Log Skeleton */}
            <div className="px-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-20 bg-gray-200 rounded-2xl"></div>
                    <div className="h-20 bg-gray-200 rounded-2xl"></div>
                    <div className="h-20 bg-gray-200 rounded-2xl"></div>
                </div>
            </div>
        </div>
    );
};
