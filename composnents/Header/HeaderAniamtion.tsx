
"use client"
import { useTimeLine } from '@/context/MainLoaderTimeLine'
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { useBreakPoints } from '@/hooks/useBreakPoint'
import { useSectionVisibility } from '../contact/SectionVisibilityContext'
import { cn } from '@/lib/utils'
const HeaderAniamtion = ({ children  ,border  ,title}: {
  title?: string ,
  children: React.ReactNode ,
  border?: boolean
}) => {
  const headerRef = useRef<HTMLHeadElement | null>(null)
  const pathname = usePathname()
  const { timeline, ctx } = useTimeLine()
  const { BreakPoint } = useBreakPoints()
  const isSm = BreakPoint === "sm"
  const { singleCompositionVisible } = useSectionVisibility();

  useGSAP(

    () => {
      if (!headerRef.current || !timeline || !ctx) return;
      if (pathname === "/services") return
      ctx.add(() => {


        // Set initial state
        gsap.set(headerRef.current, {
          y: -270,
          autoAlpha: 1,


          display: "block"
        });

        // Add to timeline after loader
        timeline.to(
          headerRef.current,
          {
            position: "sticky",
            top: 0,
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
            padding: isSm ? "1rem  0 " : "0px 0px 0px 0px",
          },
          "loaderComplete+=.2"
        ).addLabel('headerComplete');
      });
    },
    {
      dependencies: [timeline, ctx],
      scope: headerRef,
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {


    if (pathname === "/services") {
      gsap.to(
        headerRef.current,
        {
          display: "block",

          position: "sticky",
          top: 0,
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
        },
      )
    }


  }, {
    dependencies: [timeline, ctx, isSm, pathname],
    scope: headerRef,
  })
  console.log("Labels:", timeline?.labels);

  useGSAP(() => {
    if (!headerRef.current || timeline?.labels?.headerComplete === undefined) return;
    if (singleCompositionVisible) {
      gsap.to(headerRef.current, {
        y: -270,
      });
    }
    else {
      gsap.to(headerRef.current, {
        y: 0,
      });

    }
  }, {
    dependencies: [singleCompositionVisible ],
    scope: headerRef,
  })

  return (
    <header ref={headerRef} className={cn(" h-fit md:h-[10vh] lg:h-[12vh]  z-50 w-full -translate-y-20  hidden  backdrop-blur" , title?.toLowerCase() ==="team" && "h-fit md:h-[10vh] lg:h-[12vh] " ,  border ? "border-b border-border bg-background/80" : "bg-transparent" )} >
      {children}
    </header>
  )
}

export default HeaderAniamtion