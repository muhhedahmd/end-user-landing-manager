"use client";

import { useTimeLine } from "@/context/MainLoaderTimeLine";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const HeroAnimation = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isRTL  = pathname.startsWith("/ar");
    const { timeline, ctx, isReady } = useTimeLine();
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const scrollAnimationRef = useRef<gsap.core.Tween | null>(null);
    const [isMobile, setIsMobile] = useState(false);

  
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(
        () => {
          
            if (
                !contentRef.current ||
                !headingRef.current ||
                !timeline ||
                !ctx ||
                !isReady 
                // hasAnimated.current
            )
                return;

            // hasAnimated.current = true;
            const width = headingRef.current.scrollWidth / 2;

            ctx.add(() => {
                gsap.set(contentRef.current, {
                    y: isMobile ? 0 : 50,
                    autoAlpha: 0,
                });

                timeline
                    .from(
                        headingRef.current,
                        {
                            y: 0,
                            duration: 0.3,
                            paddingBottom: isMobile ? "5rem" : "10rem",
                            height: "100vh",
                            ease: "power2.inOut",
                        }
                    )
                    .to(
                        headingRef.current,
                        {
                            y: 0,
                            duration: 1,
                            padding: "0",
                            height: isMobile ? "12vh" : "18vh",
                            ease: "power4.out",
                        },
                        "headerComplete+=0"
                    )
                    .to(
                        contentRef.current,
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.3,
                            ease: "power2.out",
                        },
                        "headerComplete+=0"
                    );

                // Store the scroll animation separately so we can kill it
                scrollAnimationRef.current = gsap.to(
                    headingRef.current,
                    {
                        duration: isMobile ? 30 : 23,
                        ease: "none",
                        repeat: -1,
                        x: isRTL ?  gsap.utils.wrap([-width /2 ,  width /2, ]) : gsap.utils.wrap([ width /2, -width/2]),
                        onRepeat: () => {
                            gsap.set(headingRef.current, {
                                x:0
                            })
                            
                        }
                    }
                );

                timeline.add(scrollAnimationRef.current, "0");
                timeline.addLabel("heroComplete");
            });
        },
        {
            dependencies: [timeline, ctx],
            // revertOnUpdate: true,
        }
    );


    return (
        <div>
            <div className="overflow-hidden w-full max-w-[100vw]">

                <div
                
                    ref={headingRef}
                    className="relative -z-10 h-screen    md:mt-0   xl-h-sm:bg-red-500 pb-20 sm:pb-32 md:pb-40 flex items-end justify-center px-4"
                >
                    {[...Array(5)].map((_, i) => (
                        <h3
                        key={i}
                            className="  text-[5rem] sm:text-[7rem] md:text-[8rem] h-lg:bg-red-500  xl:text-[5rem] min-xl:text-[10rem] font-normal text-nowrap">

                            TECH VISION SOLUTIONS
                        </h3>
                    ))}
                </div>
            </div>
            <div ref={contentRef} className="px-4 sm:px-6 md:px-8 lg:px-12">
                {children}
            </div>
        </div>
    );
};

export default HeroAnimation;