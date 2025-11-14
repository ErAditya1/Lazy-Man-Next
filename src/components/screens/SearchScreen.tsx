import { useState } from 'react';
import { Language, ServiceCategory, Provider } from '../../types';
import { t } from '../../lib/translations';
import { mockProviders } from '../../lib/mockData';
import { ArrowLeft, SlidersHorizontal, List, Map as MapIcon } from 'lucide-react';
import { ProviderCard } from '../ProviderCard';

interface SearchScreenProps {
  lang: Language;
  initialQuery?: string;
  initialCategory?: ServiceCategory;
  onBack: () => void;
  onProviderSelect: (providerId: string) => void;
}

type ViewMode = 'list' | 'map';
type SortBy = 'distance' | 'rating' | 'price';

export function SearchScreen({
  lang,
  initialQuery = '',
  initialCategory,
  onBack,
  onProviderSelect,
}: SearchScreenProps) {
  const [query, setQuery] = useState(initialQuery);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>(
    initialCategory || 'all'
  );
  const [sortBy, setSortBy] = useState<SortBy>('distance');
  const [maxDistance, setMaxDistance] = useState(5);
  const [minRating, setMinRating] = useState(0);

  // Filter providers
  let filteredProviders = mockProviders.filter((provider) => {
    if (selectedCategory !== 'all' && !provider.services.includes(selectedCategory)) {
      return false;
    }
    if (query && !provider.name.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    if (provider.distance > maxDistance) {
      return false;
    }
    if (provider.rating < minRating) {
      return false;
    }
    return true;
  });

  // Sort providers
  filteredProviders.sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.startingPrice - b.startingPrice;
    return 0;
  });

  const categories: (ServiceCategory | 'all')[] = [
    'all',
    'plumber',
    'electrician',
    'maid',
    'carpenter',
    'painter',
    'peon',
    'cleaner',
    'gardener',
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] pb-20 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 md:top-16">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors md:hidden"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_services', lang)}
              className="flex-1 px-4 py-2 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]/20"
            />
          </div>

          {/* View Mode & Filter Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[rgb(var(--color-primary))] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  viewMode === 'map'
                    ? 'bg-[rgb(var(--color-primary))] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm">{t('filter', lang)}</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 border-t border-gray-100 px-4 py-4">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  Category
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-[rgb(var(--color-primary))] text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category === 'all' ? 'All' : t(category, lang)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  {t('sort', lang)}
                </label>
                <div className="flex gap-2">
                  {(['distance', 'rating', 'price'] as SortBy[]).map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSortBy(sort)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                        sortBy === sort
                          ? 'bg-[rgb(var(--color-primary))] text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {sort.charAt(0).toUpperCase() + sort.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distance Filter */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  Max Distance: {maxDistance} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  Min Rating: {minRating > 0 ? minRating : 'Any'}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-3 text-sm text-gray-600">
          {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  lang={lang}
                  onClick={() => onProviderSelect(provider.id)}
                />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600">{t('no_providers_nearby', lang)}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
            <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Map view would display providers on a map</p>
            <p className="text-sm text-gray-400 mt-2">
              Integration with mapping service required
            </p>
          </div>
        )}
      </div>
    </div>
  );
}