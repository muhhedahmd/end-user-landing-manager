// TimelineProvider.tsx
"use client";

import { createContext, ReactNode, FC, useContext, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

interface TimelineContextType {
  timeline: GSAPTimeline | null;
  ctx: gsap.Context | null;
  isReady: boolean;  
  visible : boolean
setVisible : React.Dispatch<React.SetStateAction<boolean>>


}

export const TimelineContext = createContext<TimelineContextType>({
  timeline: null,
  ctx: null,
  isReady: false,
  visible : false,
  setVisible : () => {}
});

interface TimelineProviderProps {
  children: ReactNode;
}

export const TimelineProvider: FC<TimelineProviderProps> = ({ children }) => {
  const [timeline, setTimeline] = useState<GSAPTimeline | null>(null);
  const [ctx, setCtx] = useState<gsap.Context | null>(null);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [visible , setVisible]  = useState(false);

  useEffect(() => {
    // Clean up previous timeline/context
    if (cleanupRef.current) {

      cleanupRef.current();
      cleanupRef.current = null;
    }

    setIsReady(false);

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {

      const context = gsap.context(() => {
        const tl = gsap.timeline({
          paused: false,
          defaults: {
            ease: "power2.out",
          },
        });
        setTimeline(tl);
        setIsReady(true);
      });

      setCtx(context);

      // Store cleanup function
      cleanupRef.current = () => {
        context.revert();
        timeline?.revert();
        
        
     
      };
    }, 50);

    prevPathname.current = pathname;

    return () => {
      clearTimeout(timeoutId);
      if (cleanupRef.current) {
        cleanupRef.current();
        // if(timeline) {
        //   timeline.revert();
        // }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only depend on pathname

  return (
    <TimelineContext.Provider value={{ timeline, ctx, isReady, visible ,setVisible }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeLine = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeLine must be used within TimelineProvider");
  }
  return context;
};