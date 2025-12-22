

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/analytic-client';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const cleanupRef = useRef<(() => void) | null>(null);
  const previousPathRef = useRef<string>(pathname);

  useEffect(() => {
    // make a scroll in top 
    if(typeof window !== 'undefined')
    window.scrollTo(0, 0);
    
  },[])
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Function to send engagement for previous page
    const sendPreviousPageEngagement = () => {
      if (previousPathRef.current) {
        analytics.trackEngagement(previousPathRef.current);
      }
    };

    // Track new page view
    const trackNewPage = () => {
      analytics.trackPageView(pathname);
      cleanupRef.current = analytics.startScrollTracking();
      previousPathRef.current = pathname;
    };

    // On mount or pathname change
    trackNewPage();

    // Setup beforeunload listener
    const handleBeforeUnload = () => {
      analytics.trackEngagement(pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Send engagement data when component unmounts or path changes
      sendPreviousPageEngagement();

      window.removeEventListener('beforeunload', handleBeforeUnload);

      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [pathname]);

  
  return <>{children}</>;
}