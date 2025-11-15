'use client';
import { useEffect, useRef, useState } from 'react';
import { Wrench, ShieldCheck, CreditCard, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Language } from '../../types';
import { t } from '../../lib/translations';

interface OnboardingCarouselScreenProps {
  lang: Language;
  onComplete: () => void;
  onSkip: () => void;
}

/**
 * Responsive, accessible onboarding carousel with keyboard + swipe support.
 * - swipe: left/right on touch devices
 * - keyboard: left/right arrows
 * - large screens: show prev/next chevrons
 * - respects prefers-reduced-motion (no autoplay / limited animations)
 */
export function OnboardingCarouselScreen({ lang, onComplete, onSkip }: OnboardingCarouselScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoplayRef = useRef<number | null>(null);

  const slides = [
    {
      icon: Wrench,
      title: t('onboarding_slide1_title', lang) || 'Find trusted help',
      description: t('onboarding_slide1_desc', lang) || 'Quickly find local plumbers, electricians and home helpers.',
      gradient: 'from-[#FF6B35]/25 to-[#FF6B35]/6',
      iconColor: '#FF6B35',
    },
    {
      icon: ShieldCheck,
      title: t('onboarding_slide2_title', lang) || 'Verified & Safe',
      description: t('onboarding_slide2_desc', lang) || 'Providers are background-checked and reviewed by users.',
      gradient: 'from-green-500/20 to-green-500/5',
      iconColor: '#10B981',
    },
    {
      icon: CreditCard,
      title: t('onboarding_slide3_title', lang) || 'Secure Payments',
      description: t('onboarding_slide3_desc', lang) || 'Pay securely via your preferred method after service.',
      gradient: 'from-blue-500/20 to-blue-500/6',
      iconColor: '#3B82F6',
    },
  ];

  const lastIndex = slides.length - 1;

  // navigation helpers
  const goNext = () => setCurrentSlide((s) => (s >= lastIndex ? s : s + 1));
  const goPrev = () => setCurrentSlide((s) => (s <= 0 ? 0 : s - 1));
  const goIndex = (i: number) => setCurrentSlide(Math.max(0, Math.min(lastIndex, i)));

  // keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // swipe handling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (ev: TouchEvent) => {
      touchStartX.current = ev.touches[0].clientX;
      touchEndX.current = null;
    };
    const onTouchMove = (ev: TouchEvent) => {
      touchEndX.current = ev.touches[0].clientX;
    };
    const onTouchEnd = () => {
      if (touchStartX.current == null || touchEndX.current == null) return;
      const dx = touchStartX.current - touchEndX.current;
      const threshold = 40; // minimal swipe distance
      if (dx > threshold) goNext();
      else if (dx < -threshold) goPrev();
      touchStartX.current = null;
      touchEndX.current = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [containerRef.current, currentSlide]);

  // optional autoplay (only when not reduced-motion)
  useEffect(() => {
    if (reducedMotion) return;
    // autoplay to next slide every 5s; stop at last slide
    autoplayRef.current = window.setInterval(() => {
      setCurrentSlide((s) => (s < lastIndex ? s + 1 : s));
    }, 5000);

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [reducedMotion]);

  // announce slide changes for screen readers — we show title inside aria-live region below

  const ActiveIcon = slides[currentSlide].icon;

  return (
    <div className="relative min-h-screen bg-linear-to-br from-[#F7F8FA] to-white flex flex-col text-slate-900 " ref={containerRef}>
      {/* Top bar: skip */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
        <button
          onClick={onSkip}
          aria-label={t('skip', lang) || 'Skip onboarding'}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-colors"
        >
          <span className="hidden md:inline">{t('skip', lang) || 'Skip'}</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Large-screen prev/next controls */}
      <div className="hidden md:flex absolute inset-y-0 left-2 items-center z-10">
        <button
          onClick={goPrev}
          aria-label="Previous"
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-40"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden md:flex absolute inset-y-0 right-2 items-center z-10">
        <button
          onClick={goNext}
          aria-label="Next"
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-40"
          disabled={currentSlide === lastIndex}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-36 md:pb-20">
        <div
          className={`w-36 h-36 md:w-44 md:h-44 lg:w-56 lg:h-56 rounded-full flex items-center justify-center mb-8 md:mb-10 shadow-lg`}
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))`,
          }}
        >
          {/* inner gradient circle that changes per slide */}
          <div
            className={`w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full flex items-center justify-center`}
            style={{
              background: `linear-gradient(135deg, ${slides[currentSlide].gradient.replace('/25', '')}, rgba(255,255,255,0.04))`,
              boxShadow: 'inset 0 6px 18px rgba(0,0,0,0.03)',
            }}
          >
            <ActiveIcon className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" strokeWidth={1.5} style={{ color: slides[currentSlide].iconColor }} />
          </div>
        </div>

        <section className="text-center max-w-xl px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3" aria-live="polite">
            {slides[currentSlide].title}
          </h2>
          <p className="text-slate-600 md:text-lg">{slides[currentSlide].description}</p>
        </section>

        {/* Dots */}
        <nav className="flex gap-3 mt-8 md:mt-12" aria-label="Onboarding progress">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goIndex(i)}
              aria-current={i === currentSlide ? 'true' : undefined}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all ${i === currentSlide ? 'w-10 md:w-12 bg-[#FF6B35] h-3' : 'w-3 md:w-3 bg-slate-300 h-3 hover:bg-slate-400'}`}
            />
          ))}
        </nav>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white/80 backdrop-blur-sm border-t border-slate-100 z-20">
        <div className="max-w-xl mx-auto px-2 md:px-0 flex gap-3 items-center">
          <button
            onClick={currentSlide === lastIndex ? onComplete : goNext}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 md:py-4 px-4 rounded-xl bg-[#FF6B35] text-white font-semibold shadow-md hover:bg-[#E55A2A] transition-colors"
            aria-label={currentSlide === lastIndex ? (t('get_started', lang) || 'Get started') : (t('next', lang) || 'Next')}
          >
            <span>{currentSlide === lastIndex ? (t('get_started', lang) || 'Get started') : (t('next', lang) || 'Next')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* small secondary button on mobile/tablet */}
          <button
            onClick={currentSlide === lastIndex ? onSkip : goPrev}
            className="hidden md:inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            aria-label={currentSlide === lastIndex ? (t('skip', lang) || 'Skip') : 'Previous'}
            disabled={currentSlide === 0 && currentSlide !== lastIndex}
          >
            {currentSlide === lastIndex ? (t('skip', lang) || 'Skip') : 'Previous'}
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
