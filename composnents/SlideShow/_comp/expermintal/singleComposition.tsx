import  { useLayoutEffect, useRef,  useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slide } from "@/types/schema";
import { TypeToRender } from "../TypeToRender";
import { useGSAP } from "@gsap/react";
import { useScrollTriggerReady } from "@/hooks/useScrollTriggerReady";

gsap.registerPlugin(ScrollTrigger);
// const slides = mockSlides

const SingleComposition = ({ slides} : {slides : slide[]}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isReady = useScrollTriggerReady(wrapperRef, [slides.length , slides  , trackRef]);

  console.log({isReady})
  useLayoutEffect(() => {

    if(!isReady) return
    console.log({isReady2 : isReady})
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || slides.length === 0) return;

    const scrollWidth = track.scrollWidth - wrapper.offsetWidth;
console.log(scrollWidth)

    const st = gsap.to(track, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        snap: 1 / (slides.length - 1),
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (slides.length - 1));
          setActiveIndex(idx);
        },
        markers: true,
    },
    markers: true,
    });

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, [slides.length , isReady]);

  const goToIndex = (index: number) => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const scrollWidth = track.scrollWidth - wrapper.offsetWidth;
    const progress = index / Math.max(1, slides.length - 1);

    gsap.to(track, {
      x: -scrollWidth * progress,
      duration: 0.6,
      ease: "power2.out",
    });

    setActiveIndex(index);
  };

  return (
    <div ref={wrapperRef} className=" relative w-screen relative min-h-screen overflow-x-hidden">
      {/* Navigation bullets */}
      <div className="fixed left-1/2 top-10 flex gap-3 -translate-x-1/2 z-50">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            className={`w-3 h-3 rounded-full transition-transform duration-300 ${
              activeIndex === idx ? "bg-black scale-125" : "bg-black/30 hover:bg-black/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Slides container */}
      <div ref={trackRef} className="flex h-full will-change-transform">
        {slides.map((slideItem) => (
          <div
            key={slideItem.id}
            className="shrink-0 h-full w-[28vw] flex items-center justify-center"
          >
            <div className="pointer-events-auto flex items-center justify-center" style={{ width: 480, height: 520 }}>
               {/* // slide content */}
                {/* <div className="w-180 bg-emerald-500  h-120">

                <h2 className="text-2xl font-bold">{slideItem.title}</h2>
                <p className="mt-2">{slideItem.description}</p>
                </div> */}
               {/* // end slide content */}

              
              <TypeToRender slide={slideItem} cube />
            </div>
          </div>
        ))}
      </div>

      {/* Optional filler to allow scrolling */}
    </div>
  );
};

export default SingleComposition;
