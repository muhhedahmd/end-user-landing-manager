/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Children, ReactElement, cloneElement } from 'react';

interface StaggerChildrenProps {
  children: ReactElement[];
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className = ''
}: StaggerChildrenProps) {
  return (
    <div className={className}>
      {Children.map(children as any, (child, index) => {
        return cloneElement(child, {
          ...child.props,
          style: {
            ...child.props.style,
            animationDelay: `${initialDelay + index * staggerDelay}s`
          }
        });
      })}
    </div>
  );
}