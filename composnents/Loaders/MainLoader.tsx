"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useTimeLine } from "@/context/MainLoaderTimeLine";
import { usePathname } from "next/navigation";

const MainLoader = ({ duration = 3000 }: { duration?: number }) => {
  const { timeline, ctx } = useTimeLine();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname()

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  // GSAP Timeline animation - runs ONCE
  useGSAP(
    () => {
      // Run only once and when timeline/ctx are ready
      if (!loaderRef.current || !progressRef.current || !timeline || !ctx   ) {
        return;
      }
      // Add to main timeline
      ctx.add(() => {
        timeline
          .to(progressRef.current, {
            width: "100%",
            ease: "power1.inOut",
            duration: duration / 1000,
          } , "+= 3.5")
          .to(loaderRef.current, {
            autoAlpha: 0,
            height: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              setVisible(false);
            },
          })
          .addLabel("loaderComplete"); // Label after loader exits
      })
      
    },
    {
      dependencies: [timeline, ctx, duration , pathname], // Remove 'progress' from deps
      scope: loaderRef,
    }
  );



if(pathname === "/services" ) return
  return (
    <div

    key={pathname}
      ref={loaderRef}
      className="inset-0 z-50 h-20 w-screen bg-background flex flex-col items-center justify-center"
    >
      <div className=" h-20 bg-muted  w-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full w-0  bg-primary transition-all   duration-200 ease-linear"
        />

      </div>

    </div>
  );
};

export default MainLoader;