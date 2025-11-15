import { Home, Search, Calendar, User, Menu, LogOut, Settings, LayoutDashboard, Languages } from 'lucide-react';
import { Language } from '../types';
import { t } from '../lib/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useApp } from '@/context/AppContext';

type NavTab = 'home' | 'search' | 'bookings' | 'profile' | 'provider-dashboard' | 'aiplanner';

interface DesktopNavProps {
  active: NavTab;
  lang: Language;
  userType: 'customer' | 'provider';
  onNavigate: (tab: NavTab) => void;
  onLanguageToggle: () => void;
  onSwitchUserType: () => void;
}

export function DesktopNav({ 
  active, 
  lang, 
  onNavigate,
  onLanguageToggle,
}: DesktopNavProps) {
  const customerTabs = [
    { id: 'home' as NavTab, icon: Home, label: t('home', lang) },
    { id: 'search' as NavTab, icon: Search, label: t('search', lang) },
    // { id: 'aiplanner' as NavTab, icon: Settings, label: t('AI_Planner', lang) }, // <-- AI Planner tab
    { id: 'bookings' as NavTab, icon: Calendar, label: t('my_bookings', lang) },
  ];

  const providerTabs = [
    { id: 'provider-dashboard' as NavTab, icon: LayoutDashboard, label: t('dashboard', lang) },
  ];

  const { setUserType, userType } = useApp();

  const tabs = userType === 'customer' ? customerTabs : providerTabs;

  function handleSwitchtoUserType(){
    if (userType == 'customer') {
      setUserType("provider");
    } else {
      setUserType("customer");
    }
  }

  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[rgb(var(--color-primary))] to-orange-600 flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[rgb(var(--color-primary))]">Lazy Man</span>
              <span className="text-caption text-gray-500">{t('tagline', lang)}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={onLanguageToggle}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Languages className="w-5 h-5" />
              <span className="text-sm">{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-[rgb(var(--color-primary))]" />
                  </div>
                  <Menu className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onNavigate('profile')}>
                  <User className="w-4 h-4 mr-2" />
                  {t('profile', lang)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSwitchtoUserType}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  {userType === 'customer' 
                    ? t('switch_to_provider', lang)
                    : t('switch_to_customer', lang)
                  }
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('logout', lang)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
