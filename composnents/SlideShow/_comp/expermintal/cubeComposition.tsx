import { useRef } from "react";
import gsap from "gsap";
import { slide } from "@/types/schema";
import { TypeToRenderProd } from "../TypToRenderProd";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CubeComposition = ({ slides }: { slides: slide[] }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      const cards = cardsRef.current;
      if (!cards.length) return;

      const spacer = 20;
      const minScale = 0.8;

      const distributor = gsap.utils.distribute({
        base: minScale,
        amount: 0.2,
      });

      // Refresh ScrollTrigger after content loads
      ScrollTrigger.refresh();

      cards.forEach((card, index) => {
        const scaleVal = distributor(index, card, cards);

        // Pin the card
        ScrollTrigger.create({
          trigger: card,
          start: () => `top top+=${200 + index * spacer}`,
          endTrigger: cards[cards.length - 1],
          end: () => `bottom top+=${200 + cards.length * spacer}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            // Recalculate positions when refreshed
            self.vars.start = `top top+=${200 + index * spacer}`;
            self.vars.end = `bottom top+=${200 + cards.length * spacer}`;
          },
        });

        // Scale animation
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: () => `top top+=${200 + index * spacer}`,
            end: () => `bottom top+=${200 + cards.length * spacer}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(card, {
          // scale: scaleVal,
          ease: "none",
        })
        .to(card, {
          scale: 1,
          ease: "none",
        });
      });

      // Refresh after a delay to ensure content is loaded
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      // Add resize observer to refresh on content changes
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      cards.forEach((card) => {
        resizeObserver.observe(card);
      });

      return () => {
        clearTimeout(refreshTimeout);
        resizeObserver.disconnect();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    {
      dependencies: [slides],
      scope: rootRef,
      revertOnUpdate: true,
    }
  );

  return (
    <div
      ref={rootRef}
      className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 font-light"
    >
      {/* Cards container */}
      <div className="flex items-start justify-center pt-12 sm:pt-16 md:pt-24 lg:pt-32 xl:pt-40">
        <div className="cards relative flex items-start justify-start flex-col w-full max-w-7xl">
          {slides.map((n, i) => (
            <div
              key={i}
              ref={addCardRef}
              className="relative mb-8 sm:mb-10 md:mb-12 flex w-full max-w-full 
                         items-start justify-start rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <TypeToRenderProd slide={n} cube={true} />
            </div>
          ))}
        </div>
      </div>

      {/* Spacer section */}
      <div className="mt-8 sm:mt-10 md:mt-12 h-[60vh] sm:h-[40vh] md:h-[50vh] w-full border-t border-border" />
    </div>
  );
};

export default CubeComposition;