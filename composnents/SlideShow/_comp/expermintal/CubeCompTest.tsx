import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { TypeToRender } from "../TypeToRender";
import { useScrollTriggerReady } from "@/hooks/useScrollTriggerReady";
import { TypeToRenderProd } from "../TypToRenderProd";
import { mockSlides } from "@/lib/utils";
gsap.registerPlugin(ScrollTrigger);

const slides = mockSlides 
 const CubeComposition = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

    const isReady = useScrollTriggerReady(rootRef, [slides.length , slides  , cardsRef]);
  
   const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  useLayoutEffect(() => {
 const cards = cardsRef.current;
 if(!isReady) return
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
        pinSpacing: false,
        invalidateOnRefresh: true,
        onEnter : (()=>{
          gsap.to(card, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
            // markers: true,
          });
        })
        // markers: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [ cardsRef , rootRef , isReady ]);

  return (
    <div
      ref={rootRef}
      className="min-h-screen  px-10 py-10 font-light"
    >
      {/* Title */}

      {/* Cards container */}
      <div className="flex items-center justify-center pt-[10rem]">
        <div className="cards relative flex items-center justify-center flex-col">
            
         {slides.map((n , i) => (
            <div
              key={i}
              ref={addCardRef}
              className="relative mb-12 flex h-120 w-230 bg-black/10 items-center justify-center  shadow-lg rounded-2xl "
            >
                
              {/* <TypeToRenderProd slide={n} cube={true} /> */}
            </div>
          ))}
        </div>
      </div>

      {/* Spacer section */}
      <div className="mt-10 h-[50vh] w-full border-t " />
    </div>
  );
};






export default CubeComposition



































