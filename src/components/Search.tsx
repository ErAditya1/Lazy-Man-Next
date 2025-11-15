'use client';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, Search as SearchIcon, SlidersHorizontal, 
  MapIcon, List, Star, MapPin, Phone, Verified,
  X
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

const mockProviders = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    service: 'Plumber',
    rating: 4.8,
    reviews: 234,
    distance: 2.5,
    price: 299,
    image: 'RK',
    verified: true,
    available: true,
  },
  {
    id: 2,
    name: 'Amit Sharma',
    service: 'Electrician',
    rating: 4.9,
    reviews: 189,
    distance: 1.2,
    price: 349,
    image: 'AS',
    verified: true,
    available: true,
  },
  {
    id: 3,
    name: 'Sunita Devi',
    service: 'Maid/Bai',
    rating: 4.7,
    reviews: 312,
    distance: 0.8,
    price: 199,
    image: 'SD',
    verified: true,
    available: false,
  },
  {
    id: 4,
    name: 'Vikram Singh',
    service: 'Carpenter',
    rating: 4.6,
    reviews: 156,
    distance: 3.1,
    price: 399,
    image: 'VS',
    verified: true,
    available: true,
  },
  {
    id: 5,
    name: 'Priya Mehta',
    service: 'Painter',
    rating: 4.9,
    reviews: 98,
    distance: 2.0,
    price: 279,
    image: 'PM',
    verified: false,
    available: true,
  },
];

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || searchParams.get('category') || '';
  
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price'>('distance');
  const [maxDistance, setMaxDistance] = useState(5);
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredProviders = mockProviders
    .filter(p => !showVerifiedOnly || p.verified)
    .filter(p => p.distance <= maxDistance)
    .filter(p => p.rating >= minRating)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#F7F8FA] rounded-lg -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-10 pr-10 py-3 bg-[#F7F8FA] rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white rounded-full"
              >
                <X className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#F7F8FA] rounded-lg hover:bg-[#E5E7EB] transition-all">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filter & Sort</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                {/* Sort */}
                <div>
                  <label className="block mb-3 font-medium">Sort By</label>
                  <div className="flex gap-2">
                    {['distance', 'rating', 'price'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setSortBy(option as any)}
                        className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                          sortBy === option
                            ? 'border-[#FF6B35] bg-[#FFE8E0] text-[#FF6B35]'
                            : 'border-[#E5E7EB]'
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Distance */}
                <div>
                  <label className="block mb-3 font-medium">
                    Max Distance: {maxDistance} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(Number(e.target.value))}
                    className="w-full accent-[#FF6B35]"
                  />
                </div>

                {/* Min Rating */}
                <div>
                  <label className="block mb-3 font-medium">
                    Minimum Rating: {minRating || 'Any'}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full accent-[#FF6B35]"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block mb-3 font-medium">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="flex-1 px-3 py-2 bg-[#F7F8FA] rounded-lg"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="flex-1 px-3 py-2 bg-[#F7F8FA] rounded-lg"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Verified Only */}
                <div className="flex items-center justify-between">
                  <label className="font-medium">Verified Providers Only</label>
                  <button
                    onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      showVerifiedOnly ? 'bg-[#FF6B35]' : 'bg-[#E5E7EB]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all ${
                        showVerifiedOnly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex gap-1 bg-[#F7F8FA] rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded transition-all ${
                viewMode === 'map' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <MapIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-[#6B7280] mt-3">
          {filteredProviders.length} providers found • {filteredProviders.length} प्रदाता मिले
        </p>
      </div>

      {/* Content */}
      {viewMode === 'map' ? (
        <div className="h-[calc(100vh-180px)] bg-[#E5E7EB] relative">
          <div className="absolute inset-0 flex items-center justify-center text-[#6B7280]">
            <div className="text-center">
              <MapIcon className="w-12 h-12 mx-auto mb-2 text-[#9CA3AF]" />
              <p>Map View</p>
              <p className="text-[#9CA3AF]">Interactive map integration</p>
            </div>
          </div>

          {/* Map overlay cards */}
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {filteredProviders.slice(0, 3).map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => navigate(`/provider/${provider.id}`)}
                  className="flex-shrink-0 w-72 bg-white p-3 rounded-xl shadow-lg flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {provider.image}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <h4 className="truncate">{provider.name}</h4>
                      {provider.verified && (
                        <Verified className="w-4 h-4 text-[#3B82F6] flex-shrink-0" fill="#3B82F6" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <Star className="w-3 h-3 text-[#F59E0B]" fill="#F59E0B" />
                      <span>{provider.rating}</span>
                      <span>•</span>
                      <span>{provider.distance} km</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#FF6B35]">₹{provider.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {filteredProviders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#6B7280] mb-1">No providers found nearby</p>
              <p className="text-[#9CA3AF]">नज़दीक कोई सेवा प्रदाता नहीं। दूरी बढ़ा कर देखें।</p>
            </div>
          ) : (
            filteredProviders.map((provider) => (
              <button
                key={provider.id}
                onClick={() => navigate(`/provider/${provider.id}`)}
                className="w-full bg-white p-4 rounded-xl hover:shadow-md transition-all flex items-center gap-3 text-left group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] rounded-xl flex-shrink-0 flex items-center justify-center text-white relative">
                  {provider.image}
                  {provider.available && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#16A34A] border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="truncate">{provider.name}</h4>
                    {provider.verified && (
                      <Verified className="w-4 h-4 text-[#3B82F6] flex-shrink-0" fill="#3B82F6" />
                    )}
                  </div>
                  <p className="text-[#6B7280] mb-2">{provider.service}</p>
                  <div className="flex items-center gap-3 text-[#6B7280]">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
                      <span>{provider.rating}</span>
                      <span className="text-[#9CA3AF]">({provider.reviews})</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{provider.distance} km</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-medium text-[#FF6B35] mb-1">₹{provider.price}</p>
                  <p className="text-[#9CA3AF]">per hour</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('tel:+919876543210', '_self');
                    }}
                    className="mt-2 p-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] transition-all"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
