import { useState } from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { Wrench, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

interface OnboardingCarouselScreenProps {
  lang: Language;
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingCarouselScreen({ lang, onComplete, onSkip }: OnboardingCarouselScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Wrench,
      title: t('onboarding_slide1_title', lang),
      description: t('onboarding_slide1_desc', lang),
      color: 'from-[#FF6B35]/20 to-[#FF6B35]/5'
    },
    {
      icon: ShieldCheck,
      title: t('onboarding_slide2_title', lang),
      description: t('onboarding_slide2_desc', lang),
      color: 'from-green-500/20 to-green-500/5'
    },
    {
      icon: CreditCard,
      title: t('onboarding_slide3_title', lang),
      description: t('onboarding_slide3_desc', lang),
      color: 'from-blue-500/20 to-blue-500/5'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const IconComponent = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F8FA] to-white flex flex-col">
      {/* Skip Button */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
        <button
          onClick={onSkip}
          className="px-4 py-2 text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          {t('skip', lang)}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        {/* Icon */}
        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${slides[currentSlide].color} flex items-center justify-center mb-8 md:mb-12 animate-scale-in`}>
          <IconComponent className="w-16 h-16 md:w-20 md:h-20 text-[#FF6B35]" strokeWidth={1.5} />
        </div>

        {/* Text Content */}
        <div className="text-center max-w-md animate-fade-in">
          <h2 className="mb-4 text-[#111827]">{slides[currentSlide].title}</h2>
          <p className="text-[#6B7280] mb-8">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2 mb-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-[#FF6B35]'
                  : 'w-2 bg-[#6B7280]/30 hover:bg-[#6B7280]/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-[#6B7280]/10">
        <button
          onClick={handleNext}
          className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <span>{currentSlide === slides.length - 1 ? t('get_started', lang) : t('next', lang)}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
