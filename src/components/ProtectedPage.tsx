import { ReactNode, useEffect } from 'react';

import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export default function ProtectedPage({ children }:{children:ReactNode}) {
  const { isAuthenticated } = useApp();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) router.replace('/auth');
  }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;
  return <>{children}</>;
}
