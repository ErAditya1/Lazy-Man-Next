'use client'
import { useState } from 'react';
import { Language, ServiceCategory } from '../../types';
import { t } from '../../lib/translations';
import { mockProviderUser, categoryIcons } from '../../lib/mockData';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Bell, 
  Globe, 
  ChevronRight, 
  Edit, 
  LogOut,
  DollarSign,
  Briefcase,
  Shield,
  FileText,
  HelpCircle,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface ProviderAccountScreenProps {
  lang: Language;
  onLanguageToggle: () => void;
  onSwitchToCustomer: () => void;
}

export function ProviderAccountScreen({ 
  lang, 
  onLanguageToggle,
  onSwitchToCustomer 
}: ProviderAccountScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [providerData, setProviderData] = useState(mockProviderUser);
  const [isAvailable, setIsAvailable] = useState(mockProviderUser.availability);
  const [notificationSettings, setNotificationSettings] = useState(
    mockProviderUser.preferences.notifications
  );

  const handleSave = () => {
    // In a real app, save to backend
    console.log('Saving provider data:', providerData);
    setIsEditing(false);
  };

  const handleAvailabilityToggle = () => {
    setIsAvailable(!isAvailable);
    // In a real app, update backend
    console.log('Availability toggled:', !isAvailable);
  };

  const handleLogout = () => {
    // Clear authentication and reload to restart flow
    if (confirm(lang === 'en' ? 'Are you sure you want to logout?' : 'क्या आप लॉग आउट करना चाहते हैं?')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('hasSeenOnboarding');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] pb-20 md:pb-8">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] text-white px-4 pt-12 pb-24 md:pt-8 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1>{t('profile', lang)}</h1>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl hover:bg-white/30 transition-colors md:hidden"
              >
                <Edit size={18} />
                <span className="text-sm">{t('edit_profile', lang)}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Card - Overlapping header */}
      <div className="px-4 -mt-16 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          {/* Profile Photo and Basic Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img 
                src={providerData.photo} 
                alt={providerData.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              {providerData.verified && (
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full shadow-lg">
                  <CheckCircle size={16} />
                </div>
              )}
              {isEditing && (
                <button className="absolute top-0 right-0 bg-[rgb(var(--color-primary))] text-white p-2 rounded-full shadow-lg">
                  <Edit size={14} />
                </button>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={providerData.name}
                  onChange={(e) => setProviderData({ ...providerData, name: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
                />
              ) : (
                <h2 className="mb-1">{providerData.name}</h2>
              )}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">{providerData.rating}</span>
                </div>
                <span className="text-sm text-gray-500">
                  ({providerData.reviewCount} {t('reviews', lang)})
                </span>
              </div>
              {providerData.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs">
                  <CheckCircle size={12} />
                  {t('verified', lang)}
                </span>
              )}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-gray-400" />
                <div>
                  <p className="text-gray-900">{t('availability', lang)}</p>
                  <p className="text-sm text-gray-500">
                    {isAvailable ? t('currently_available', lang) : t('currently_unavailable', lang)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleAvailabilityToggle}
                className={`w-14 h-7 rounded-full transition-colors ${
                  isAvailable 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                  isAvailable ? 'translate-x-7' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          {/* Edit Mode Actions */}
          {isEditing && (
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-[rgb(var(--color-primary))] text-white py-3 rounded-xl hover:bg-[rgb(var(--color-primary-dark))] transition-colors"
              >
                {t('save', lang)}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                {t('cancel', lang)}
              </button>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">{t('phone', lang)}</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={providerData.phoneNumber}
                    onChange={(e) => setProviderData({ ...providerData, phoneNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900">{providerData.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={20} className="text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">{t('email', lang)}</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={providerData.email}
                    onChange={(e) => setProviderData({ ...providerData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900">{providerData.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">{t('address', lang)}</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={providerData.location.address}
                    onChange={(e) => setProviderData({ 
                      ...providerData, 
                      location: { ...providerData.location, address: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900">{providerData.location.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={20} className="text-gray-400" />
            <h3>{t('earnings', lang)}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-green-600" />
                <p className="text-sm text-green-700">{t('this_month', lang)}</p>
              </div>
              <p className="text-green-900">₹{providerData.monthlyEarnings?.toLocaleString()}</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={18} className="text-blue-600" />
                <p className="text-sm text-blue-700">{t('total_earnings', lang)}</p>
              </div>
              <p className="text-blue-900">₹{providerData.totalEarnings?.toLocaleString()}</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase size={18} className="text-purple-600" />
                <p className="text-sm text-purple-700">{t('total_jobs', lang)}</p>
              </div>
              <p className="text-purple-900">{providerData.totalJobs}</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-orange-600" />
                <p className="text-sm text-orange-700">{t('completed_jobs', lang)}</p>
              </div>
              <p className="text-orange-900">{providerData.completedJobs}</p>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <h3 className="mb-4">{t('business_details', lang)}</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">{t('services_offered', lang)}</p>
              <div className="flex flex-wrap gap-2">
                {providerData.services.map((service) => (
                  <span 
                    key={service}
                    className="inline-flex items-center gap-1 px-3 py-2 bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))] rounded-lg"
                  >
                    <span>{categoryIcons[service as ServiceCategory]}</span>
                    <span className="text-sm">{t(service as ServiceCategory, lang)}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">{t('pricing', lang)}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-900">₹{providerData.startingPrice}</span>
                <span className="text-sm text-gray-600">
                  {providerData.priceType === 'hourly' ? t('per_hour', lang) : t('fixed_price', lang)}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">{t('bio', lang)}</p>
              {isEditing ? (
                <textarea
                  value={providerData.bio}
                  onChange={(e) => setProviderData({ ...providerData, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[80px]"
                />
              ) : (
                <p className="text-gray-900">{providerData.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <h3 className="mb-4">{t('settings', lang)}</h3>
          
          <div className="space-y-1">
            {/* Language Toggle */}
            <button
              onClick={onLanguageToggle}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-gray-400" />
                <div className="text-left">
                  <p className="text-gray-900">{t('language', lang)}</p>
                  <p className="text-sm text-gray-500">
                    {lang === 'en' ? 'English' : 'हिन्दी'}
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            {/* Notification Settings */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Bell size={20} className="text-gray-400" />
                <p className="text-gray-900">{t('notifications', lang)}</p>
              </div>
              
              <div className="ml-8 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">{t('booking_updates', lang)}</p>
                  <button
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      bookingUpdates: !notificationSettings.bookingUpdates
                    })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notificationSettings.bookingUpdates 
                        ? 'bg-[rgb(var(--color-primary))]' 
                        : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      notificationSettings.bookingUpdates ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">{t('promotional_offers', lang)}</p>
                  <button
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      promotionalOffers: !notificationSettings.promotionalOffers
                    })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notificationSettings.promotionalOffers 
                        ? 'bg-[rgb(var(--color-primary))]' 
                        : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      notificationSettings.promotionalOffers ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Options */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-gray-400" />
                <div className="text-left">
                  <p className="text-gray-900">{t('verification_status', lang)}</p>
                  <p className="text-sm text-gray-500">
                    {providerData.verified ? t('verified', lang) : 'Not Verified'}
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-gray-400" />
                <p className="text-gray-900">{t('documents', lang)}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-gray-400" />
                <p className="text-gray-900">{t('help_support', lang)}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Switch to Customer & Logout */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <button
            onClick={onSwitchToCustomer}
            className="w-full flex items-center justify-center gap-2 p-4 mb-3 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] text-white rounded-xl hover:shadow-lg transition-shadow"
          >
            <User size={20} />
            <span>{t('switch_to_customer', lang)}</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
          >
            <LogOut size={20} />
            <span>{t('logout', lang)}</span>
          </button>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-gray-500 mb-4">
          {t('version', lang)} 1.0.0
        </div>
      </div>
    </div>
  );
}