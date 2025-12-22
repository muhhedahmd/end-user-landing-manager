



import React, {  useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slide } from "@/types/schema";
import { TypeToRender } from "../TypeToRender";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SingleCompsotion = ({ slides }: { slides: slide[] }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {

        const wrapper = wrapperRef.current;
        const track = trackRef.current;

        if (!wrapper || !track || slides.length === 0) return;


        // Calculate total horizontal movement
        const totalPercent = (slides.length - 1) * 60;
       
        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: `+=${slides.length * window.innerHeight}`,
                    scrub: 0.6, // This enables reverse animation on scroll back
                    pin: true,
                    anticipatePin: 1,
                    
                    snap: {
                        snapTo: 1 / Math.max(1, slides.length - 1),
                        duration: 0.35,
                        ease: "power2.out",
                    },
                    onUpdate: (self) => {
                        console.log({ progress: self.progress })
                        const idx = Math.round(self.progress * (slides.length - 1));
                        setActiveIndex(idx);
                    },
                
                    
                }, 
                defaults :{
                    ease : "none"
                }
            })
            tlRef.current.fromTo(track, {
                xPercent: 0,
            }, {
                xPercent: -totalPercent,
                ease: "none",
            });
        } , wrapper);

      
        return () => {
            ctx?.revert();
        };
    }, {
        dependencies: [slides.length    ] ,
        scope: wrapperRef
    });


    const goToIndex = (index: number) => {
        const tl = tlRef.current;
        if (!tl) return;

        const progress = index / Math.max(1, slides.length - 1);
        gsap.to(tl, {
            progress,
            duration: 0.6,
            ease: "power2.out"
        });
        setActiveIndex(index);
    };

    return (
        <div ref={wrapperRef} className="w-screen relative overflow-hidden max-w-screen">
            {/* Pinned wrapper */}
            <div  className="w-screen h-screen relative ">

                {/* Navigation bullets */}
                <div className="fixed left-[50%] top-[10%] -translate-y-1/2 -translate-x-1/2 z-50 flex flex-row gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === idx
                                ? "bg-black scale-125"
                                : "bg-black/30 hover:bg-black/50"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>



                {/* Slides container */}
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div
                        ref={trackRef}
                        className="flex items-center h-full will-change-transform"
                        style={{ width: "50vw" }}
                    >
                        {slides.map((slideItem) => (
                            <div
                                key={slideItem.id}
                                className="flex-shrink-0 h-full  w-[28vw] flex items-center justify-center"
                            >
                                <div
                                    className="pointer-events-auto flex items-center justify-center"
                                    style={{
                                        width: 480,
                                        height: 520,
                                    }}
                                >
                                    <TypeToRender slide={slideItem} cube />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCompsotion;
