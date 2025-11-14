'use client'
import { useState } from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { mockCustomerUser, mockBookings } from '../../lib/mockData';
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
  Home,
  Briefcase,
  Shield,
  FileText,
  HelpCircle,
  Plus
} from 'lucide-react';

interface CustomerProfileScreenProps {
  lang: Language;
  onLanguageToggle: () => void;
  onSwitchToProvider: () => void;
}

export function CustomerProfileScreen({ 
  lang, 
  onLanguageToggle,
  onSwitchToProvider 
}: CustomerProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockCustomerUser);
  const [notificationSettings, setNotificationSettings] = useState(
    mockCustomerUser.preferences.notifications
  );

  const completedBookings = mockBookings.filter(b => b.status === 'completed').length;
  const activeBookings = mockBookings.filter(b => 
    b.status === 'in_progress' || b.status === 'accepted' || b.status === 'requested'
  ).length;

  const handleSave = () => {
    // In a real app, save to backend
    console.log('Saving user data:', userData);
    setIsEditing(false);
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
                src={userData.photo} 
                alt={userData.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-[rgb(var(--color-primary))] text-white p-2 rounded-full shadow-lg">
                  <Edit size={14} />
                </button>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
                />
              ) : (
                <h2 className="mb-1">{userData.name}</h2>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{completedBookings} {t('completed', lang)}</span>
                <span>•</span>
                <span>{activeBookings} {t('in_progress', lang)}</span>
              </div>
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
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900">{userData.phone}</p>
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
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900">{userData.email}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-gray-400" />
              <h3>{t('saved_addresses', lang)}</h3>
            </div>
            {!isEditing && (
              <button className="text-[rgb(var(--color-primary))] flex items-center gap-1">
                <Plus size={18} />
                <span className="text-sm">{t('add_address', lang)}</span>
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {userData.savedAddresses.map((addr) => (
              <div key={addr.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg">
                  {addr.label === 'Home' ? (
                    <Home size={18} className="text-[rgb(var(--color-primary))]" />
                  ) : (
                    <Briefcase size={18} className="text-[rgb(var(--color-primary))]" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{addr.label}</p>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                </div>
              </div>
            ))}
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
                <p className="text-gray-900">{t('privacy_policy', lang)}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-gray-400" />
                <p className="text-gray-900">{t('terms_conditions', lang)}</p>
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

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-400" />
                <p className="text-gray-900">{t('about_app', lang)}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Switch to Provider & Logout */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <button
            onClick={onSwitchToProvider}
            className="w-full flex items-center justify-center gap-2 p-4 mb-3 bg-linear-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] text-white rounded-xl hover:shadow-lg transition-shadow"
          >
            <User size={20} />
            <span>{t('switch_to_provider', lang)}</span>
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