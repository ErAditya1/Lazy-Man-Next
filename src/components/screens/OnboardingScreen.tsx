import { Language } from '../../types';
import { t } from '../../lib/translations';
import { ArrowRight } from 'lucide-react';

interface OnboardingScreenProps {
  lang: Language;
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingScreen({ lang, onComplete, onSkip }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full text-center">
        {/* Illustration */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="text-7xl">⚡</div>
          </div>
        </div>

        {/* Content */}
        <h1 className="mb-4 text-white">{t('onboarding_headline', lang)}</h1>
        <p className="mb-8 text-white/90 text-lg">
          {t('onboarding_subtitle', lang)}
        </p>

        {/* CTA */}
        <button
          onClick={onComplete}
          className="w-full bg-white text-[rgb(var(--color-primary))] py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-white/95 transition-colors mb-4"
        >
          <span>{t('get_started', lang)}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onSkip}
          className="text-white/80 hover:text-white transition-colors text-sm"
        >
          {t('skip', lang)}
        </button>
      </div>
    </div>
  );
}