import { LucideIcon } from "lucide-react";

export interface TrainingAlternative {
    id: string; // "B", "C", "D"...
    title: string;
    description: string;
}

export interface TrainingStep {
    step_number: number;
    title: string;
    description: string;
    success_criteria: string;
    tags?: ("ignoring" | "treat_reward" | "clicker" | "kennel" | "toy" | "touch" | "sound_desensitization" | "nosework" | "waiting")[];
    alternatives?: TrainingAlternative[];
    activeAlternativeId?: string;
    originalPlanA?: {
        title: string;
        description: string;
    };
}

export interface TrainingStage {
    id: string;
    day: number;
    title: string;
    goal: string;
    icon: LucideIcon;
    steps: TrainingStep[];
}

export interface TrainingCourse {
    id: string;
    title: string;
    description: string;
    total_days: number;
    difficulty: "Easy" | "Medium" | "Hard";
    stages: TrainingStage[];
}
