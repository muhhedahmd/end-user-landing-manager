
const page = () => {
  return (
    <div>page</div>
  )
}

export default page





















// "use client"

// // import CubeComposition from "@/composnents/SlideShow/_comp/expermintal/cubeComposition"
// import React, { useLayoutEffect, useRef, useState  } from "react";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { mockSlides } from "@/lib/utils";
// import { useScrollTriggerReady } from "@/hooks/useScrollTriggerReady";
// import { CompositionPreview } from "@/composnents/SlideShow/_comp/CompositionPreviw";


// // import { TypeToRender } from "../TypeToRender";
// gsap.registerPlugin(ScrollTrigger);

//  const CubeComposition = () => {

//   const rootRef = useRef<HTMLDivElement | null>(null);
//   const cardsRef = useRef<HTMLDivElement[]>([]);
//   const slides = mockSlides

//     const isReady = useScrollTriggerReady(rootRef, [slides.length , slides  , cardsRef]);
  
//    const addCardRef = (el: HTMLDivElement | null) => {
//     if (el && !cardsRef.current.includes(el)) {
//       cardsRef.current.push(el);
//     }
//   };
//   useLayoutEffect(() => {
//  const cards = cardsRef.current;
//  if(!isReady) return
//     if (!cards.length) return;    const spacer = 20;
//     const minScale = 0.8;

//     const distributor = gsap.utils.distribute({
//       base: minScale,
//       amount: 0.2,
//     });

//     cards.forEach((card, index) => {
//       const scaleVal = distributor(index, card, cards);

//       gsap.to(card, {
//         scale: scaleVal,
//         ease: "none",
//         scrollTrigger: {
//           trigger: card,
//           start: "top top",
//           scrub: true,
//           invalidateOnRefresh: true,
//         },
//         // markers: true,
//       });



//       ScrollTrigger.create({
//         trigger: card,
//         start: () => `top top+=${200 + index * spacer}`,
//         endTrigger: cards[cards.length - 1],
//         end: `bottom top+=${200 + cards.length * spacer}`,
//         pin: true,
//         pinSpacing: false,
//         invalidateOnRefresh: true,
//         onEnter : (()=>{
//           console.log("enter")
//           gsap.to(card, {
//             scale: 1,
//             ease: "none",
//             scrollTrigger: {
//               trigger: card,
//               start: "top top",
//               scrub: true,
//               invalidateOnRefresh: true,
//             },
//             // markers: true,
//           });
//         })
//         // markers: true,
//       });
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((st) => st.kill());
//     };
//   }, [ cardsRef , rootRef , isReady ]);

//   return (
//     <div

//       ref={rootRef}
//       className="min-h-screen  px-10 py-10 font-light"
//     >
//       {/* Title */}

//       {/* Cards container */}
//       <div className="flex items-center justify-center pt-[10rem]">
//         <div className="cards relative flex items-center justify-center flex-col">
            
//          {slides.map((n , i ) => (
//             <div
//               key={i}
//               ref={addCardRef}
//               className={`relative mb-12 flex h-120 w-230 bg-amber-${i * 300  } border-black border-border items-center justify-center  shadow-lg rounded-2xl `}
//             >

//             </div>
//           ))}
//           {/* <CompositionPreview
//           autoPlay={false}
//           interval={0}
//           composition={"CUBE"}
//           isInViewport={false}
//           slides={slides}
//           />
//           <CompositionPreview
//           autoPlay={false}
//           interval={0}
//           composition={"SINGLE"}
//           isInViewport={false}
//           slides={slides}
//           /> */}
//         </div>
//       </div>

//       {/* Spacer section */}
//       <div className="mt-10 h-[150vh] w-full border-t " />
//     </div>
//   );
// };


// const Page = () => {


//   return (
//     <div>
//     <div className="w-screen h-screen bg-purple-600"/>
//       <SingleComposition/>
//     <div className="w-screen h-screen bg-amber-400"/>
//     <CubeComposition/>
//     </div>
//   )
// }

// export default Page


// gsap.registerPlugin(ScrollTrigger);
// const slides = mockSlides

// const SingleComposition = () => {
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const trackRef = useRef<HTMLDivElement | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useGSAP(() => {
//     const wrapper = wrapperRef.current;
//     const track = trackRef.current;
//     if (!wrapper || !track || slides.length === 0) return;

//     const scrollWidth = track.scrollWidth - wrapper.offsetWidth;
// console.log(scrollWidth)

//     const st = gsap.to(track, {
//       x: -scrollWidth,
//       ease: "none",
//       scrollTrigger: {
//         trigger: wrapper,
//         start: "top top",
//         end: () => `+=${scrollWidth}`,
//         scrub: 1,
//         pin: true,
//         snap: 1 / (slides.length - 1),
//         onUpdate: (self) => {
//           const idx = Math.round(self.progress * (slides.length - 1));
//           setActiveIndex(idx);
//         },
//         markers: true,
//     },
//     markers: true,
//     });

//     return () => {
//       st.scrollTrigger?.kill();
//       st.kill();
//     };
//   }, {
//     dependencies: [slides.length],
//     scope: wrapperRef,
//     revertOnUpdate: true
//   });

//   const goToIndex = (index: number) => {
//     const wrapper = wrapperRef.current;
//     const track = trackRef.current;
//     if (!wrapper || !track) return;

//     const scrollWidth = track.scrollWidth - wrapper.offsetWidth;
//     const progress = index / Math.max(1, slides.length - 1);

//     gsap.to(track, {
//       x: -scrollWidth * progress,
//       duration: 0.6,
//       ease: "power2.out",
//     });

//     setActiveIndex(index);
//   };

//   return (
//     <div ref={wrapperRef} className="  w-screen relative min-h-screen overflow-x-hidden">
//       {/* Navigation bullets */}
//       <div className="absolute left-1/2 top-10 flex gap-3 -translate-x-1/2 z-50">
//         {slides.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => goToIndex(idx)}
//             className={`w-3 h-3 rounded-full transition-transform duration-300 ${
//               activeIndex === idx ? "bg-black scale-125" : "bg-black/30 hover:bg-black/50"
//             }`}
//             aria-label={`Go to slide ${idx + 1}`}
//           />
//         ))}
//       </div>

//       {/* Slides container */}
//       <div ref={trackRef} className="flex h-full will-change-transform">
//         {slides.map((slideItem ,idx) => (
//           <div
//             key={idx}
//             className="shrink-0 h-full w-[28vw] flex items-center justify-center"
//           >
//             <div className="pointer-events-auto flex items-center justify-center" style={{ width: 480, height: 520 }}>
//                 {/* // slide content */}
//                 <div className="w-180 bg-emerald-500  h-120">

//                 <h2 className="text-2xl font-bold">{slideItem.title}</h2>
//                 <p className="mt-2">{slideItem.description}</p>
//                 </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Optional filler to allow scrolling */}
//     </div>
//   );

// };






// // export default CubeComposition;



// gsap.registerPlugin(ScrollTrigger);

// const TimelineWithRef: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const boxRef = useRef<HTMLDivElement | null>(null);

//   const tlRef = useRef<gsap.core.Timeline | null>(null);

//   useLayoutEffect(() => {
//     if (!sectionRef.current || !boxRef.current) return;

//     const ctx = gsap.context(() => {
//       // إنشاء الـ timeline مرة واحدة فقط
//       tlRef.current = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: true,
//           pin: true,
//           invalidateOnRefresh: true,
//           onUpdate : ((progress)=>{
//             console.log(progress.progress)
//           })
//         },
        
//       });

//       tlRef.current
//         .from(boxRef.current, {
//           y: 120,
//           opacity: 0,
//           scale: 0.8,
//         })
//         .to(boxRef.current, {
//           rotate: 360,
//           scale: 1,
//         });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">

//       <section
//         ref={sectionRef}
//         className="flex  items-center justify-center"
//       >
//       <div className="h-[200vh]" />
//         <div
//           ref={boxRef}
//           className="flex h-40 w-40 items-center justify-center rounded-xl bg-blue-500 text-xl"
//         >
//           Box
//         </div>
//       <div className="h-[200vh]" />
//       </section>

//     </div>
//   );
// };

// // export default TimelineWithRef;































// // "use client";

// // import React, { useRef, useState, useEffect, memo } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import { slide } from "@/types/schema";
// // import { cn } from "@/lib/utils";
// // import { TypeToRender } from "../TypeToRender";
// // import { useGSAP } from "@gsap/react";

// // gsap.registerPlugin(ScrollTrigger);

// // export interface Props {
// //     slides: slide[];
// // }

// // const CubeComposition = memo(({ slides }: Props) => {
// //     const wrapperRef = useRef<HTMLDivElement | null>(null); // pinned wrapper
// //     const trackRef = useRef<HTMLDivElement | null>(null); // sliding track (flex row)
// //     const progress = useRef<number>(0);
// //     const [activeIndex, setActiveIndex] = useState<number>(0);
// //     const tlRef = useRef<gsap.core.Timeline | null>(null);
// //     useGSAP(() => {

// //         const wrapper = wrapperRef.current;
// //         const track = trackRef.current;
// //         if (!wrapper || !track || slides.length === 0) return;

// //         // Ensure layout is measured correctly
// //         ScrollTrigger.refresh();

// //         // total horizontal percent we will move track (0 ... -(N-1)*100%)
// //         const totalPercent = (slides.length - 1) * 100;

// //         // master timeline animates track.xPercent from 0 -> -totalPercent
// //         const tl = gsap.timeline();
// //         tl.to(track, {
// //             xPercent: -totalPercent,  // Fixed: animate to -totalPercent (not using progress.current * 10)
// //             ease: "none",
// //         });
// //         tlRef.current = tl;

// //         // ScrollTrigger ties the timeline to window scroll, pins wrapper for the duration
// //         const st = ScrollTrigger.create({
// //             animation: tl,
// //             trigger: wrapper,
// //             start: "top top",
// //             end: `+=${slides.length * window.innerHeight}`, // pin duration = number of slides * viewport height
// //             scrub: 0.6,
// //             pin: true,
// //             anticipatePin: 1,
// //             snap: {
// //                 // snap to each slide step
// //                 snapTo: 1 / Math.max(1, slides.length - 1),
// //                 duration: 0.35,
// //                 ease: "power2.out",
// //             },
// //             onUpdate: (self) => {
// //                 // Update activeIndex based on timeline progress (you can comment this out to decouple bullets)
// //                 progress.current = +self.progress.toFixed(3);
// //                 const idx = Math.round(self.progress * (slides.length - 1));
// //                 setActiveIndex(idx);
// //             },
// //             // markers: true, // enable during debugging
// //         });

// //         // Cleanup
// //         return () => {
// //             st.kill();
// //             tl.kill();
// //             tlRef.current = null;
// //         };
// //     }, [slides.length]);

// //     const goToIndex = (index: number) => {
// //         const tl = tlRef.current;
// //         if (!tl) return;
// //         const progress = index / Math.max(1, slides.length - 1);
// //         gsap.to(tl, { progress, duration: 0.6, ease: "power2.out" });
// //         setActiveIndex(index);
      
// //     };

// //     return (
// //         <div className="w-screen relative bg-black">
// //             {/* Pinned wrapper */}
// //             <div ref={wrapperRef} className="w-screen h-screen relative overflow-hidden">
// //                 {/* Left bullets / indicators */}
// //                 <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-auto">
// //                     {slides.map((_, idx) => (
// //                         <button
// //                             key={idx}
// //                             aria-label={`Go to slide ${idx + 1}`}
// //                             onClick={() => goToIndex(idx)}
// //                             className={cn(
// //                                 "w-3 h-3 rounded-full transition-transform duration-200",
// //                                 activeIndex === idx ? "bg-white scale-125" : "bg-white/30"
// //                             )}
// //                         />
// //                     ))}
// //                 </div>

// //                 {/* Centered viewport for slides */}
// //                 <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
// //                     {/* Track: a flex row with each child = 100vw */}
// //                     <div
// //                         ref={trackRef}
// //                         className="flex items-center h-full will-change-transform"
// //                         style={{
// //                             // track width equals N * 100vw so xPercent moves in percent-space
// //                             width: `${100}vw`,
// //                         }}
// //                     >
// //                         {slides.map((slideItem, idx) => (
// //                             <div
// //                                 key={slideItem.id}
// //                                 // each slide is one viewport wide and centers its content
// //                                 className="flex-shrink-0 w-full h-full flex items-center justify-center pointer-events-none"
// //                                 style={{
// //                                     // optional: control preview spacing between slides (use marginRight)
// //                                     marginRight: "0px", // default no gap
// //                                 }}
// //                             >
// //                                 <div
// //                                     // content wrapper (centered preview); allow pointer events for content (links/buttons inside slide)
// //                                     className="pointer-events-auto flex items-center justify-center"
// //                                     style={{
// //                                         width: 480,
// //                                         height: 520,
// //                                     }}
// //                                 >
// //                                     <TypeToRender slide={slideItem} cube />
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Spacer after pinned wrapper to provide scroll space */}
// //             {/* <div style={{ height: `${slides.le/ngth * 100}vh` }} /> */}
// //         </div>
// //     );
// // });

// // CubeComposition.displayName = "CubeComposition";
// // export default CubeComposition;