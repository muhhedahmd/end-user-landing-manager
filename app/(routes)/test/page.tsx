"use client"

// import CubeComposition from "@/composnents/SlideShow/_comp/expermintal/cubeComposition"






const page = () => {
  return (
    <div><TimelineWithRef /></div>
  )
}

export default page


// export default CubeComposition;


import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TimelineWithRef: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !boxRef.current) return;

    const ctx = gsap.context(() => {
      // إنشاء الـ timeline مرة واحدة فقط
      tlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate : ((progress)=>{
            console.log(progress.progress)
          })
        },
        
      });

      tlRef.current
        .from(boxRef.current, {
          y: 120,
          opacity: 0,
          scale: 0.8,
        })
        .to(boxRef.current, {
          rotate: 360,
          scale: 1,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <section
        ref={sectionRef}
        className="flex  items-center justify-center"
      >
      <div className="h-[200vh]" />
        <div
          ref={boxRef}
          className="flex h-40 w-40 items-center justify-center rounded-xl bg-blue-500 text-xl"
        >
          Box
        </div>
      <div className="h-[200vh]" />
      </section>

    </div>
  );
};

// export default TimelineWithRef;































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