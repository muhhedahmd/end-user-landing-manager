"use client";

import { useTimeLine } from "@/context/MainLoaderTimeLine";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const HeroAnimation = ({ children }: { children: React.ReactNode }) => {
    const { timeline, ctx, isReady } = useTimeLine();
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const hasAnimated = useRef(false);
    const scrollAnimationRef = useRef<gsap.core.Tween | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Reset animation flag when pathname changes
    useEffect(() => {
        hasAnimated.current = false;

        // Kill the infinite scroll animation when leaving the page
        if (scrollAnimationRef.current) {
            scrollAnimationRef.current.kill();
            scrollAnimationRef.current = null;
        }
    }, [pathname]);

    // Detect screen size
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
            // Only run animation on homepage
            if (pathname !== "/") {
                // Set static state for non-homepage
                if (headingRef.current && contentRef.current) {
                    gsap.set(headingRef.current, {
                        height: "auto",
                        padding: "0",
                        y: 0,
                    });
                    gsap.set(contentRef.current, {
                        y: 0,
                        autoAlpha: 1,
                    });
                }
                return;
            }

            if (
                !contentRef.current ||
                !headingRef.current ||
                !timeline ||
                !ctx ||
                !isReady ||
                hasAnimated.current
            )
                return;

            hasAnimated.current = true;
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
                            height: isMobile ? "10vh" : "18vh",
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
                        x: gsap.utils.wrap([width, -width]),
                    }
                );

                timeline.add(scrollAnimationRef.current, "0");
                timeline.addLabel("heroComplete");
            });
        },
        {
            dependencies: [timeline, ctx, isReady , pathname, isMobile],
            scope: contentRef,
            // revertOnUpdate: true,
        }
    );

    // If not homepage, render simple static version
    if (pathname !== "/") {
        return (
            <div>
                <div className="overflow-hidden w-full max-w-[100vw]">
                    <div
                        ref={headingRef}
                        className="relative  -z-10 py-8 flex items-center justify-center px-4 mt-4"
                    >
                        <h3 className="  text-[5rem] sm:text-[7rem] md:text-[9rem] font-normal text-nowrap">
                            TECH VISION SOLUTIONS
                        </h3>
                    </div>
                </div>
                <div ref={contentRef} className="px-4 sm:px-6 md:px-8 lg:px-12">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="overflow-hidden w-full max-w-[100vw]">
                <div
                
                    ref={headingRef}
                    className="relative -z-10 h-screen  -md-50 md:mt-0  pb-20 sm:pb-32 md:pb-40 flex items-end justify-center px-4"
                >
                    {[...Array(5)].map((_, i) => (
                        <h3
                        key={i}
                            className="  text-[5rem] sm:text-[7rem] md:text-[8rem] lg:text-[9rem] xl:text-[10rem] font-normal text-nowrap">

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