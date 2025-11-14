import { useEffect } from 'react';
import { Zap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    // Show splash for 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] flex items-center justify-center animate-fade-in z-50">
      <div className="text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-[24px] backdrop-blur-sm mb-6 animate-scale-in shadow-2xl">
          <Zap className="w-12 h-12 text-white" fill="white" strokeWidth={2} />
        </div>
        
        {/* App Name */}
        <h1 className="text-white mb-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Lazy Man
        </h1>
        
        {/* Tagline */}
        <p className="text-white/90 text-xl animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          तुरंत मदद पाएँ
        </p>
        
        {/* Loading Indicator */}
        <div className="mt-12 flex gap-2 justify-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
