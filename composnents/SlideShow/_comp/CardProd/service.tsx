"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BlurredImage from "@/composnents/Reusabale/ClientImageWithBlurHash"

import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)


interface ServiceCardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    imaged?: boolean
    splitcarousel?: boolean
    story?: boolean
}

export const ServiceCard = ({ data, imaged = false, splitcarousel, story }: ServiceCardProps) => {

    const cardRef = useRef<HTMLElement>(null)
    const DataToRender = data?.name ? data : data.data

    useEffect(() => {
        const card = cardRef.current
        if (!card) return

        gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        )

        // Animate children
        const title = card.querySelector(".service-title")
        const description = card.querySelector(".service-description")
        const price = card.querySelector(".service-price")

        if (title) {
            gsap.fromTo(
                title,
                { opacity: 0, x: -10 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    delay: 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%"
                    }
                }
            )
        }

        if (description) {
            gsap.fromTo(
                description,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%"
                    }
                }
            )
        }

        if (price) {
            gsap.fromTo(
                price,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%"
                    }
                }
            )
        }
    }, [])

    if (imaged) {
        return (
            <>
                {DataToRender.image && (
                    <div className="mb-5 h-full w-full overflow-hidden rounded-xl bg-muted">
                        <BlurredImage
                            imageUrl={DataToRender.image.url || ""}
                            height={DataToRender.image.height || 400}
                            width={DataToRender.image.width || 800}
                            alt={DataToRender.image.alt || data.name}
                            blurhash={DataToRender.image.blurHash || ""}
                            quality={100}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>
                )}
            </>
        )
    }

    if (splitcarousel) {
        return (
            <article
                ref={cardRef}
                className="group relative h-full overflow-hidden rounded-2xl flex flex-row w-full gap-4 p-2 hover:border-primary/50 transition-all duration-300"
            >
                {DataToRender.image && (
                    <div className="mb-5 w-2/3 h-130 overflow-hidden rounded-md bg-muted">
                        <BlurredImage
                            imageUrl={DataToRender.image.url || ""}
                            height={DataToRender.image.height || 400}
                            width={DataToRender.image.width || 800}
                            alt={DataToRender.image.alt || data.name}
                            blurhash={DataToRender.image.blurHash || ""}
                            quality={100}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>
                )}

                <div className="space-y-4 max-w-2/5 h-full">
                    <div className="flex items-center gap-3 text-4xl">
                        {DataToRender.icon && DataToRender?.icon?.startsWith("http") ? (
                            <div className="w-12 h-12 rounded-xl bg-primary/10 p-2.5 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                <Image
                                    src={DataToRender.icon}
                                    width={24}
                                    height={24}
                                    alt={DataToRender.name + "-icon"}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ) : (
                            <span>{DataToRender.icon}</span>
                        )}
                        <h3 className="service-title text-inherit font-bold font-sora text-foreground">
                            {DataToRender.name}
                        </h3>
                    </div>

                    {DataToRender.description && (
                        <p className="service-description text-xl text-muted-foreground leading-relaxed font-inter">
                            {DataToRender.description}
                        </p>
                    )}

                    {DataToRender.richDescription && (
                        <div
                            className="service-description text-md text-muted-foreground leading-relaxed font-inter"
                            dangerouslySetInnerHTML={{ __html: DataToRender.richDescription }}
                        />
                    )}

                    {DataToRender.price && (
                        <div className="service-price pt-4 border-t mt-auto border-border">
                            <span className="text-base font-bold text-primary font-sora">
                                {DataToRender.price}
                            </span>
                        </div>
                    )}
                </div>
            </article>
        )
    }

    return (
        <article
            ref={cardRef}
            className="group relative h-full overflow-hidden rounded-2xl p-2 hover:border-primary/50 transition-all duration-300"
        >
            {DataToRender.image && (
                <div className="mb-5 h-70 overflow-hidden rounded-md bg-muted">
                    <BlurredImage
                        imageUrl={DataToRender.image.url || ""}
                        height={DataToRender.image.height || 400}
                        width={DataToRender.image.width || 800}
                        alt={DataToRender.image.alt || data.name}
                        blurhash={DataToRender.image.blurHash || ""}
                        quality={100}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                </div>
            )}

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    {DataToRender.icon && DataToRender?.icon?.startsWith("http") ? (
                        <div className="w-12 h-12 rounded-xl bg-primary/10 p-2.5 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                            <Image
                                src={DataToRender.icon}
                                width={24}
                                height={24}
                                alt={DataToRender.name + "-icon"}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ) : (
                        <span>{DataToRender.icon}</span>
                    )}
                    <h3 className="service-title text-xl font-bold font-sora text-foreground">
                        {DataToRender.name}
                    </h3>
                </div>

                {DataToRender.description && (
                    <p className="service-description text-sm text-muted-foreground leading-relaxed font-inter">
                        {DataToRender.description}
                    </p>
                )}

                {DataToRender.richDescription && (
                    <div
                        className="service-description text-sm text-muted-foreground leading-relaxed font-inter"
                        dangerouslySetInnerHTML={{ __html: DataToRender.richDescription }}
                    />
                )}

                {DataToRender.price && (
                    <div className="service-price pt-4 border-t border-border">
                        <span className="text-base font-bold text-primary font-sora">
                            ${DataToRender.price}
                        </span>
                    </div>
                )}
            </div>
        </article>
    )
}

// ============================================================================
// CLIENT CARD
// ============================================================================

// ============================================================================
// TESTIMONIAL CARD
// ============================================================================

// ============================================================================
// TEAM MEMBER CARD
// ============================================================================
