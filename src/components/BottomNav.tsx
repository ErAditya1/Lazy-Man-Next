import { Home, Search, Calendar, User } from 'lucide-react';
import { Language } from '../types';
import { t } from '../lib/translations';

type NavTab = 'home' | 'search' | 'bookings' | 'profile';

interface BottomNavProps {
  active: NavTab;
  lang: Language;
  onNavigate: (tab: NavTab) => void;
}

export function BottomNav({ active, lang, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: 'home' as NavTab, icon: Home, label: 'Home' },
    { id: 'search' as NavTab, icon: Search, label: 'Search' },
    { id: 'bookings' as NavTab, icon: Calendar, label: t('my_bookings', lang) },
    { id: 'profile' as NavTab, icon: User, label: t('profile', lang) },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive
                  ? 'text-[rgb(var(--color-primary))]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-[rgb(var(--color-primary))]/10' : ''}`} />
              <span className="text-caption">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}