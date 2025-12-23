/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';

export const useScrollTriggerReady = (
  containerRef: React.RefObject<HTMLElement | null> | null,
  dependencies: any[] = []
) => {
  const [isReady, setIsReady] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef?.current;
    
    if (!container) {
      setIsReady(false);
      return;
    }

    // Reset ready state when dependencies change
    setIsReady(false);

    const checkReady = async () => {
      try {
        // Wait for fonts to load
        await document.fonts.ready;

        // Wait for all images to load
        const images = container.querySelectorAll('img');
        if (images.length > 0) {
          await Promise.all(
            Array.from(images).map(
              (img) =>
                new Promise<void>((resolve) => {
                  if (img.complete) {
                    resolve();
                  } else {
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // Resolve even on error to not block
                  }
                })
            )
          );
        }

        // Wait for any videos to have metadata loaded
        const videos = container.querySelectorAll('video');
        if (videos.length > 0) {
          await Promise.all(
            Array.from(videos).map(
              (video) =>
                new Promise<void>((resolve) => {
                  if (video.readyState >= 1) {
                    resolve();
                  } else {
                    video.onloadedmetadata = () => resolve();
                    video.onerror = () => resolve();
                  }
                })
            )
          );
        }

        // Give a small delay for layout to stabilize
        timeoutIdRef.current = setTimeout(() => {
          requestAnimationFrame(() => {
            setIsReady(true);
          });
        }, 100);
      } catch (error) {
        console.error('Error in useScrollTriggerReady:', error);
        // Still set ready to true to not block forever
        setIsReady(true);
      }
    };

    checkReady();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...dependencies]);

  return isReady;
};