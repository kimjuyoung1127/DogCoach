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

export const mapIssueToCurriculum = (issues: string[]) => {
    const map: Record<string, string> = {
        'separation': 'separation_anxiety',
        'barking': 'barking_noise',
        'potty': 'toilet_training',
        'destructive': 'pica_correction',
        'aggression': 'leash_walking',
        'etc': 'multi_dog',
    };

    if (!issues || issues.length === 0) return TRAINING_CURRICULUM[0];
    const targetId = map[issues[0]] || 'separation_anxiety';
    return TRAINING_CURRICULUM.find(c => c.id === targetId) || TRAINING_CURRICULUM[0];
};

export * from "./types";
export type { TrainingStage, TrainingAlternative, TrainingStep, TrainingCourse } from "./types";
