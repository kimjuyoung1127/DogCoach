import { SurveyData } from '@/components/features/survey/types';

const SURVEY_STATE_KEY = 'dogcoach_survey_temp';

export function saveSurveyState(data: SurveyData, currentStep: number): void {
    try {
        const state = {
            data,
            currentStep,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem(SURVEY_STATE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Failed to save survey state:', error);
    }
}

export function restoreSurveyState(): { data: SurveyData; currentStep: number } | null {
    try {
        const stored = localStorage.getItem(SURVEY_STATE_KEY);
        if (!stored) return null;

        const state = JSON.parse(stored);
        // 24시간 후 무효화
        const savedAt = new Date(state.savedAt);
        if (Date.now() - savedAt.getTime() > 24 * 60 * 60 * 1000) {
            clearSurveyState();
            return null;
        }
        return { data: state.data, currentStep: state.currentStep };
    } catch (error) {
        console.error('Failed to restore survey state:', error);
        return null;
    }
}

export function clearSurveyState(): void {
    try {
        localStorage.removeItem(SURVEY_STATE_KEY);
    } catch (error) {
        console.error('Failed to clear survey state:', error);
    }
}
