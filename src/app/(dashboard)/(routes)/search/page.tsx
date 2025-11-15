'use client';

import { SearchScreen } from '@/components/screens/SearchScreen';
import { useApp } from '@/context/AppContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

 function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { selectedProviderId, setSelectedProviderId, language } = useApp();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  return (
    
      <SearchScreen
        lang={language}
        initialQuery={q}
        initialCategory={category as any}
        onBack={() => router.push('/home')}
        onProviderSelect={(id) => {
          setSelectedProviderId(id);
          router.push(`/provider/${id}`);
        }}
      />
  
  );
}


export default function Search(){
  <Suspense fallback={<div>Loading search...</div>}>
    <SearchPage/>
  </Suspense>
}