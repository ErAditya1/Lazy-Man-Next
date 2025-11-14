// pages/profile.tsx
'use client'
import { CustomerProfileScreen } from '@/components/screens/CustomerProfileScreen';
import { ProviderAccountScreen } from '@/components/screens/ProviderAccountScreen';
import { useApp } from '@/context/AppContext';
import React from 'react';

export default function ProfilePage() {
  const { language, userType, setUserType, setLanguage } = useApp();

  return (
   <>
      {userType === 'customer' ? (
        <CustomerProfileScreen lang={language} onLanguageToggle={() => setLanguage(language === 'en' ? 'hi' : 'en')} onSwitchToProvider={() => setUserType('provider')} />
      ) : (
        <ProviderAccountScreen lang={language} onLanguageToggle={() => setLanguage(language === 'en' ? 'hi' : 'en')} onSwitchToCustomer={() => setUserType('customer')} />
      )}
</>
  );
}
