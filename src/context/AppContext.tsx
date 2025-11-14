// src/context/AppContext.tsx
'use client';
import { Language } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';


type UserType = 'customer' | 'provider';

type AppContextValue = {
  language: Language;
  setLanguage: (l: Language) => void;
  userType: UserType;
  setUserType: (t: UserType) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  selectedProviderId: string | null;
  setSelectedProviderId: (id: string | null) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [userType, setUserType] = useState<UserType>('customer');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('isAuthenticated') === 'true';
      const lang = (localStorage.getItem('language') as Language) ?? 'en';
      setIsAuthenticated(auth);
      setLanguage(lang);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        userType,
        setUserType,
        isAuthenticated,
        setIsAuthenticated,
        selectedProviderId,
        setSelectedProviderId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
