"use client";

import { useEffect, useRef, ReactNode } from 'react';

interface AnimationWrapperProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimationWrapper({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = ''
}: AnimationWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || animation === 'none') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translate(0, 0) scale(1)';
            }, delay * 1000);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, animation]);

  const getInitialStyle = () => {
    const baseStyle = {
      opacity: 0,
      transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDelay: `${delay}s`
    };

    switch (animation) {
      case 'fade-up':
        return { ...baseStyle, transform: 'translateY(30px)' };
      case 'fade-down':
        return { ...baseStyle, transform: 'translateY(-30px)' };
      case 'fade-left':
        return { ...baseStyle, transform: 'translateX(30px)' };
      case 'fade-right':
        return { ...baseStyle, transform: 'translateX(-30px)' };
      case 'scale':
        return { ...baseStyle, transform: 'scale(0.9)' };
      default:
        return baseStyle;
    }
  };

  return (
    <div ref={elementRef} style={getInitialStyle()} className={className}>
      {children}
    </div>
  );
}
