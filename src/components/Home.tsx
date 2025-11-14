import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Bell, User, Wrench, Droplet, 
  Zap, Hammer, PaintBucket, Sparkles, 
  ChevronRight, Star, Clock, TrendingUp
} from 'lucide-react';

const categories = [
  { id: 'plumber', name: 'Plumber', nameHindi: 'प्लम्बर', icon: Droplet, color: '#3B82F6', count: 127 },
  { id: 'electrician', name: 'Electrician', nameHindi: 'इलेक्ट्रीशियन', icon: Zap, color: '#F59E0B', count: 95 },
  { id: 'carpenter', name: 'Carpenter', nameHindi: 'बढ़ई', icon: Hammer, color: '#8B4513', count: 82 },
  { id: 'maid', name: 'Maid/Bai', nameHindi: 'घरेलू सहायक', icon: Sparkles, color: '#EC4899', count: 215 },
  { id: 'painter', name: 'Painter', nameHindi: 'पेंटर', icon: PaintBucket, color: '#10B981', count: 64 },
  { id: 'peon', name: 'Peon', nameHindi: 'चपरासी', icon: User, color: '#6366F1', count: 43 },
  { id: 'handyman', name: 'Handyman', nameHindi: 'मैकेनिक', icon: Wrench, color: '#FF6B35', count: 156 },
];

const quickActions = [
  { id: 'emergency', label: 'Emergency', labelHindi: 'आपातकाल', icon: Zap, color: '#DC2626' },
  { id: 'scheduled', label: 'Schedule', labelHindi: 'शेड्यूल', icon: Clock, color: '#3B82F6' },
  { id: 'popular', label: 'Popular', labelHindi: 'लोकप्रिय', icon: TrendingUp, color: '#16A34A' },
];

interface HomeProps {
  onLogout: () => void;
}

export default function Home({ onLogout }: HomeProps) {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Koramangala, Bangalore');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query?: string) => {
    const searchCategory = query || searchQuery;
    navigate(`/search?q=${encodeURIComponent(searchCategory)}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/search?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="w-5 h-5 text-[#FF6B35]" />
            <div className="flex-1">
              <p className="text-[#6B7280]">Current Location</p>
              <p className="font-medium truncate">{location}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-[#F7F8FA] rounded-lg relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-[#F7F8FA] rounded-lg ml-1"
          >
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for services..."
            className="w-full pl-12 pr-4 py-4 bg-[#F7F8FA] rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4 bg-white mt-2">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleSearch(action.label.toLowerCase())}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-[#F7F8FA] rounded-xl hover:bg-[#E5E7EB] transition-all"
              >
                <Icon className="w-5 h-5" style={{ color: action.color }} />
                <div className="text-left">
                  <p className="font-medium whitespace-nowrap">{action.label}</p>
                  <p className="text-[#9CA3AF]">{action.labelHindi}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2>Browse Services</h2>
            <p className="text-[#6B7280]">सेवाएँ देखें</p>
          </div>
          <button className="text-[#FF6B35] flex items-center gap-1 hover:gap-2 transition-all">
            View All
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="bg-white p-4 rounded-xl hover:shadow-md transition-all active:scale-[0.98] text-left group"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <h4 className="mb-1">{category.name}</h4>
                <p className="text-[#9CA3AF] mb-2">{category.nameHindi}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">{category.count} available</span>
                  <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Providers */}
      <div className="px-4 py-6 bg-white mt-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2>Top Rated Nearby</h2>
            <p className="text-[#6B7280]">नजदीक के टॉप रेटेड</p>
          </div>
          <button 
            onClick={() => navigate('/search')}
            className="text-[#FF6B35] flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => navigate(`/provider/${i}`)}
              className="w-full bg-[#F7F8FA] p-3 rounded-xl hover:shadow-sm transition-all flex items-center gap-3 text-left group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#E55A2A] rounded-xl flex-shrink-0 flex items-center justify-center text-white">
                <span>RK</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="mb-1 truncate">Rajesh Kumar</h4>
                <p className="text-[#6B7280] mb-1">Plumber • 2.5 km away</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
                    <span className="font-medium">4.8</span>
                  </div>
                  <span className="text-[#9CA3AF]">•</span>
                  <span className="text-[#6B7280]">234 reviews</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#FF6B35]">₹299</p>
                <p className="text-[#9CA3AF]">per hour</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-4" />
    </div>
  );
}
