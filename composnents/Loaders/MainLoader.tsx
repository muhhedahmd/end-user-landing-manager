
"use client"
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useTimeLine } from "@/context/MainLoaderTimeLine";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { lenisRef } from "../scroll/smoothScrolling";
const MainLoader = ({ duration = 5000 }: { duration?: number }) => {
  const { timeline, ctx } = useTimeLine();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false); // Start as true
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    setProgress(0);
    setVisible(true); // Reset to visible on mount
  }, []);





  useEffect(() => {

    if (visible === false) {
      lenisRef?.current?.lenis?.start()
    } else {
      lenisRef?.current?.lenis?.stop()
    }

    return () => {
      lenisRef?.current?.lenis?.start()
    }


  }, [visible]);

  // GSAP Timeline animation - runs ONCE
  useGSAP(
    () => {
      // Run only once and when timeline/ctx are ready
      if (!loaderRef.current || !progressRef.current || !timeline || !ctx) {
        return;
      }

      // Add to main timeline
      ctx.add(() => {
        timeline
          .to(progressRef.current, {
            width: "100%",
            ease: "power1.inOut",
            duration: duration / 1000,
            onUpdate: function () {
              const progressValue = this.progress() * 100;
              setProgress(progressValue);
            }
          }, "+= 3.5")
          .to(loaderRef.current, {
            autoAlpha: 0,
            height: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              setVisible(false); // This now properly unlocks scroll
            },
          })
          .addLabel("loaderComplete");
      });

      return () => {
        setProgress(0);
      };
    },
    {
      dependencies: [timeline, ctx, duration],
      scope: loaderRef,
    }
  );

  const isService = pathname === "/services";

  if (isService) return null;
  // if () return
  return (
    <div

      // key={pathname}
      ref={loaderRef}
      className={cn("inset-0  z-50 h-10 w-screen bg-background flex flex-col items-center justify-center", isService && "hidden")}
    >
      <div className=" h-10  gap-4  w-full flex items-center justify-center overflow-hidden">
        <div className="w-full h-10">

          <div
            ref={progressRef}

            className="h-full w-0  bg-primary transition-all   duration-200 ease-linear"
          />
        </div>
        <div className=" shrink-0 w-max mr-4 "> <span className="font-bold text-sx"> {progress.toFixed(0)} %</span> </div>
      </div>

    </div>
  );
};

export default MainLoader;