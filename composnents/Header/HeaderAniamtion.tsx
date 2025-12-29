
"use client"
import { useTimeLine } from '@/context/MainLoaderTimeLine'
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { useBreakPoints } from '@/hooks/useBreakPoint'
const HeaderAniamtion = ({ children }: {
  children: React.ReactNode
}) => {
  const headerRef = useRef<HTMLHeadElement | null>(null)
  const pathname = usePathname()
  const { timeline, ctx } = useTimeLine()
  const { BreakPoint } = useBreakPoints()
  const isSm = BreakPoint === "sm"
  useGSAP(

    () => {
      if (!headerRef.current || !timeline || !ctx) return;
      if(pathname === "/services") return 
      ctx.add(() => {
     
        // Set initial state
        gsap.set(headerRef.current, {
          y: -230,
          autoAlpha: 1,


          display :"block"
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
      dependencies: [timeline, ctx, pathname , isSm],
      scope: headerRef,
    }
  );

  useGSAP(()=>{
       if (pathname === "/services") {
          gsap.to(
            headerRef.current,
            {
         display :"block",

              position: "sticky",
              top: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power2.out",
            },
          )
        }


  } , {
    dependencies : [pathname],
    revertOnUpdate :true 
  })

  return (
    <header ref={headerRef} className=" h-fit md:h-[10vh] lg:h-[17vh]  z-50 w-full -translate-y-20  hidden  backdrop-blur">
      {children}
    </header>
  )
}

export default HeaderAniamtion