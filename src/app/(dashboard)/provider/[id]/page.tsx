// pages/provider/[id].tsx
"use client"
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockProviders } from '@/lib/mockData';
import { ProviderProfileScreen } from '@/components/screens/ProviderProfileScreen';


export default function ProviderPage() {
  const router = useRouter();
  const params = useParams()
  const {id} = params;
  const provider = mockProviders.find(p => p.id === id);

  if (!provider) return <div className="p-8">Provider not found</div>;

  return (
 
      <ProviderProfileScreen
        provider={provider}
        lang="en"
        onBack={() => router.back()}
        onBook={() => router.push(`/provider/${id}/book`)}
      />
   
  );
}
