import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { TrainingStage, TrainingAlternative, TrainingStep } from "../../../../data/curriculum/types";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateTrainingStatus } from "@/hooks/useQueries";

interface UseMissionActionProps {
    curriculumId: string | null;
    mission: TrainingStage | null;
    onComplete: (reaction: string) => void;
    isOpen: boolean;
}

export function useMissionAction({ curriculumId, mission, onComplete, isOpen }: UseMissionActionProps) {
    const { token } = useAuth();
    const updateStatus = useUpdateTrainingStatus(token);
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [swapping, setSwapping] = useState(false);
    const [swappedSteps, setSwappedSteps] = useState<Record<number, TrainingAlternative>>({});
    const [showVault, setShowVault] = useState(false);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        if (isOpen && mission) {
            setIsCompleted(false);
            setCurrentStep(0);
            setSwapping(false);
            setShowVault(false);

            const initialSwaps: Record<number, TrainingAlternative> = {};
            mission.steps.forEach(s => {
                const altId = s.activeAlternativeId;
                if (altId) {
                    const alt = s.alternatives?.find((a: TrainingAlternative) => a.id === altId);
                    if (alt) {
                        initialSwaps[s.step_number] = alt;
                    }
                }
            });
            setSwappedSteps(initialSwaps);
        }
    }, [isOpen, mission?.id]);

    const handleComplete = () => {
        setIsCompleted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4ADE80', '#D9F99D', '#f7fee7']
        });
    };

    const handleNext = () => {
        if (!mission) return;
        if (currentStep < mission.steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleIneffective = async () => {
        if (!curriculumId || !mission) return;
        const step = mission.steps[currentStep];
        if (!step) return;

        const alternatives = step.alternatives || [];
        const nextAlt = alternatives[0];
        const selectedAlternative = swappedSteps[step.step_number];

        if (nextAlt && !selectedAlternative) {
            setSwapping(true);
            setTimeout(() => {
                setSwappedSteps(prev => ({
                    ...prev,
                    [step.step_number]: nextAlt
                }));
                setSwapping(false);
                confetti({
                    particleCount: 40,
                    spread: 40,
                    origin: { y: 0.7 },
                    colors: ['#8B5CF6', '#A78BFA', '#C4B5FD']
                });
            }, 1800);
            return;
        }
    };

    const handleSkipStep = async () => {
        if (!curriculumId || !mission) return;
        const step = mission.steps[currentStep];
        if (!step) return;

        try {
            setIsPending(true);
            await updateStatus.mutateAsync({
                curriculum_id: curriculumId,
                stage_id: mission.id,
                step_number: step.step_number,
                status: "SKIPPED_INEFFECTIVE"
            });
            handleNext();
        } catch (err) {
            console.error("Failed to skip step:", err);
        } finally {
            setIsPending(false);
        }
    };

    const handleConfirmSwap = async () => {
        if (!curriculumId || !mission) return;
        const step = mission.steps[currentStep];
        const selectedAlternative = swappedSteps[step.step_number];
        if (!step || !selectedAlternative) return;

        try {
            setIsPending(true);
            // Backend DB uses strict Enum (UserTrainingStatus).
            // "SWAPPED" is not in Enum, so we use "SKIPPED_INEFFECTIVE" which semantically fits (Plan A was ineffective).
            await updateStatus.mutateAsync({
                curriculum_id: curriculumId,
                stage_id: mission.id,
                step_number: step.step_number,
                status: "SKIPPED_INEFFECTIVE"
            });
            handleNext();
        } catch (err) {
            console.error("Failed to swap status:", err);
        } finally {
            setIsPending(false);
        }
    };

    const handleReaction = async (reaction: string) => {
        if (curriculumId && mission) {
            try {
                await Promise.all(mission.steps.map(s => {
                    const currentStepStatus = swappedSteps[s.step_number] || s.activeAlternativeId;
                    if (currentStepStatus) return Promise.resolve();
                    return updateStatus.mutateAsync({
                        curriculum_id: curriculumId,
                        stage_id: mission.id,
                        step_number: s.step_number,
                        status: "COMPLETED"
                    });
                }));
            } catch (err) {
                console.error("Failed to mark steps as completed:", err);
            }
        }
        onComplete(reaction);
    };

    const cancelSwap = (stepNumber: number) => {
        setSwappedSteps(prev => {
            const next = { ...prev };
            delete next[stepNumber];
            return next;
        });
        setShowVault(false);
    };

    return {
        currentStep,
        isCompleted,
        swapping,
        isPending,
        swappedSteps,
        showVault,
        setShowVault,
        handleNext,
        handleBack,
        handleIneffective,
        handleSkipStep,
        handleConfirmSwap,
        handleReaction,
        cancelSwap
    };
}
