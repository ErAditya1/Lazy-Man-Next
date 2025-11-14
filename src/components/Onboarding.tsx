import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search, Shield, Clock, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Search,
    title: 'Find Local Helpers',
    titleHindi: 'स्थानीय मदद खोजें',
    description: 'Connect with verified service providers near you',
    descriptionHindi: 'आस-पास के सत्यापित सेवा प्रदाताओं से जुड़ें',
    color: '#FF6B35',
  },
  {
    icon: Shield,
    title: 'Safe & Verified',
    titleHindi: 'सुरक्षित और सत्यापित',
    description: 'All providers are background checked',
    descriptionHindi: 'सभी प्रदाता पृष्ठभूमि जांचे गए हैं',
    color: '#3B82F6',
  },
  {
    icon: Clock,
    title: 'Book Instantly',
    titleHindi: 'तुरंत बुक करें',
    description: 'Get help in minutes, not hours',
    descriptionHindi: 'घंटों नहीं, मिनटों में मदद पाएं',
    color: '#16A34A',
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    onComplete();
    navigate('/auth');
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div 
          className="w-32 h-32 rounded-[32px] flex items-center justify-center mb-8 animate-scale-in"
          style={{ backgroundColor: `${slide.color}15` }}
        >
          <Icon 
            className="w-16 h-16" 
            style={{ color: slide.color }}
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-center mb-3 animate-fade-in">{slide.title}</h1>
        <p className="text-[#FF6B35] mb-4 text-center animate-fade-in">{slide.titleHindi}</p>
        <p className="text-[#6B7280] text-center max-w-sm animate-fade-in">
          {slide.description}
        </p>
        <p className="text-[#9CA3AF] text-center max-w-sm mt-1 animate-fade-in">
          {slide.descriptionHindi}
        </p>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-[#FF6B35]' 
                : 'w-2 bg-[#E5E7EB]'
            }`}
          />
        ))}
      </div>

      {/* Next button */}
      <div className="px-6 pb-8">
        <button
          onClick={handleNext}
          className="w-full bg-[#FF6B35] text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#E55A2A] active:scale-[0.98] transition-all shadow-md"
        >
          <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          {currentSlide === slides.length - 1 ? <Check className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
