import { motion } from "framer-motion";

interface RadarChartProps {
    data?: number[]; // [Sensibility, Sociability, Aggression, Anxiety, Energy]
}

export function AnalysisRadarChart({ data = [8, 4, 3, 9, 6] }: RadarChartProps) {
    // 5 Axis Radar Chart
    const stats = [
        { label: "예민함", value: data[0] },
        { label: "사회성", value: data[1] },
        { label: "공격성", value: data[2] },
        { label: "불안도", value: data[3] },
        { label: "활동량", value: data[4] },
    ];

    const size = 240;
    const center = size / 2;
    const radius = 80;
    const angleSlice = (Math.PI * 2) / 5;

    // Helper to get coordinates
    const getPoint = (value: number, index: number) => {
        const angle = index * angleSlice - Math.PI / 2; // Start from top
        const distance = (value / 10) * radius;
        return {
            x: center + Math.cos(angle) * distance,
            y: center + Math.sin(angle) * distance,
        };
    };

    // Generate Polygon Points
    const points = stats.map((stat, i) => {
        const point = getPoint(stat.value, i);
        return `${point.x},${point.y}`;
    }).join(" ");

    // Generate Axis Lines & Labels
    const axes = stats.map((stat, i) => {
        const endPoint = getPoint(10, i);
        // Label position with some padding
        const labelPoint = {
            x: center + Math.cos(i * angleSlice - Math.PI / 2) * (radius + 20),
            y: center + Math.sin(i * angleSlice - Math.PI / 2) * (radius + 20),
        };
        return { ...stat, endPoint, labelPoint };
    });

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-[240px] h-[240px]">
                <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
                    {/* Background Grids (Levels 2, 4, 6, 8, 10) */}
                    {[2, 4, 6, 8, 10].map((level) => (
                        <polygon
                            key={level}
                            points={stats.map((_, i) => {
                                const p = getPoint(level, i);
                                return `${p.x},${p.y}`;
                            }).join(" ")}
                            fill={level === 10 ? "#f9fafb" : "none"} // Fill outer only
                            stroke="#e5e7eb"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Axes */}
                    {axes.map((axis, i) => (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={axis.endPoint.x}
                            y2={axis.endPoint.y}
                            stroke="#e5e7eb"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Data Polygon */}
                    <motion.polygon
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        points={points}
                        fill="#4ade80" // Green-400
                        stroke="#16a34a" // Green-600
                        strokeWidth="2"
                    />

                    {/* Labels */}
                    {axes.map((axis, i) => (
                        <text
                            key={i}
                            x={axis.labelPoint.x}
                            y={axis.labelPoint.y}
                            textAnchor="middle"
                            dy="0.3em"
                            className="text-[10px] fill-gray-500 font-medium"
                        >
                            {axis.label}
                        </text>
                    ))}
                </svg>
            </div>
        </div>
    );
}
