'use client'

import { useEffect, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

interface UseGSAPProps {
  ref: RefObject<HTMLElement>
  animation: gsap.TweenVars
  scrollTrigger?: ScrollTrigger.Vars
}

export function useGSAP({ ref, animation, scrollTrigger }: UseGSAPProps) {
  const lenis = useLenis()

  useEffect(() => {
    if (!ref.current) return

    // Sync Lenis with ScrollTrigger
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
    }

    // Create GSAP animation
    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        ...animation,
        scrollTrigger: {
          trigger: ref.current!,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          ...scrollTrigger,
        },
      })
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [ref, animation, scrollTrigger, lenis])
}