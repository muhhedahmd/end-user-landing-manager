
"use client"
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useTimeLine } from "@/context/MainLoaderTimeLine";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { lenisRef } from "../scroll/smoothScrolling";
import gsap from "gsap";
const MainLoader = ({ duration = 3000 }: { duration?: number }) => {
  const { timeline, ctx  ,visible, setVisible ,}  = useTimeLine();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [_, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    setProgress(0);
    setVisible(true); // Reset to visible on mount
  }, []);


  useEffect(()=>{

    if(timeline?.labels?.loaderComplete){
          setVisible(true); // Reset to visible on mount

    }

  } , [setVisible, timeline?.labels?.loaderComplete])

  
  

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


  useGSAP(
    () => {
      if (!loaderRef.current || !progressRef.current || !timeline || !ctx) {
        return;
      }
      gsap.set(progressRef.current, {
        width: "0%",
      })

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
      </div>

    </div>
  );
};

export default MainLoader;