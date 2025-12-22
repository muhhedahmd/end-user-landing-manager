import { CompositionType, SlideshowType } from "@/types/schema";
import { SlideShow } from "@/types/slideShows";
import { SlideHeader } from "./slideShowHeader";
import { SlideshowCardClient } from "./SlideShowCardClient";
import { cn } from "@/lib/utils";

interface SlideshowCardProps {
  item: SlideShow;
  index: number;
  bgColor?: string;
  textColor?: string;
  autoPlay: boolean;
  interval: number;
}

export function SlideshowCard({
  interval,
  autoPlay,
  item,
  index,
  bgColor,
  textColor,
}: SlideshowCardProps) {
  const compositionType = CompositionType[item.composition as keyof typeof CompositionType];
  const slideShowType = SlideshowType[item.type as keyof typeof SlideshowType];

  // const isContainer  = compositionType && (compositionType !== "SINGLE" || compositionType !== "CUBE")
  const isCube  =  compositionType === "CUBE"
  const isSingle  = compositionType === "SINGLE"
  
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      className={cn( "rounded-lg duration-200 overflow-hidden w-full " ,!isCube && !isSingle &&  "container mx-auto")}
    >
      {/* Server-rendered header */}
      <SlideHeader
        compositionType={compositionType}
        title={item.title}
        description={item.description || ""}
        slideShowType={slideShowType}
      />
    


      <div className="mt-5" />

      {/* Client component for interactive parts */}
      <SlideshowCardClient
        id={item.id}
        composition={compositionType}
        autoPlay={autoPlay}
        interval={interval}
        index={index}
      />
    </div>
  );
}