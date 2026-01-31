"use client";

import { CompositionType } from "@/types/schema";
import { useState, useEffect, useCallback, useRef, memo, JSX } from "react";
import { slidesService } from "./services/slideShowService";
import { CompositionPreview } from "./CompositionPreviw";
import { CompositionLoader } from "./SlidesLoader";


interface RenderSlidesProps {
  locale: "en" | "ar"
  isInViewport: boolean;
  id: string;
  interval?: number;
  autoPlay: boolean;
  composition: CompositionType;
  HeaderSlideShow ?: JSX.Element | null
  
}
const RenderSlidesManual = memo(({
  HeaderSlideShow ,
  locale,
  isInViewport,
  id,
  interval = 5000,
  autoPlay,
  composition,
}: RenderSlidesProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [slides, setSlides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item : any) => ({
            ...item.data,
            type: item.type,
            order: item.order,
            id: item.id,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...item.translation.find((t : any) => t.lang.toUpperCase() === locale.toUpperCase()),
            customTitle: item.customTitle,
            customDescription: item.customDesc,
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
  }, [id , locale]);


  useEffect(() => {

    fetchSlides();
  }, [fetchSlides]);



  if (isLoading) {
    return (
      <CompositionLoader composition={composition} locale="en"/>
    );
  }

  if (error) {

    return (
      <div className="h-96 rounded-lg bg-destructive/10 flex items-center justify-center">
        <p className="text-destructive">{error.message}</p>
      </div>
    );
  }



  else return (
    <>

      {!isLoading && !error && (
        <CompositionPreview
        HeaderSlideShow={HeaderSlideShow}
          interval={interval}
          autoPlay={autoPlay}
          isInViewport={isInViewport}
          composition={composition}
          slides={slides}
        />
      )}


    </>
  );

})

RenderSlidesManual.displayName = "RenderSlidesManual"
export default RenderSlidesManual