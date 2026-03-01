"use client";

import { memo, useEffect, useRef, useState } from "react";
import { CompositionType } from "@/types/schema";

import RenderSlides from "./RenderSlide";

interface SlideshowCardClientProps {
  id: string;
  locale: "en" | "ar";
  composition: keyof typeof CompositionType;
  autoPlay: boolean;
  interval: number;
  index: number;
  prefetchedSlides?: any[];
}

export const SlideshowCardClient = memo(function SlideshowCardClient({
  locale,
  id,
  composition,
  autoPlay,
  interval,
  prefetchedSlides,
}: SlideshowCardClientProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {

    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {


        const entry = entries[0];
        if (!entry) return;

        // Use intersectionRatio for more stable detection
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.4;

        requestAnimationFrame(() => {
          setIsInViewport((prev) => (prev === visible ? prev : visible));
        });
      },
      {
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 1],
        rootMargin: "0px 0px 200px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}

    >


      <RenderSlides
        prefetchedSlides={prefetchedSlides}
        locale={locale}
        isInViewport={isInViewport}
        autoPlay={autoPlay}
        interval={interval}
        id={id}
        composition={composition as CompositionType}
      />

    </div>
  );
});