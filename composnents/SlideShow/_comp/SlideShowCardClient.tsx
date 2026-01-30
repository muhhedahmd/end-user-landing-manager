
import { CompositionType } from "@/types/schema";

import RenderSlides from "./RenderSlide";





interface SlideshowCardClientProps {
  id: string;
  locale: "en" | "ar";
  composition: keyof typeof CompositionType;
  autoPlay: boolean;
  interval: number;
  index: number;
}

export const SlideshowCardClient = ({
  locale,
  id,
  composition,
  autoPlay,
  interval,
}: SlideshowCardClientProps) => {
  return (
        <RenderSlides
          locale={locale}
          autoPlay={autoPlay}
          interval={interval}
          id={id}
          composition={composition as CompositionType}
        />
  );
};

