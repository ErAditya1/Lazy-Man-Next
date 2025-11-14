// pages/provider/dashboard.tsx
"use client"
import { ProviderDashboardScreen } from '@/components/screens/ProviderDashboardScreen';
import { useRouter } from 'next/navigation';



export default function ProviderDashboardPage() {
  const router = useRouter()
  return (
    
      <ProviderDashboardScreen lang="en" onProfileClick={() => { router.push('/profile') /* if needed */ }} />
    
  );
}
