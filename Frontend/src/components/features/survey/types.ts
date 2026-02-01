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
    primaryCarer: string[];
    primaryCarerOther?: string;

    // Step 3: Health & Nutrition (New)
    healthIssues: string[]; // e.g., 'allergy', 'joint_pain'
    healthIssuesOther?: string;
    favoriteTreats: string[]; // e.g., 'meat', 'vegetable'
    favoriteTreatsOther?: string;

    // Step 4: Problem Behaviors (Revised)
    chronicIssues: string[]; // Top 3 problems
    chronicIssuesOther?: string; // Custom input for 'etc'

    antecedents: string[]; // ABC - Antecedent

    // Step 5: Triggers (Revised A)
    triggers: string[]; // e.g., 'doorbell'
    triggersOther?: string; // Custom input for 'etc'

    // Step 6: Past Attempts (Revised C) (New)
    pastAttempts: string[]; // e.g., 'scolding', 'ignoring'
    pastAttemptsOther?: string; // Custom input for 'etc'

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
    primaryCarer: [],
    primaryCarerOther: '',
    healthIssues: [],
    healthIssuesOther: '',
    favoriteTreats: [],
    favoriteTreatsOther: '',
    chronicIssues: [],
    chronicIssuesOther: '',
    antecedents: [],
    triggers: [],
    triggersOther: '',
    pastAttempts: [],
    pastAttemptsOther: '',
    sensitivityScore: 3,
};
