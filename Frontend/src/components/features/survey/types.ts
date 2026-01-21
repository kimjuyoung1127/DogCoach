export type DogSex = 'MALE' | 'FEMALE' | 'MALE_NEUTERED' | 'FEMALE_NEUTERED';

export interface SurveyData {
    // Step 1: Basic Info
    dogName: string;
    breed: string;
    birthDate: string;
    sex: DogSex | null;
    weight: string; // New
    adoptionDate: string; // New

    // Step 2: Environment
    householdType: string;
    familyMembers: string[];
    primaryCarer: string; // New

    // Step 3: Health & Nutrition (New)
    healthIssues: string[]; // e.g., 'allergy', 'joint_pain'
    favoriteTreats: string[]; // e.g., 'meat', 'vegetable'

    // Step 4: Problem Behaviors (Revised)
    chronicIssues: string[]; // Top 3 problems
    antecedents: string[]; // ABC - Antecedent

    // Step 5: Triggers (Revised A)
    triggers: string[]; // e.g., 'doorbell'

    // Step 6: Past Attempts (Revised C) (New)
    pastAttempts: string[]; // e.g., 'scolding', 'ignoring'

    // Step 7: Temperament (New)
    sensitivityScore: number; // 1-5 scale
}

export const INITIAL_DATA: SurveyData = {
    dogName: '',
    breed: '',
    birthDate: '',
    sex: null,
    weight: '',
    adoptionDate: '',
    householdType: '',
    familyMembers: [],
    primaryCarer: '',
    healthIssues: [],
    favoriteTreats: [],
    chronicIssues: [],
    antecedents: [],
    triggers: [],
    pastAttempts: [],
    sensitivityScore: 3,
};
