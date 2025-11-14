import { useState } from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { User, MapPin, Check } from 'lucide-react';

interface UserSetupScreenProps {
  lang: Language;
  onComplete: (userData: { name: string; locationEnabled: boolean }) => void;
}

export function UserSetupScreen({ lang, onComplete }: UserSetupScreenProps) {
  const [name, setName] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const handleEnableLocation = () => {
    setIsRequestingLocation(true);
    
    // Request browser location permission
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationEnabled(true);
          setIsRequestingLocation(false);
          console.log('Location enabled:', position.coords);
        },
        (error) => {
          console.error('Location error:', error);
          setIsRequestingLocation(false);
          // Still mark as enabled for demo purposes
          setLocationEnabled(true);
        }
      );
    } else {
      setIsRequestingLocation(false);
      // Fallback for browsers without geolocation
      setLocationEnabled(true);
    }
  };

  const handleFinish = () => {
    if (name.trim()) {
      onComplete({ name: name.trim(), locationEnabled });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F8FA] to-white">
      <div className="max-w-md mx-auto px-6 py-12">
        {/* Progress Indicator */}
        <div className="flex gap-2 mb-12">
          <div className="flex-1 h-2 bg-[#FF6B35] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#FF6B35] rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/5 flex items-center justify-center mb-6">
              <User className="w-10 h-10 text-[#FF6B35]" />
            </div>
            <h1 className="mb-2">{t('setup_profile', lang)}</h1>
            <p className="text-[#6B7280]">
              {lang === 'en' 
                ? 'Just a few more details to get started'
                : 'शुरू करने के लिए बस कुछ और विवरण'}
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-[#6B7280]">{t('full_name', lang)}</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('enter_name', lang)}
                className="w-full pl-12 pr-4 py-4 bg-[#F7F8FA] rounded-xl border border-[#6B7280]/20 focus:border-[#FF6B35] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Location Permission Card */}
          <div className="bg-white rounded-2xl border border-[#6B7280]/10 p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                locationEnabled 
                  ? 'bg-green-500/10' 
                  : 'bg-[#FF6B35]/10'
              }`}>
                {locationEnabled ? (
                  <Check className="w-6 h-6 text-green-500" />
                ) : (
                  <MapPin className="w-6 h-6 text-[#FF6B35]" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="mb-1">{t('location_permission', lang)}</h3>
                <p className="text-[#6B7280]">
                  {t('location_permission_desc', lang)}
                </p>
              </div>
            </div>

            {!locationEnabled && (
              <button
                onClick={handleEnableLocation}
                disabled={isRequestingLocation}
                className="w-full py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E55A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRequestingLocation 
                  ? lang === 'en' ? 'Requesting...' : 'अनुरोध कर रहे हैं...'
                  : t('enable_location', lang)}
              </button>
            )}

            {locationEnabled && (
              <div className="flex items-center gap-2 text-green-500">
                <Check className="w-5 h-5" />
                <span>
                  {lang === 'en' ? 'Location enabled' : 'स्थान सक्षम है'}
                </span>
              </div>
            )}
          </div>

          {/* Skip Button */}
          {!locationEnabled && (
            <button
              onClick={() => setLocationEnabled(false)}
              className="w-full text-center text-[#6B7280] hover:text-[#FF6B35] transition-colors"
            >
              {t('skip_for_now', lang)}
            </button>
          )}
        </div>

        {/* Bottom Fixed Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-[#6B7280]/10">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleFinish}
              disabled={!name.trim()}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-xl hover:bg-[#E55A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {t('finish_setup', lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}