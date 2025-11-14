"use client"
import { useState } from 'react';
import { Language, ServiceCategory } from '../../types';
import { t } from '../../lib/translations';
import { mockProviders } from '../../lib/mockData';
import { Search, MapPin, Bell, Globe } from 'lucide-react';
import { CategoryCard } from '../CategoryCard';
import { ProviderCard } from '../ProviderCard';

interface HomeScreenProps {
  lang: Language;
  onLanguageToggle: () => void;
  onSearch: (query: string) => void;
  onCategorySelect: (category: ServiceCategory) => void;
  onProviderSelect: (providerId: string) => void;
}

const categories: ServiceCategory[] = [
  'plumber',
  'electrician',
  'maid',
  'carpenter',
  'painter',
  'peon',
  'cleaner',
  'gardener',
];

export function HomeScreen({
  lang,
  onLanguageToggle,
  onSearch,
  onCategorySelect,
  onProviderSelect,
}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-linear-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] text-white px-4 pt-12 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-white mb-1">Lazy Man</h1>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <MapPin className="w-4 h-4" />
                <span>New Delhi, India</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onLanguageToggle}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors md:hidden"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_services', lang)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </form>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="mb-4">{t('categories', lang)}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                lang={lang}
                onClick={() => onCategorySelect(category)}
              />
            ))}
          </div>
        </div>

        {/* Nearby Providers */}
        <div>
          <h2 className="mb-4">{t('nearby_providers', lang)}</h2>
          <div className="space-y-3">
            {mockProviders.slice(0, 5).map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                lang={lang}
                onClick={() => onProviderSelect(provider.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}