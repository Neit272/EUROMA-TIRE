'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';

function LoadingScreenContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle initial page load
  useEffect(() => {
    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 300);
    };

    if (document.readyState === 'complete') {
      handleComplete();
    } else {
      window.addEventListener('load', handleComplete);
      return () => window.removeEventListener('load', handleComplete);
    }
  }, []);

  // Handle route changes (page navigation)
  useEffect(() => {
    setIsNavigating(true);
    
    // Minimum loading time to prevent flash
    const minLoadingTime = setTimeout(() => {
      setIsNavigating(false);
    }, 800);

    return () => clearTimeout(minLoadingTime);
  }, [pathname, searchParams]);

  // Add click listener to detect navigation starts
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.target && link.href.startsWith(window.location.origin)) {
        setIsNavigating(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const showLoading = isLoading || isNavigating;

  if (!showLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin">
          <Image
            src="/icon.png"
            alt="Loading..."
            width={80}
            height={80}
            className="rounded-full"
            priority
          />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">Đang tải...</p>
      </div>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <Suspense fallback={null}>
      <LoadingScreenContent />
    </Suspense>
  );
}
