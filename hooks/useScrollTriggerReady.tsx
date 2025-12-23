/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export const useScrollTriggerReady = (
  containerRef: React.RefObject<HTMLElement | null>,
  dependencies: any[] = []
) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;

    const checkReady = async () => {
      // Wait for fonts
      await document.fonts.ready;

      // Wait for images
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
                  img.onerror = () => resolve();
                }
              })
          )
        );
      }

      // ✅ Give a small delay for layout to stabilize
      timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          setIsReady(true);
        });
      }, 100);
    };

    checkReady();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [containerRef, ...dependencies]);

  return isReady;
};