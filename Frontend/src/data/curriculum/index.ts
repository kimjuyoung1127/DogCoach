import { TrainingCourse } from "./types";
import { separationAnxiety } from "./modules/separation_anxiety";
import { barkingNoise } from "./modules/barking_noise";
import { toiletTraining } from "./modules/toilet_training";
import { picaCorrection } from "./modules/pica_correction";
import { leashWalking } from "./modules/leash_walking";
import { multiDog } from "./modules/multi_dog";
import { fearAvoidance } from "./modules/fear_avoidance";

export const TRAINING_CURRICULUM: TrainingCourse[] = [
    separationAnxiety,
    barkingNoise,
    toiletTraining,
    picaCorrection,
    leashWalking,
    multiDog,
    fearAvoidance
];

const ISSUE_TO_CURRICULUM: Record<string, string> = {
    separation: "separation_anxiety",
    barking: "barking_noise",
    potty: "toilet_training",
    destructive: "pica_correction",
    aggression: "leash_walking",
    etc: "multi_dog",
};

const FALLBACK_CURRICULUM = TRAINING_CURRICULUM[0];

export const mapIssueToCurriculum = (issues: string[]) => {
    if (!issues || issues.length === 0) return FALLBACK_CURRICULUM;

    const normalizedIssues = issues
        .filter((issue): issue is string => typeof issue === "string")
        .map((issue) => issue.trim().toLowerCase())
        .filter((issue) => issue.length > 0);

    // Prefer concrete standard codes first, and treat "etc" as a fallback.
    for (const issue of normalizedIssues) {
        if (issue === "etc") continue;
        const targetId = ISSUE_TO_CURRICULUM[issue];
        if (!targetId) continue;
        return TRAINING_CURRICULUM.find((course) => course.id === targetId) || FALLBACK_CURRICULUM;
    }

    if (normalizedIssues.includes("etc")) {
        const etcTargetId = ISSUE_TO_CURRICULUM.etc;
        return TRAINING_CURRICULUM.find((course) => course.id === etcTargetId) || FALLBACK_CURRICULUM;
    }

    return FALLBACK_CURRICULUM;
};

export * from "./types";
export type { TrainingStage, TrainingAlternative, TrainingStep, TrainingCourse } from "./types";
