import {  useRef } from "react";
import gsap from "gsap";
import { slide } from "@/types/schema";
// import { TypeToRender } from "../TypeToRender";
import { TypeToRenderProd } from "../TypToRenderProd";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

 const CubeComposition = ({slides} : { 
    slides: slide[]
 }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  
   const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  useGSAP(() => {
 const cards = cardsRef.current;
    if (!cards.length) return;    const spacer = 20;
    const minScale = 0.8;

    const distributor = gsap.utils.distribute({
      base: minScale,
      amount: 0.2,
    });

    cards.forEach((card, index) => {
      const scaleVal = distributor(index, card, cards);

      gsap.to(card, {
        scale: scaleVal,
        scrub: true,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top top",
          scrub: true,
          invalidateOnRefresh: true,
        },
        // markers: true,
      });



      ScrollTrigger.create({
        trigger: card,
        start: () => `top top+=${200 + index * spacer}`,
        endTrigger: cards[cards.length - 1],
        end: `bottom top+=${200 + cards.length * spacer}`,
        pin: true,
        markers: true,
        scrub: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
        onEnter : (()=>{
          console.log("enter")
          gsap.to(card, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
            markers: true,
          });
        })
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, {
    dependencies :[cardsRef , rootRef],
    scope :rootRef
  });

  return (
  <div
  ref={rootRef}
  className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 font-light"
>
  {/* Title */}

  {/* Cards container */}
  <div className="flex items-start justify-center pt-12 sm:pt-16 md:pt-24 lg:pt-32 xl:pt-40">
    <div className="cards relative flex items-start justify-start flex-col w-full max-w-7xl">
        
      {slides.map((n, i) => (
        <div
          key={i}
          ref={addCardRef}
          className="relative mb-8 sm:mb-10 md:mb-12 flex w-full max-w-full 
                     h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]
                     items-center justify-center shadow-lg rounded-xl sm:rounded-2xl overflow-hidden"
        >
          <TypeToRenderProd slide={n} cube={true} />
        </div>
      ))}
    </div>
  </div>

  {/* Spacer section */}
  <div className="mt-8 sm:mt-10 md:mt-12 h-[30vh] sm:h-[40vh] md:h-[50vh] w-full border-t border-border" />
</div>
  );
};






export default CubeComposition








































// "use client";

// import React, { useRef, useState, useEffect, memo } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { slide } from "@/types/schema";
// import { cn } from "@/lib/utils";
// import { TypeToRender } from "../TypeToRender";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// export interface Props {
//     slides: slide[];
// }

// const CubeComposition = memo(({ slides }: Props) => {
//     const wrapperRef = useRef<HTMLDivElement | null>(null); // pinned wrapper
//     const trackRef = useRef<HTMLDivElement | null>(null); // sliding track (flex row)
//     const progress = useRef<number>(0);
//     const [activeIndex, setActiveIndex] = useState<number>(0);
//     const tlRef = useRef<gsap.core.Timeline | null>(null);
//     useGSAP(() => {

//         const wrapper = wrapperRef.current;
//         const track = trackRef.current;
//         if (!wrapper || !track || slides.length === 0) return;

//         // Ensure layout is measured correctly
//         ScrollTrigger.refresh();

//         // total horizontal percent we will move track (0 ... -(N-1)*100%)
//         const totalPercent = (slides.length - 1) * 100;

//         // master timeline animates track.xPercent from 0 -> -totalPercent
//         const tl = gsap.timeline();
//         tl.to(track, {
//             xPercent: -totalPercent,  // Fixed: animate to -totalPercent (not using progress.current * 10)
//             ease: "none",
//         });
//         tlRef.current = tl;

//         // ScrollTrigger ties the timeline to window scroll, pins wrapper for the duration
//         const st = ScrollTrigger.create({
//             animation: tl,
//             trigger: wrapper,
//             start: "top top",
//             end: `+=${slides.length * window.innerHeight}`, // pin duration = number of slides * viewport height
//             scrub: 0.6,
//             pin: true,
//             anticipatePin: 1,
//             snap: {
//                 // snap to each slide step
//                 snapTo: 1 / Math.max(1, slides.length - 1),
//                 duration: 0.35,
//                 ease: "power2.out",
//             },
//             onUpdate: (self) => {
//                 // Update activeIndex based on timeline progress (you can comment this out to decouple bullets)
//                 progress.current = +self.progress.toFixed(3);
//                 const idx = Math.round(self.progress * (slides.length - 1));
//                 setActiveIndex(idx);
//             },
//             // markers: true, // enable during debugging
//         });

//         // Cleanup
//         return () => {
//             st.kill();
//             tl.kill();
//             tlRef.current = null;
//         };
//     }, [slides.length]);

//     const goToIndex = (index: number) => {
//         const tl = tlRef.current;
//         if (!tl) return;
//         const progress = index / Math.max(1, slides.length - 1);
//         gsap.to(tl, { progress, duration: 0.6, ease: "power2.out" });
//         setActiveIndex(index);
      
//     };

//     return (
//         <div className="w-screen relative bg-black">
//             {/* Pinned wrapper */}
//             <div ref={wrapperRef} className="w-screen h-screen relative overflow-hidden">
//                 {/* Left bullets / indicators */}
//                 <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-auto">
//                     {slides.map((_, idx) => (
//                         <button
//                             key={idx}
//                             aria-label={`Go to slide ${idx + 1}`}
//                             onClick={() => goToIndex(idx)}
//                             className={cn(
//                                 "w-3 h-3 rounded-full transition-transform duration-200",
//                                 activeIndex === idx ? "bg-white scale-125" : "bg-white/30"
//                             )}
//                         />
//                     ))}
//                 </div>

//                 {/* Centered viewport for slides */}
//                 <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
//                     {/* Track: a flex row with each child = 100vw */}
//                     <div
//                         ref={trackRef}
//                         className="flex items-center h-full will-change-transform"
//                         style={{
//                             // track width equals N * 100vw so xPercent moves in percent-space
//                             width: `${100}vw`,
//                         }}
//                     >
//                         {slides.map((slideItem, idx) => (
//                             <div
//                                 key={slideItem.id}
//                                 // each slide is one viewport wide and centers its content
//                                 className="flex-shrink-0 w-full h-full flex items-center justify-center pointer-events-none"
//                                 style={{
//                                     // optional: control preview spacing between slides (use marginRight)
//                                     marginRight: "0px", // default no gap
//                                 }}
//                             >
//                                 <div
//                                     // content wrapper (centered preview); allow pointer events for content (links/buttons inside slide)
//                                     className="pointer-events-auto flex items-center justify-center"
//                                     style={{
//                                         width: 480,
//                                         height: 520,
//                                     }}
//                                 >
//                                     <TypeToRender slide={slideItem} cube />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Spacer after pinned wrapper to provide scroll space */}
//             {/* <div style={{ height: `${slides.le/ngth * 100}vh` }} /> */}
//         </div>
//     );
// });

// CubeComposition.displayName = "CubeComposition";
// export default CubeComposition;