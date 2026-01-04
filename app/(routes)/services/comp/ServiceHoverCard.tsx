"use client"

import { ServiceWithImage } from '@/types/schema'
import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import BlurredImage from '@/composnents/Reusabale/ClientImageWithBlurHash'
import { useGSAP } from '@gsap/react'
import { BlurhashCanvas } from 'react-blurhash'
import { cn } from '@/lib/utils'

const ServiceHoverCard = ({
    children,
    item,
    idx
}: {
    item: ServiceWithImage,
    idx: number
    children: React.ReactNode
}) => {
    const [HoverId, setHoverId] = useState<null | string>(null);
    const [isMobile, setIsMobile] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Detect if device is mobile/touch
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches || 
                       'ontouchstart' in window);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close on outside click for mobile
    useEffect(() => {
        if (!isMobile || HoverId !== item.id) return;

        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
                setHoverId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobile, HoverId, item.id]);

    useGSAP(() => {
        if (!imageRef.current) return;

        if (HoverId === item.id) {
            gsap.fromTo(imageRef.current,
                {
                    scale: 0.8,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }
            );
        }
    }, {
        dependencies: [HoverId, item.id]
    });

    const handleInteraction = () => {
        if (isMobile) {
            // Toggle on mobile
            setHoverId(prev => prev === item.id ? null : item.id);
        } else {
            // Just set on desktop (handled by hover)
            setHoverId(item.id);
        }
    };

    const handlePointerLeave = () => {
        if (!isMobile) {
            setHoverId(null);
        }
        // On mobile, don't close on pointer leave - let click outside handle it
    };

    return (
        <>
            <div className="relative w-full md:px-24 p-4 cursor-default">
                <div
                    ref={cardRef}
                    onClick={handleInteraction}
                    onPointerEnter={() => !isMobile && setHoverId(item.id)}
                    onPointerLeave={handlePointerLeave}
                    className={cn(
                        "cursor-pointer group rounded-md shadow-md transition-all duration-300 ease-in-out",
                        "flex items-start justify-start w-full sm:w-3/4 md:w-1/2",
                        "bg-primary text-background flex-col overflow-hidden gap-2 py-2 pr-4",
                        HoverId === item.id ? "h-36" : "h-12"
                    )}
                >
                    {children}
                </div>

                {item.image && HoverId === item.id && (
                    <div
                        ref={imageRef}
                        className='absolute md:top-1/2 md:left-3/4  top-[140%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10'
                    >
                        <BlurredImage
                            alt={item.image.alt || item.name}
                            width={item.image.width || 100}
                            height={item.image.height || 100}
                            imageUrl={item.image.url || ""}
                            quality={70}
                            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-120 xl:h-120 object-cover rounded-xl shadow-2xl"
                            blurhash={item.image.blurHash || ""}
                        />
                    </div>
                )}
            </div>
            
            <BlurhashCanvas  
                style={{
                    visibility: HoverId === item.id ? "visible" : "hidden"
                }}
                hash={item?.image?.blurHash || ""} 
                className={cn(
                    "fixed top-0 left-0 w-screen h-screen transition-all duration-200 ease-in-out -z-10",
                    HoverId === item.id ? "opacity-30" : "opacity-0"
                )} 
            />
        </>
    )
}

export default ServiceHoverCard