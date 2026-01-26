import { CompositionType } from "@/types/schema";

interface CompositionLoaderProps {
  composition: CompositionType;
  locale?: "en" | "ar";
}

const Skeleton = ({ className = "", delay = 0  , style}: { style ?: React.CSSProperties; className?: string; delay?: number }) => (
  <div
    className={`bg-muted/50 animate-wave rounded-lg ${className}`}
    style={{ ...style , animationDelay: `${delay}ms` }}
  />
);
export function CompositionLoader({ composition, locale = "en" }: CompositionLoaderProps) {
  const loadingText = locale === "ar" ? "جاري التحميل..." : "Loading...";

  // Base skeleton component

  switch (composition) {
    case CompositionType.SINGLE:
      return (
        <div className="h-[70vh] w-full flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      );

    case CompositionType.GRID:
    case CompositionType.AUTO_GRID:
      return (
        <div className="h-[70vh] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full p-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} delay={index * 100} />
            ))}
          </div>
        </div>
      );

    case CompositionType.CAROUSEL:
    case CompositionType.COVERFLOW:
      return (
        <div className="h-[70vh] w-full flex items-center justify-center gap-4 overflow-hidden px-4">
          <Skeleton className="w-1/4 h-3/5 opacity-50 shrink-0" />
          <Skeleton className="w-2/5 h-4/5 shrink-0" delay={100} />
          <Skeleton className="w-1/4 h-3/5 opacity-50 shrink-0" delay={200} />
        </div>
      );

    case CompositionType.STACKED:
      return (
        <div className="h-[70vh] w-full flex items-center justify-center relative">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="absolute w-4/5 max-w-2xl h-3/5"
              delay={index * 150}
              style={{
                transform: `translateY(${index * 20}px) scale(${1 - index * 0.05})`,
                zIndex: 3 - index,
                opacity: 1 - index * 0.2,
              }}
            />
          ))}
        </div>
      );

    case CompositionType.FADE:
      return (
        <div className="h-[70vh] w-full flex items-center justify-center relative overflow-hidden">
          <Skeleton className="absolute inset-4" />
          <Skeleton className="absolute inset-8 opacity-70" delay={300} />
        </div>
      );

    case CompositionType.ZOOM:
    case CompositionType.KEN_BURNS:
      return (
        <div className="h-[70vh] w-full flex items-center justify-center overflow-hidden p-4">
          <Skeleton className="w-full h-full scale-105" />
        </div>
      );

    case CompositionType.PARALLAX:
      return (
        <div className="h-[70vh] w-full overflow-hidden relative">
          <Skeleton className="absolute inset-0 opacity-30" />
          <Skeleton className="absolute inset-0 opacity-50 translate-y-4" delay={150} />
          <Skeleton className="absolute inset-0 opacity-70 translate-y-8" delay={300} />
        </div>
      );

    case CompositionType.FLIP:
      return (
        <div className="h-[70vh] w-full flex items-center justify-center">
          <Skeleton className="w-3/4 max-w-2xl h-4/5" />
        </div>
      );

    case CompositionType.CUBE:
      return (
        <div className="h-[70vh] w-full flex items-center justify-center">
          <div className="relative w-64 h-64">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="absolute inset-0 opacity-50"
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      );

    case CompositionType.STORY:
      return (
        <div className="h-[70vh] w-full flex gap-3 overflow-hidden p-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-32 sm:w-40 h-full shrink-0"
              delay={index * 100}
            />
          ))}
        </div>
      );

    case CompositionType.FILMSTRIP  :
      return (
        <div className="h-[70vh] w-screen  flex items-center justify-center overflow-hidden p-4">
          <div className="flex gap-4 h-full w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-1/5 sm:w-1/5 h-4/5 shrink-0"
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      );

    case CompositionType.LIGHTBOX:
      return (
        <div className="h-[70vh] w-full flex items-center justify-center bg-background/95">
          <Skeleton className="w-3/4 max-w-4xl h-3/4" />
        </div>
      );

    case CompositionType.MARQUEE:
      return (
        <div className="h-[70vh] w-full flex items-center overflow-hidden">
          <div className="flex  h-1/2 w-full gap-4 animate-marquee">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-56 sm:w-64 h-4/5 shrink-0"
                delay={index * 50}
              />
            ))}
          </div>
        </div>
      );

    case CompositionType.CUSTOM:
    default:
      return (
        <div className="h-[70vh] w-full flex items-center justify-center p-4">
          <Skeleton className="w-full h-full" />
        </div>
      );
  }
}