// src/components/Layout.tsx
'use client';
import React from 'react';

import { useApp } from '../../context/AppContext';
import { DesktopNav } from '@/components/DesktopNav';
import { BottomNav } from '@/components/BottomNav';
import { usePathname, useRouter } from 'next/navigation';

type Props = { children: React.ReactNode };

export  default function ({ children }:Props) {
  const router = useRouter();
  const pathname = usePathname()
  const { language, userType } = useApp();
  const path = pathname;

  // screens where nav should be hidden
  const hideNavFor = [
    '/onboarding',
    '/auth',
    '/user-setup',
    '/provider/[id]/book', // booking flow
    '/provider/[id]', // provider profile (you may change this)
    '/splash', // if you keep splash as a route
  ];

  const showNav = !hideNavFor.includes(path);

  const handleDesktopNavNavigate = (tab: string) => {
    // map desktop nav tab to routes
    if (tab === 'home') router.push('/home');
    else if (tab === 'search') router.push('/search');
    else if (tab === 'bookings') router.push('/bookings');
    else if (tab === 'profile') router.push('/profile');
    else if (tab === 'provider-dashboard') router.push('/provider/dashboard');
  };

  const handleBottomNavNavigate = (tab: 'home'|'search'|'bookings'|'profile') => {
    if (tab === 'home') router.push('/home');
    else if (tab === 'search') router.push('/search');
    else if (tab === 'bookings') router.push('/bookings');
    else if (tab === 'profile') router.push('/profile');
  };

  return (
    <div className="min-h-screen">
      {showNav && (
        <DesktopNav
          active={path.includes('/provider/dashboard') ? 'provider-dashboard' : (path.includes('/search') ? 'search' : (path.includes('/bookings') ? 'bookings' : (path === '/profile' ? 'profile' : 'home')))}
          lang={language}
          userType={userType}
          onNavigate={handleDesktopNavNavigate}
          onLanguageToggle={() => {}}
          onSwitchUserType={() => {}}
        />
      )}

      <main className={showNav ? 'md:pt-16' : ''}>{children}</main>

      {showNav && (
        <BottomNav
          active={path === '/search' ? 'search' : (path === '/bookings' ? 'bookings' : (path === '/profile' ? 'profile' : 'home'))}
          lang={language}
          onNavigate={handleBottomNavNavigate}
        />
      )}
    </div>
  );
};
