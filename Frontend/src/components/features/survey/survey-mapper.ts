import { SurveyData } from "./types";

const sanitize = <T>(value: T | string | null | undefined): T | null => {
    if (value === "" || value === undefined) return null;
    return value as T;
};

export function mapSurveyDataToSubmission(data: SurveyData) {
    return {
        // Step 1: Basic Info
        name: data.dogName,
        breed: sanitize(data.breed),
        birth_date: sanitize(data.birthDate),
        sex: sanitize(data.sex),
        profile_meta: {
            weight: data.weight ? parseFloat(data.weight) : null,
            adoption_date: sanitize(data.adoptionDate),
        },

        // Step 2: Environment
        household_info: {
            type: data.householdType,
            family_count: data.familyMembers.length,
            primary_carer: {
                ids: data.primaryCarer,
                other_text: data.primaryCarerOther,
            },
        },

        // Step 3: Health & Nutrition
        health_meta: {
            ids: data.healthIssues,
            other_text: data.healthIssuesOther,
        },
        rewards_meta: {
            ids: data.favoriteTreats,
            other_text: data.favoriteTreatsOther,
        },

        // Step 4: Behavior
        chronic_issues: {
            top_issues: data.chronicIssues,
            other_text: data.chronicIssuesOther,
        },

        // Step 5: Triggers
        triggers: {
            ids: data.triggers,
            other_text: data.triggersOther,
        },

        // Step 6: Past Attempts
        past_attempts: {
            ids: data.pastAttempts,
            other_text: data.pastAttemptsOther,
        },

        // Step 7: Temperament
        temperament: {
            sensitivity_score: data.sensitivityScore,
        },

        // Extra (From Survey logic, maybe pass as args if needed)
        // profile_image_url: ... 
    };
}
