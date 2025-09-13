import { useEffect, useState } from 'react';

export const useOnboarding = () => {
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

    useEffect(() => {
        // Check if user has completed onboarding
        const onboardingCompleted = localStorage.getItem('onboardingCompleted');
        setHasCompletedOnboarding(onboardingCompleted === 'true');
    }, []);

    const markOnboardingCompleted = () => {
        localStorage.setItem('onboardingCompleted', 'true');
        setHasCompletedOnboarding(true);
    };

    const resetOnboarding = () => {
        localStorage.removeItem('onboardingCompleted');
        localStorage.removeItem('howItWorksDismissed');
        setHasCompletedOnboarding(false);
    };

    return {
        hasCompletedOnboarding,
        markOnboardingCompleted,
        resetOnboarding
    };
};