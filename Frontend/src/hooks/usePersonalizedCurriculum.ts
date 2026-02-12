import { useMemo } from 'react';
import { TRAINING_CURRICULUM, TrainingStage } from '@/data/curriculum';
import { useDashboardData, useTrainingStatuses } from './useQueries';
import { useAuth } from './useAuth';

// NOTE:
// This hook is currently not wired into the active Result/Coach pages.
// SWAPPED:* compatibility is kept for historical client-side experiments,
// while current backend TrainingStatus enum does not include SWAPPED values.
// Treat this as a legacy compatibility layer until status model is unified.
export interface HiddenStage {
    courseId: string;
    courseTitle: string;
    stage: TrainingStage;
    status: string;
    storedAlternative?: {
        stepNumber: number;
        originalTitle: string;
        originalDescription: string;
    };
}

export function usePersonalizedCurriculum() {
    const { token } = useAuth();
    const { data: dashboardData } = useDashboardData(!!token, token);
    const { data: trainingStatuses } = useTrainingStatuses(token);

    const result = useMemo(() => {
        const hiddenStages: HiddenStage[] = [];

        if (!dashboardData && !trainingStatuses) {
            return { activeCurriculum: TRAINING_CURRICULUM, hiddenStages };
        }

        // 1. Identify Active and Hidden
        const activeCurriculum = TRAINING_CURRICULUM.map(course => {
            const hiddenInThisCourse: HiddenStage[] = [];

            const filteredStages = course.stages.map(stage => {
                // Find if any step in this stage has a status
                const relevantStatuses = trainingStatuses?.filter(s =>
                    s.curriculum_id === course.id &&
                    s.stage_id === stage.id
                );

                const locallyHiddenSteps: { stepNumber: number; originalTitle: string; originalDescription: string }[] = [];

                // Check for individual step swaps (Plan B/C/D)
                const modifiedSteps = stage.steps.map(step => {
                    const stepStatus = relevantStatuses?.find(s => s.step_number === step.step_number);
                    if (stepStatus?.status.startsWith('SWAPPED:')) {
                        const altId = stepStatus.status.split(':')[1];
                        const alternative = (step as any).alternatives?.find((a: any) => a.id === altId);
                        if (alternative) {
                            // Store the original for the "Vault/Hidden" side
                            locallyHiddenSteps.push({
                                stepNumber: step.step_number,
                                originalTitle: step.title,
                                originalDescription: step.description
                            });

                            return {
                                ...step,
                                title: alternative.title,
                                description: alternative.description,
                                activeAlternativeId: altId,
                                originalPlanA: {
                                    title: step.title,
                                    description: step.description
                                }
                            };
                        }
                    }
                    return step;
                });

                const anyStepSwapped = modifiedSteps.some(s => (s as any).activeAlternativeId);
                const stageIsSkipped = relevantStatuses?.some(s => s.status === 'SKIPPED_INEFFECTIVE' || s.status === 'SKIPPED_ALREADY_DONE');
                const stageIsHiddenByAI = relevantStatuses?.some(s => s.status === 'HIDDEN_BY_AI');

                // If swapped steps exist, add them to hidden stages as "Stored" steps
                locallyHiddenSteps.forEach(hidden => {
                    hiddenInThisCourse.push({
                        courseId: course.id,
                        courseTitle: course.title,
                        stage: { ...stage, title: `${stage.title} (Step ${hidden.stepNumber} Original)` },
                        status: 'STORED',
                        storedAlternative: hidden
                    });
                });

                // If stage is fully skipped or hidden, add to separate list (EXCEPT if it's swapped to an alternative)
                if ((stageIsSkipped || stageIsHiddenByAI) && !anyStepSwapped) {
                    const status = relevantStatuses?.find(s => s.status !== 'COMPLETED')?.status || 'SKIPPED';
                    hiddenInThisCourse.push({
                        courseId: course.id,
                        courseTitle: course.title,
                        stage,
                        status
                    });
                    return null;
                }

                return { ...stage, steps: modifiedSteps };
            }).filter((s): s is TrainingStage => s !== null);

            hiddenStages.push(...hiddenInThisCourse);

            return {
                ...course,
                stages: filteredStages
            };
        }).filter(course => course.stages.length > 0);

        return { activeCurriculum, hiddenStages };
    }, [dashboardData, trainingStatuses]);

    return result;
}
