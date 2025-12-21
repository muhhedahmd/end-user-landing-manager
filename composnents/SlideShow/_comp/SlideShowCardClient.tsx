"use client";

import { memo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { CompositionType } from "@/types/schema";

const RenderSlides = dynamic(
  () => import("./RenderSlide").then((mod) => mod.RenderSlidesManual),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 bg-muted/20 animate-pulse rounded-xl" />
    ),
  }
);

interface SlideshowCardClientProps {
  id: string;
  composition: string;
  autoPlay: boolean;
  interval: number;
  index: number;
}

export const SlideshowCardClient = memo(function SlideshowCardClient({
  id,
  composition,
  autoPlay,
  interval,
  index,
}: SlideshowCardClientProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        // Use intersectionRatio for more stable detection
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.4;

        // Mark as seen once visible
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }

        // Update viewport status
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
  }, [hasBeenVisible]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
      viewport={{ once: true, margin: "100px" }}
    >
      {/* Only render slides after component has been visible at least once */}
      {/* {hasBeenVisible && ( */}
        <RenderSlides
          isInViewport={isInViewport}
          autoPlay={autoPlay}
          interval={interval}
          id={id}
          composition={composition as CompositionType}
        />
      {/* )} */}
    </motion.div>
  );
});