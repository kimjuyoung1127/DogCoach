import { SurveyData } from "./types";

export function mapSurveyDataToSubmission(data: SurveyData) {
    return {
        // Step 1: Basic Info
        name: data.dogName,
        breed: data.breed || null,
        birth_date: data.birthDate || null,
        sex: data.sex,
        profile_meta: {
            weight: data.weight ? parseFloat(data.weight) : null,
            adoption_date: data.adoptionDate || null,
        },

        // Step 2: Environment
        household_info: {
            type: data.householdType,
            family_count: data.familyMembers.length,
            primary_carer: data.primaryCarer,
        },

        // Step 3: Health & Nutrition
        health_meta: {
            issues: data.healthIssues,
        },
        rewards_meta: {
            favorite_treats: data.favoriteTreats,
        },

        // Step 4: Behavior
        chronic_issues: {
            top_issues: data.chronicIssues,
        },

        // Step 5: Triggers
        triggers: data.triggers,

        // Step 6: Past Attempts
        past_attempts: data.pastAttempts,

        // Step 7: Temperament
        temperament: {
            sensitivity_score: data.sensitivityScore,
        },

        // Extra (From Survey logic, maybe pass as args if needed)
        // profile_image_url: ... 
    };
}
