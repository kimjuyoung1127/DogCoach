"use client";

import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { TrainingCourse } from "@/data/curriculum";

// Register Korean Font (using Noto Sans KR from Google Fonts or similar CDN)
// Note: Direct URL sometimes fails due to CORS, but let's try a reliable source or use a locally imported font if available.
// For this demo, we use a standard CDN. If it fails, letters might optionally disappear.
Font.register({
    family: "NotoSansKR",
    fonts: [
        {
            src: "https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLQ.ttf",
            fontWeight: 400
        },
        {
            src: "https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzg01eLQ.ttf",
            fontWeight: 700
        }
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "NotoSansKR",
        backgroundColor: "#ffffff"
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#27272a"
    },
    subtitle: {
        fontSize: 10,
        color: "#71717a"
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#27272a",
        backgroundColor: "#ecfccb",
        padding: 5,
        borderRadius: 4
    },
    text: {
        fontSize: 10,
        marginBottom: 5,
        lineHeight: 1.5,
        color: "#3f3f46"
    },
    grid: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginBottom: 10
    },
    statCard: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f4f4f5",
        borderRadius: 5
    },
    statLabel: {
        fontSize: 8,
        color: "#71717a"
    },
    statValue: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#27272a"
    },
    chartImage: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        objectFit: "contain"
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: "center",
        fontSize: 8,
        color: "#a1a1aa",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        paddingTop: 10
    }
});

interface ReportDocumentProps {
    dogName: string;
    logs: any[];
    chartImage?: string; // DataURL captured from html2canvas
    recommendedCourse: TrainingCourse;
    aiAnalysis?: {
        insight: string;
        action_plan: string;
        dog_voice: string;
    };
}

export function ReportDocument({ dogName, logs, chartImage, recommendedCourse, aiAnalysis }: ReportDocumentProps) {
    const totalLogs = logs.length;
    const lastLog = logs[0]?.occurred_at ? new Date(logs[0].occurred_at).toLocaleDateString() : "-";

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>DogCoach 데이터 문진표</Text>
                    <Text style={styles.subtitle}>{dogName}의 행동 분석 리포트 | 생성일: {new Date().toLocaleDateString()}</Text>
                </View>

                {/* Summary Stats */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. 기록 요약</Text>
                    <View style={styles.grid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>총 기록 수</Text>
                            <Text style={styles.statValue}>{totalLogs}회</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>최근 기록일</Text>
                            <Text style={styles.statValue}>{lastLog}</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>주요 원인</Text>
                            <Text style={styles.statValue}>{recommendedCourse.title.split("]")[0].replace("[", "")}</Text>
                        </View>
                    </View>
                    {aiAnalysis ? (
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ ...styles.text, fontWeight: "bold" }}>[AI 전문가 총평]</Text>
                            <Text style={styles.text}>{aiAnalysis.insight}</Text>
                        </View>
                    ) : (
                        <Text style={styles.text}>데이터 분석 중입니다...</Text>
                    )}
                </View>

                {/* Charts (Image) */}
                {chartImage && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>2. 데이터 시각화</Text>
                        <Image src={chartImage} style={styles.chartImage} />
                        <Text style={styles.subtitle}>* 위 차트는 행동 발생 빈도와 시간대 패턴을 시각화한 것입니다.</Text>
                    </View>
                )}

                {/* Recommendation */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. AI 맞춤 추천 솔루션</Text>
                    <Text style={{ ...styles.text, fontSize: 12, fontWeight: "bold" }}>추천 코스: {recommendedCourse.title}</Text>
                    <Text style={styles.text}>{recommendedCourse.description}</Text>

                    <Text style={{ ...styles.text, marginTop: 10 }}>[주요 단계]</Text>
                    {recommendedCourse.stages.slice(0, 3).map((stage, idx) => (
                        <Text key={stage.id} style={styles.text}>
                            {idx + 1}. {stage.title}: {stage.goal}
                        </Text>
                    ))}

                    {aiAnalysis && (
                        <View style={{ marginTop: 15, padding: 15, backgroundColor: "#fff7ed", borderRadius: 8, borderStyle: "dashed", borderWidth: 1, borderColor: "#fdba74" }}>
                            <Text style={{ ...styles.text, fontSize: 11, fontWeight: "bold", color: "#c2410c", marginBottom: 8 }}>🐾 {dogName}가 보내는 마음의 편지</Text>
                            <Text style={{ ...styles.text, fontStyle: "italic", color: "#9a3412" }}>{aiAnalysis.dog_voice}</Text>
                        </View>
                    )}
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    DogCoach - 데이터 기반 반려견 행동 코칭 서비스
                </Text>
            </Page>
        </Document>
    );
}
