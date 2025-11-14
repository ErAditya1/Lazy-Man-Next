// pages/onboarding.tsx
import React from 'react';

import { OnboardingCarouselScreen } from '@/components/screens/OnboardingCarouselScreen';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  return (
    <div>
      <OnboardingCarouselScreen
        lang="en"
        onComplete={() => {
          localStorage.setItem('hasSeenOnboarding', 'true');
          router.push('/auth');
        }}
        onSkip={() => {
          localStorage.setItem('hasSeenOnboarding', 'true');
          router.push('/auth');
        }}
      />
    </div>
  );
}
