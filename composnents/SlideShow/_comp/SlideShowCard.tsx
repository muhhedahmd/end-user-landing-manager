import { CompositionType, SlideshowType } from "@/types/schema";
import { SlideShow } from "@/types/slideShows";
import { SlideHeader } from "./slideShowHeader";
import { SlideshowCardClient } from "./SlideShowCardClient";
import { cn } from "@/lib/utils";

export interface SlideShowWithTranslations extends SlideShow {
  translations: {
    lang: string;
    title: string;
    description: string;
  }[];
}
interface SlideshowCardProps {
  locale: "en" | "ar"
  item: SlideShow & {
    translations: {
      lang: string;
      title: string;
      description: string;
    }[]
  };
  index: number;
  bgColor?: string;
  textColor?: string;
  autoPlay: boolean;
  interval: number;
  prefetchedSlides?: any[];
}

export function SlideshowCard({
  locale,
  interval,
  autoPlay,
  item,
  index,
  prefetchedSlides,

}: SlideshowCardProps) {
  const compositionType = CompositionType[item.composition as keyof typeof CompositionType];
  const slideShowType = SlideshowType[item.type as keyof typeof SlideshowType];

  const isCube = compositionType === "CUBE"
  const isSingle = compositionType === "SINGLE"
  const isFilmStrip = compositionType === "FILMSTRIP"
  const COVERFLOW = compositionType === ("COVERFLOW" as keyof typeof CompositionType)
  const MARQUEE = compositionType === ("MARQUEE" as keyof typeof CompositionType)



  const currentTranslation = item?.translations?.find((t) => t?.lang?.toUpperCase() === locale?.toUpperCase()) || item?.translations?.[0] || {
    title: item.title,
    description: item.description

  }

  if (isCube) return;
  return (
    <div

      className={cn("rounded-lg relative duration-200 overflow-hidden w-full ", !MARQUEE && !isCube && !isSingle && !isFilmStrip && !COVERFLOW && "container mx-auto")}
    >
      {/* Server-rendered header */}




      <SlideHeader
        compositionType={compositionType === "FILMSTRIP" ? (CompositionType.PARALLAX as CompositionType) : compositionType}
        title={currentTranslation?.title}
        description={currentTranslation?.description || ""}
        slideShowType={slideShowType}
      />





      <div className="mt-10" />

      {/* Client component for interactive parts */}
      <SlideshowCardClient

        prefetchedSlides={prefetchedSlides}
        locale={locale}
        id={item.id}
        composition={compositionType}
        autoPlay={autoPlay}
        interval={interval}
        index={index}
      />
    </div>
  );
}