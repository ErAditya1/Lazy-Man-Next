// pages/home.tsx
'use client'
import React from 'react';

import { HomeScreen } from '@/components/screens/HomeScreen';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { language, setLanguage, setSelectedProviderId } = useApp();
  const router = useRouter()

  return (
    
      <HomeScreen
        lang={language}
        onLanguageToggle={() => setLanguage(language === 'en' ? 'hi' : 'en')}
        onSearch={(q) => { router.push(`/search?q=${q}`) }}
        onCategorySelect={(c) => { router.push(`/search?category=${c}`)}}
        onProviderSelect={(id) => { setSelectedProviderId(id); 

          router.push(`/provider/${id}`);
        }}
      />
  
  );
}
