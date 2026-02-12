import { useMemo } from "react";
import { useTrainingStatuses } from "@/hooks/useQueries";
import { TRAINING_CURRICULUM } from "@/data/curriculum";

// Serializable types for reuse in PDF/web reports
export interface StepDetail {
    stepNumber: number;
    title: string;
    status: "COMPLETED" | "SKIPPED_INEFFECTIVE" | "SKIPPED_ALREADY_DONE" | "HIDDEN_BY_AI" | null;
    usedAlternative: boolean;
    completedAt: string | null;
}

export interface StageProgress {
    stageId: string;
    day: number;
    title: string;
    totalSteps: number;
    completedSteps: number;
    isComplete: boolean;
    steps: StepDetail[];
}

export interface CurriculumSummary {
    courseId: string;
    courseTitle: string;
    difficulty: string;
    totalDays: number;
    totalStages: number;
    completedStages: number;
    totalSteps: number;
    completedSteps: number;
    skippedSteps: number;
    alternativeUsedCount: number;
    progressPercent: number;
    firstActivityAt: string | null;
    lastActivityAt: string | null;
    stages: StageProgress[];
}

interface TrainingStatusRecord {
    id: string;
    user_id: string;
    curriculum_id: string;
    stage_id: string;
    step_number: number;
    status: string;
    created_at: string;
}

export function useTrainingHistory(token?: string | null) {
    const { data: rawStatuses, isLoading } = useTrainingStatuses(token);

    const summaries = useMemo(() => {
        if (!rawStatuses || rawStatuses.length === 0) return [];

        const statuses = rawStatuses as TrainingStatusRecord[];

        // Group by curriculum_id
        const byCurriculum = new Map<string, TrainingStatusRecord[]>();
        for (const s of statuses) {
            const existing = byCurriculum.get(s.curriculum_id) || [];
            existing.push(s);
            byCurriculum.set(s.curriculum_id, existing);
        }

        const result: CurriculumSummary[] = [];

        for (const [curriculumId, records] of byCurriculum) {
            const course = TRAINING_CURRICULUM.find(c => c.id === curriculumId);
            if (!course) continue;

            // Build a lookup: stageId -> stepNumber -> record
            const lookup = new Map<string, Map<number, TrainingStatusRecord>>();
            for (const r of records) {
                if (!lookup.has(r.stage_id)) lookup.set(r.stage_id, new Map());
                const stageMap = lookup.get(r.stage_id)!;
                const existing = stageMap.get(r.step_number);
                // Keep most recent
                if (!existing || new Date(r.created_at) > new Date(existing.created_at)) {
                    stageMap.set(r.step_number, r);
                }
            }

            let totalSteps = 0;
            let completedSteps = 0;
            let skippedSteps = 0;
            let alternativeUsedCount = 0;
            let completedStages = 0;
            const allDates: string[] = [];

            const stages: StageProgress[] = course.stages.map(stage => {
                const stageRecords = lookup.get(stage.id);
                const stageSteps: StepDetail[] = stage.steps.map(step => {
                    const record = stageRecords?.get(step.step_number);
                    totalSteps++;

                    if (record) {
                        allDates.push(record.created_at);
                        const isCompleted = record.status === "COMPLETED";
                        const isSkipped = record.status === "SKIPPED_INEFFECTIVE" ||
                            record.status === "SKIPPED_ALREADY_DONE";
                        const isAlternative = record.status === "SKIPPED_INEFFECTIVE";

                        if (isCompleted) completedSteps++;
                        if (isSkipped) skippedSteps++;
                        if (isAlternative) alternativeUsedCount++;

                        return {
                            stepNumber: step.step_number,
                            title: step.title,
                            status: record.status as StepDetail["status"],
                            usedAlternative: isAlternative,
                            completedAt: record.created_at,
                        };
                    }

                    return {
                        stepNumber: step.step_number,
                        title: step.title,
                        status: null,
                        usedAlternative: false,
                        completedAt: null,
                    };
                });

                const stageCompleted = stageSteps.filter(s => s.status !== null).length;
                const isComplete = stageCompleted === stageSteps.length && stageSteps.length > 0;
                if (isComplete) completedStages++;

                return {
                    stageId: stage.id,
                    day: stage.day,
                    title: stage.title,
                    totalSteps: stageSteps.length,
                    completedSteps: stageSteps.filter(s => s.status === "COMPLETED").length,
                    isComplete,
                    steps: stageSteps,
                };
            });

            const sortedDates = allDates.sort();
            const progressPercent = totalSteps > 0
                ? Math.round(((completedSteps + skippedSteps) / totalSteps) * 100)
                : 0;

            result.push({
                courseId: curriculumId,
                courseTitle: course.title,
                difficulty: course.difficulty,
                totalDays: course.total_days,
                totalStages: course.stages.length,
                completedStages,
                totalSteps,
                completedSteps,
                skippedSteps,
                alternativeUsedCount,
                progressPercent,
                firstActivityAt: sortedDates[0] || null,
                lastActivityAt: sortedDates[sortedDates.length - 1] || null,
                stages,
            });
        }

        // Sort by most recent activity first
        result.sort((a, b) => {
            if (!a.lastActivityAt) return 1;
            if (!b.lastActivityAt) return -1;
            return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime();
        });

        return result;
    }, [rawStatuses]);

    return {
        summaries,
        isLoading,
        isEmpty: !isLoading && summaries.length === 0,
    };
}
