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
    const imageRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!imageRef.current) return;

        if (HoverId === item.id) {
            // Animate image in
            gsap.fromTo(imageRef.current,
                {
                    scale: .8,
                    rotate: 0
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

    useGSAP(() => {
        if (!cardRef.current) return;

        // if (HoverId === item.id) {
        //     // Expand card smoothly
        //     gsap.to(cardRef.current, {
        //         height: "auto",
        //         duration: 0.4,
        //         ease: "power2.out"
        //     });
        // } else {
        //     // Collapse card
        //     gsap.to(cardRef.current, {
        //         height: "3.5rem", // h-14
        //         duration: 0.3,
        //         ease: "power2.in"
        //     });
        // }
    }, {
        dependencies: [HoverId, item.id]
    });

    return (
        <>
            <div className="relative w-full px-24">
                <div
                    ref={cardRef}
                    onPointerEnter={() => setHoverId(item.id)}
                    onPointerLeave={() => setHoverId(null)}
                    className="cursor-pointer group h-12 hover:h-36 rounded-md shadow-md  transition-all duration-300 ease-in-out flex items-start justify-start w-full sm:w-3/4 md:w-1/2 bg-primary text-background flex-col overflow-hidden gap-2 py-2 pr-4"
                >
                    {children}
                </div>

                {item.image && HoverId === item.id && (
                    <>
                        <div
                            ref={imageRef}
                            className='absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10'
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
                    </>
                )}
            </div>
            
            <BlurhashCanvas  
            style={{
                visibility : HoverId === item.id  ? "visible" : "hidden"
            }}
            hash={item?.image?.blurHash || ""} className={cn("-z-100 fixed top-0 left-0 w-screen h-screen  transition-all duration-200 ease-in-out is", HoverId === item.id ? "opacity-30" : "opacity-0")} />
        </>
    )
}

export default ServiceHoverCard