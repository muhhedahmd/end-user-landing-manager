'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lenisRef = { current: null as any }
interface SmoothScrollingProps {
  children: ReactNode
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: .7,

      }}
      ref={(instance) => {
        if (instance) lenisRef.current = instance
      }}
    >
      {children}
    </ReactLenis>
  )
}