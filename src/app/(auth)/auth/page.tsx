// pages/onboarding.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { OnboardingCarouselScreen } from '@/components/screens/OnboardingCarouselScreen';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;

    const seen = localStorage.getItem('hasSeenOnboarding') === 'true';
    if (seen) {
      router.replace('/login');
      return;
    }

    // prevent document from scrolling while onboarding is shown
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setChecked(true);

    return () => {
      // restore scroll after unmount
      document.body.style.overflow = prevOverflow || '';
    };
  }, [router]);

  // Avoid rendering until we've checked localStorage (prevents flicker)
  if (!checked) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F7F8FA] to-white flex items-center justify-center">
      <div
        className="w-full h-full max-w-5xl mx-auto flex items-center justify-center p-4 sm:p-6 md:p-8"
        style={{ height: '100vh' }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden flex flex-col">
          <OnboardingCarouselScreen
            lang="en"
            onComplete={() => {
              if (typeof window !== 'undefined') localStorage.setItem('hasSeenOnboarding', 'true');
              router.push('/login');
            }}
            onSkip={() => {
              if (typeof window !== 'undefined') localStorage.setItem('hasSeenOnboarding', 'true');
              router.push('/login');
            }}
          />
        </div>
      </div>
    </div>
  );
}
