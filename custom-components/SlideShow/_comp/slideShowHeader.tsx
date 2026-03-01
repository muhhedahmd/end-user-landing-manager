"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import type { CompositionType } from "@/types/schema"

// ==================== TYPES ====================
type SlideshowType = "HERO" | "PROJECTS" | "SERVICES" | "CLIENTS" | "TESTIMONIALS" | "TEAM" | "CUSTOM"

interface SlideHeaderProps {
  title: string
  description: string
  slideShowType: SlideshowType
  compositionType: CompositionType
}

interface VariantProps {
  title: string
  description: string
}

// ==================== COMPOSITION VARIANTS ====================

// HERO Compositions
const HeroSingleComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      })
      gsap.from(descRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={containerRef} className="w-full flex flex-col items-center text-center gap-6 px-4">
      <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-5xl">
        {title}
      </h1>
      <p ref={descRef} className="text-lg md:text-xl lg:text-2xl max-w-3xl text-muted-foreground leading-relaxed">
        {description}
      </p>
    </header>
  )
}

const HeroParallaxComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bgRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      })
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      })
      gsap.from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      })
      gsap.to(bgRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={containerRef} className="w-full flex flex-col items-center text-center gap-6 px-4 relative overflow-hidden">
      <div
        ref={bgRef}
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"
      />
      <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl">
        {title}
      </h1>
      <p ref={descRef} className="text-lg md:text-xl lg:text-2xl max-w-3xl text-muted-foreground leading-relaxed">
        {description}
      </p>
    </header>
  )
}

const HeroZoomComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "back.out(1.7)"
      })
      gsap.from(descRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={containerRef} className="w-full flex flex-col items-center text-center gap-6 px-4">
      <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-5xl">
        {title}
      </h1>
      <p ref={descRef} className="text-lg md:text-xl lg:text-2xl max-w-3xl text-muted-foreground leading-relaxed">
        {description}
      </p>
    </header>
  )
}

const HeroFadeComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, descRef.current], {
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power2.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={containerRef} className="w-full flex flex-col items-center text-center gap-6 px-4">
      <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-5xl">
        {title}
      </h1>
      <p ref={descRef} className="text-lg md:text-xl lg:text-2xl max-w-3xl text-muted-foreground leading-relaxed">
        {description}
      </p>
    </header>
  )
}

// PROJECTS Compositions
const ProjectsGridComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out"
      })
      gsap.from(descRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-center gap-5 px-4">
      <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl">
        {title}
      </h2>
      <p ref={descRef} className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  )
}

const ProjectsCarouselComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out"
      })
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 0.8,
        delay: 0.3,
        transformOrigin: "left",
        ease: "power3.out"
      })
      gsap.from(descRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.4,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-center gap-5 px-4">
      <div className="flex items-center gap-4 w-full justify-center max-w-4xl">
        <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap">
          {title}
        </h2>
        <div ref={lineRef} className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full" />
      </div>
      <p ref={descRef} className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed">
        {description}
      </p>
    </div>
  )
}

const ProjectsMarqueeComposition: React.FC<VariantProps> = ({ title, description }) => {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        x: "-50%",
        duration: 20,
        repeat: -1,
        ease: "linear"
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="w-full overflow-hidden py-4">
      <div ref={marqueeRef} className="flex gap-12 items-center whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h2>
            <span className="text-2xl text-muted-foreground">•</span>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">{description}</p>
            <span className="text-2xl text-muted-foreground">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// SERVICES Compositions
const ServicesGridComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(1.7)"
      })
      gsap.from(descRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full text-center flex flex-col items-center gap-5 px-4">
      <h3 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl">
        {title}
      </h3>
      <p ref={descRef} className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  )
}

const ServicesStackedComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, descRef.current], {
        opacity: 0,
        y: 25,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-center gap-5 px-4">
      <h3 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl">
        {title}
      </h3>
      <p ref={descRef} className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  )
}

// CLIENTS Compositions
const ClientsAutoGridComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        rotationX: 90,
        duration: 0.8,
        ease: "power3.out"
      })
      gsap.from(descRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-center gap-5 px-4">
      <h3 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl">
        {title}
      </h3>
      <p ref={descRef} className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed">
        {description}
      </p>
    </div>
  )
}

const ClientsMarqueeComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, descRef.current], {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-center gap-5 px-4">
      <h3 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl">
        {title}
      </h3>
      <p ref={descRef} className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  )
}

// TESTIMONIALS Compositions
const TestimonialsFadeComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, descRef.current], {
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power2.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-center gap-5 px-4">
      <h3 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl">
        {title}
      </h3>
      <p ref={descRef} className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed">
        {description}
      </p>
    </div>
  )
}

const TestimonialsCarouselComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power3.out"
      })
      gsap.from(descRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-center gap-5 px-4">
      <h3 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl">
        {title}
      </h3>
      <p ref={descRef} className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  )
}

// TEAM Compositions
const TeamGridComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out"
      })
      gsap.from(descRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-center gap-5 px-4">
      <h3 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl">
        {title}
      </h3>
      <p ref={descRef} className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  )
}

const TeamStoryComposition: React.FC<VariantProps> = ({ title, description }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.9,
        ease: "back.out(1.7)"
      })
      gsap.from(descRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-center gap-6 px-4">
      <h3 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl">
        {title}
      </h3>
      <p ref={descRef} className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  )
}

// ==================== COMPOSITION MAP ====================
type CompositionMap = {
  [key in SlideshowType]: {
    [key in CompositionType]?: React.FC<VariantProps>
  }
}

const compositionMap: CompositionMap = {
  HERO: {
    SINGLE: HeroSingleComposition,
    PARALLAX: HeroParallaxComposition,
    ZOOM: HeroZoomComposition,
    FADE: HeroFadeComposition,
  },
  PROJECTS: {
    GRID: ProjectsGridComposition,
    CAROUSEL: ProjectsCarouselComposition,
    MARQUEE: ProjectsMarqueeComposition,
    SINGLE: ProjectsGridComposition,
  },
  SERVICES: {
    GRID: ServicesGridComposition,
    STACKED: ServicesStackedComposition,
    SINGLE: ServicesGridComposition,
    CAROUSEL: ServicesGridComposition,
  },
  CLIENTS: {
    AUTO_GRID: ClientsAutoGridComposition,
    MARQUEE: ClientsMarqueeComposition,
    GRID: ClientsAutoGridComposition,
  },
  TESTIMONIALS: {
    FADE: TestimonialsFadeComposition,
    CAROUSEL: TestimonialsCarouselComposition,
    SINGLE: TestimonialsFadeComposition,
    MARQUEE: ClientsMarqueeComposition,
  },
  TEAM: {
    GRID: TeamGridComposition,
    STORY: TeamStoryComposition,
    SINGLE: TeamGridComposition,
    MARQUEE: ProjectsMarqueeComposition,
    PARALLAX: HeroParallaxComposition,
    ZOOM: HeroZoomComposition,
    FADE: HeroFadeComposition,
  },
  CUSTOM: {},
}

// ==================== MAIN COMPONENT ====================
export const SlideHeader: React.FC<SlideHeaderProps> = ({ slideShowType, compositionType, title, description }) => {
  const CompositionComponent =
    compositionMap[slideShowType]?.[compositionType] || compositionMap[slideShowType]?.SINGLE || HeroSingleComposition

  return <CompositionComponent title={title} description={description} />
}