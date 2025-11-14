// pages/search.tsx
"use client"
import { SearchScreen } from '@/components/screens/SearchScreen';
import { useApp } from '@/context/AppContext';
import { useRouter, useSearchParams } from 'next/navigation';


export default function SearchPage() {
  const router = useRouter();
  const { selectedProviderId, setSelectedProviderId, language } = useApp();
  const searchParams = useSearchParams()

  // you can read router.query.q and router.query.category here
  const q = searchParams.get("q");
  const category = searchParams.get("category");

  return (
    
      <SearchScreen
        lang={language}
        initialQuery={q ?? ''}
        initialCategory={category as any}
        onBack={() => router.push('/home')}
        onProviderSelect={(id) => {
          setSelectedProviderId(id);
          router.push(`/provider/${id}`);
        }}
      />
  
  );
}
