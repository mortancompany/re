import { AUTOMATION_SOLUTIONS as initialSolutions } from '../constants';
import type { AutomationSolution } from '../types';

const PRICING_STORAGE_KEY = 'mortanasPricingData';

export const getPricingData = (): AutomationSolution[] => {
    try {
        const storedData = localStorage.getItem(PRICING_STORAGE_KEY);
        if (storedData) {
            const parsed = JSON.parse(storedData) as AutomationSolution[];
            let hasChanges = false;

            const parsedMap = new Map(parsed.map(s => [s.slug, s]));
            const synced: AutomationSolution[] = [];

            initialSolutions.forEach(initial => {
                const existing = parsedMap.get(initial.slug);
                if (!existing) {
                    synced.push(initial);
                    hasChanges = true;
                } else {
                    const merged = {
                        ...initial,
                        ...existing,
                        features: initial.features || existing.features,
                        benefits: initial.benefits || existing.benefits,
                        aiFeatures: initial.aiFeatures || existing.aiFeatures,
                        shortDescription: initial.shortDescription || existing.shortDescription,
                        problemSolution: initial.problemSolution || existing.problemSolution,
                        howItWorks: initial.howItWorks || existing.howItWorks,
                        whyChooseUs: initial.whyChooseUs || existing.whyChooseUs,
                        ourGoal: initial.ourGoal || existing.ourGoal,
                        integrations: initial.integrations || existing.integrations,
                    };

                    if (JSON.stringify(existing) !== JSON.stringify(merged)) {
                        hasChanges = true;
                    }
                    synced.push(merged);
                }
            });

            if (hasChanges) {
                localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(synced));
            }
            return synced;
        }
        // If no data, initialize from constants
        localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(initialSolutions));
        return initialSolutions;
    } catch (error) {
        console.error("Error reading pricing data from localStorage:", error);
        // Fallback to initial data in case of error
        return initialSolutions;
    }
};

export const savePricingData = (data: AutomationSolution[]): void => {
    try {
        localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving pricing data to localStorage:", error);
    }
};
