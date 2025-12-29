
"use client"

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TypeToRenderProd } from "../TypToRenderProd";
import { slide } from "@/types/schema";
import gsap from "gsap"

export const ExpermintalParallaxContainer = ({ slides, isInViewport }: {
    slides: slide[],
    isInViewport: boolean
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            slidesRef.current.forEach((slide, idx) => {
                if (!slide) return;

                // Initial animation
                gsap.fromTo(slide,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: slide,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, [slides]);


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (window.innerWidth < 768) return; // Disable on mobile

        const rect = e.currentTarget.getBoundingClientRect();
        const offset = ((e.clientX - rect.left) / rect.width - 0.5) * 30;

        gsap.to(slidesRef.current, {
            y: offset,
            duration: 0.3,
            ease: 'power2.out',
        });
    
    };

    const handleTouchStart = () => {
        gsap.to(slidesRef.current, {
            y: 0,
            duration: 0.3,
        });
    };

    return (
        <div className="">
            <div
                ref={containerRef}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl flex flex-col w-full h-full gap-3 sm:gap-4 md:gap-5"
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
            >
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        ref={(el) => {
                            if (el) slidesRef.current[idx] = el;
                        }}
                        className="inset-0 max-h-[70vh] overflow-hidden space-y-6 sm:space-y-8 md:space-y-12"
                    >
                        <TypeToRenderProd
                            play={isInViewport}
                            slide={slide}
                            split={true}
                            index={idx}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

