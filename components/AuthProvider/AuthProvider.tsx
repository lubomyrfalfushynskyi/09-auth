'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        // First check session validity
        const sessionUser = await checkSession();
        if (sessionUser) {
          // If session is valid, get full user data
          const user = await getMe();
          setUser(user);
        }
      } catch (error) {
        // User not authenticated - that's ok
        console.error('Session check failed', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [setUser]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
