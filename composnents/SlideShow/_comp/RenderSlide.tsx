"use client";

import { CompositionType } from "@/types/schema";
import { useState, useEffect, useCallback, useRef } from "react";
import { slidesService } from "./services/slideShowService";
import { CompositionPreview } from "./CompositionPreviw";
import { AnimatePresence, motion } from "framer-motion";


interface RenderSlidesProps {
  isInViewport: boolean;
  id: string;
  interval?: number;
  autoPlay: boolean;
  composition: CompositionType;
}
export function RenderSlidesManual({
  isInViewport,
  id,
  interval = 5000,
  autoPlay,
  composition,
}: RenderSlidesProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [slides, setSlides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoading, setIsComp] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const hasTriggered = useRef(false);

  const fetchSlides = useCallback(async () => {

    if (hasTriggered.current) return;

    hasTriggered.current = true;
    setIsLoading(true);
    setError(null);
    try {

      const response = await slidesService.fetchSlides({
        id,
        page: 1,
        perPage: 50,
      });

      if (response.success && response.data.slides) {
        const transformed = response.data.slides
          .filter((item) => item.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((item) => ({
            ...item.data,
            type: item.type,
            order: item.order,
            id: item.id,
            customTitle: item.customTitle,
            customDescription: item.customDescription,
          }));

        setSlides(transformed);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {

      const error = err instanceof Error ? err : new Error("Failed to fetch slides");
      setError(error);
      console.error("[RenderSlides Error]", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // const [loadedComponents, setLoadedComponents] = useState({
  //   slideShows: false,
  // });

  // // Check if all components are loaded
  // useEffect(() => {
  //   const allLoaded = Object.values(loadedComponents).every((loaded) => loaded);

  //   if (allLoaded) {
  //     // Add a small delay for smooth transition
  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 5000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [loadedComponents]);



  // useEffect(() => {
  //   if (!isLoading && slides.length > 0) {
  //     setLoadedComponents({
  //       slideShows: true
  //     })
  //   }
  // }, [isLoading, slides])


  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);


  // if (isLoading) {
  //   return <AnimatePresence mode="wait">
  //     <motion.div
  //       // key={item.id}
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       exit={{ opacity: 0 }}
  //     >
  //       <FullScreenLoader />
  //     </motion.div>
  //   </AnimatePresence>
  // }

  if (error) {
    return (
      <div className="h-96 rounded-lg bg-destructive/10 flex items-center justify-center">
        <p className="text-destructive">{error.message}</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }
  else return (
    <>

      {!isLoading && !error && slides.length > 0 && (
        <CompositionPreview
          interval={interval}
          autoPlay={autoPlay}
          isInViewport={isInViewport}
          composition={composition}
          slides={slides}
        />
      )}

      {error && (
        <div className="h-96 rounded-lg bg-destructive/10 flex items-center justify-center">
          <p className="text-destructive">{error}</p>
        </div>
      )}
    </>
  );

}


// const FullScreenLoader = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 200);

//     return () => clearInterval(interval);
//   }, []);


//   return (
//     <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
//       <div className="mb-8 animate-pulse">
//         <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-2xl">
//           <span className="text-primary-foreground font-bold text-4xl">E</span>
//         </div>
//       </div>

//       <p className="text-muted-foreground mb-8">Please wait while we prepare your experience</p>

//       <div className="w-200 h-2 bg-muted rounded-full overflow-hidden">
//         <div
//           className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
//           style={{ width: `${progress}%` }}
//         />
//       </div>
//     </div>
//   );
// };

