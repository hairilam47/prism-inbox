import React from 'react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Onboarding = () => {
  return (
    <ThemeProvider>
      <OnboardingFlow />
    </ThemeProvider>
  );
};

export default Onboarding;