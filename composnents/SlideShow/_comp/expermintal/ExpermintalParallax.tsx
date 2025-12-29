/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { ProjectWithRelationsSlide } from "@/types/schema";
import Link from "next/link";
import BlurredImage from "@/composnents/Reusabale/ClientImageWithBlurHash";

gsap.registerPlugin(ScrollTrigger);

export const ProjectCardParallax = ({
    data,
    index = 0,
}: {
    data: ProjectWithRelationsSlide;
    index: number;
}) => {
    const position = (['left', 'right'] as const)[index % 2];
    
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Image parallax
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,

                    { y: 100, opacity: 0.8  , scale: .8},
                    {
                        y: -100,
                        opacity: 1,
                        ease: "none",
                        scale: 1,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.5,
                            markers: true
                        }
                    }
                );
            }

            // Content slide in
            if (contentRef.current) {
                gsap.fromTo(contentRef.current,

                    { 
                        x: position === 'left' ? -80 : 80,
                        opacity: 0 
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse",
                            markers: true
                        }
                    }
                );
            }
        });

        // Mobile animations
        mm.add("(max-width: 767px)", () => {
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            }

            if (contentRef.current) {
                gsap.fromTo(contentRef.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            }
        });

        return () => mm.revert();
    }, { scope: containerRef, dependencies: [index, position]  , 
        revertOnUpdate: true
    });

    const isLeftLayout = position === 'left';

    return (
        <div 
            ref={containerRef}
            className=" w-full  flex items-center  justify-between py-4 md:py-4"
        >
            <div className={`w-full max-w-[90%]  flex flex-col ${isLeftLayout ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
                
                {/* Image Section */}
                <div 

                    ref={imageRef}
                    className="w-full md:w-1/2 relative h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden"
                >
                    {data.image ? (
                        <BlurredImage
                            imageUrl={data.image.url}
                            alt={data.image.alt || data.title}
                            height={data.image.height || 400}
                            width={data.image.width || 600}
                            blurhash={data.image.blurHash || ""}
                            
                            // priority={index === 0}
                            className="object-cover w-full h-full"
                            quality={90}
                        
                        />
                    ) : (
                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                            <span className="text-neutral-600 text-sm">No image</span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div 
                
                    ref={contentRef}
                    className="w-full md:w-1/2 space-y-6"
                >
                    {/* Status Badge */}
                    {data.status && (
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider border border-neutral-700 rounded-full text-neutral-400">
                            {data.status.replace('_', ' ')}
                        </span>
                    )}

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold  leading-tight">
                        {data.title}
                    </h2>

                    {/* Client Info */}
                    {data.clientName && (
                        <div className="space-y-1">
                            <p className="text-lg  font-medium">
                                {data.clientName}
                            </p>
                            {data.clientCompany && (
                                <p className="text-sm ">
                                    {data.clientCompany}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    {data.description && (
                        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl">
                            {data.description}
                        </p>
                    )}

                    {/* Technologies */}
                    {data.technologies && data.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {data.technologies.slice(0, 5).map((tech :any, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 text-sm border border-neutral-400 rounded-md  bg-neutral-400/50"
                                >
                                    {tech.technology.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        {data.projectUrl && (
                            <Link
                                href={data.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
                            >
                                View Project
                                <span>→</span>
                            </Link>
                        )}
                        {data.githubUrl && (
                            <Link
                                href={data.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-neutral-700 rounded-full hover:border-neutral-500 hover:text-black/90 transition-colors"
                            >
                                GitHub
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};