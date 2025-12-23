
// ============================================================================
// PROJECT CARD
// ============================================================================

import BlurredImage from "@/composnents/Reusabale/ClientImageWithBlurHash"
import { ProjectWithRelationsSlide } from "@/types/schema"
import { ExternalLink, Github} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"

interface ProjectCardProps {
    data: ProjectWithRelationsSlide
    split?: boolean
    index?: number
    imagePosition?: string
    story?: boolean
}

export const ProjectCard = ({
    data,
    split,
    index = 0,
    imagePosition,
    story
}: ProjectCardProps) => {
    if (split) {
        return <ProjectCardParallax data={data} index={index} imagePosition={imagePosition} />
    }

    if (story) {
        return <ProjectCardStory data={data} />
    }

    return <ProjectCardDefault data={data} />
}

const ProjectCardDefault = ({ data }: { data: ProjectWithRelationsSlide }) => {
    const cardRef = useRef<HTMLDivElement>(null)

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

        const title = card.querySelector(".project-title")
        const client = card.querySelector(".project-client")
        const description = card.querySelector(".project-description")
        const links = card.querySelector(".project-links")

        const elements = [
            { el: title, delay: 0.1, x: -10 },
            { el: client, delay: 0.2, x: -10 },
            { el: description, delay: 0.3, x: 0 },
            { el: links, delay: 0.4, y: 10 }
        ]

        elements.forEach(({ el, delay, x = 0, y = 0 }) => {
            if (el) {
                gsap.fromTo(
                    el,
                    { opacity: 0, x, y },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        delay,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%"
                        }
                    }
                )
            }
        })
    }, [])

    return (
        <div
            ref={cardRef}
            className="group relative h-full overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
        >
            <div className="relative h-48 overflow-hidden bg-muted">
                {data.image && (
                    <BlurredImage
                        imageUrl={data.image.url || ""}
                        height={data.image.height || 400}
                        width={data.image.width || 800}
                        alt={data.image.alt || data.title}
                        blurhash={data.image.blurHash || ""}
                        quality={100}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                )}
            </div>

            <div className="p-6 space-y-3">
                <h3 className="project-title text-lg font-bold text-foreground font-sora">
                    {data.title}
                </h3>

                {data.clientName && (
                    <div className="project-client flex items-center gap-2 text-sm text-muted-foreground font-inter">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {data.clientName}
                    </div>
                )}

                {data.description && (
                    <p className="project-description text-sm text-muted-foreground leading-relaxed font-inter">
                        {data.description}
                    </p>
                )}

                <div className="project-links flex gap-3 pt-3 border-t border-border">
                    {data.projectUrl && (
                        <Link
                            href={data.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors font-inter"
                        >
                            View Project
                        </Link>
                    )}

                    {data.githubUrl && (
                        <Link
                            href={data.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors font-inter"
                        >
                            GitHub
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

const ProjectCardParallax = ({
    data,
    index = 0,
    imagePosition
}: {
    data: ProjectWithRelationsSlide
    index: number
    imagePosition?: string
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const autoPosition = (["left", "right", "top"] as const)[index % 3]
    const position: "left" | "right" | "top" | "bottom" =
        (imagePosition as "left" | "right" | "top" | "bottom") || autoPosition

    useEffect(() => {
        const container = containerRef.current
        const image = imageRef.current
        const content = contentRef.current

        if (!container || !image || !content) return

        // Container fade
        gsap.fromTo(
            container,
            { opacity: 0 },
            {
                opacity: 1,
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        )

        // Image parallax
        gsap.to(image, {
            y: 100,
            scale: 1.1,
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        })

        // Content parallax
        gsap.to(content, {
            y: -50,
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        })

        // Content elements animation
        const tag = content.querySelector(".project-tag")
        const title = content.querySelector(".project-title")
        const client = content.querySelector(".project-client")
        const description = content.querySelector(".project-description")
        const links = content.querySelector(".project-links")

        const elements = [tag, title, client, description, links].filter(Boolean)

        elements.forEach((el, i) => {
            gsap.fromTo(
                el,
                { opacity: 0, x: position === "right" ? 20 : -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: 0.2 + i * 0.1,
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%"
                    }
                }
            )
        })
    }, [position])

    const layouts = {
        left: "flex-row",
        right: "flex-row-reverse",
        top: "flex-col",
        bottom: "flex-col-reverse"
    }

    const imageSize =
        ["top", "bottom"].includes(position) ? "h-[60vh] w-full" : "h-screen w-3/5"

    return (
        <div className="min-h-screen h-screen overflow-hidden flex items-center justify-center py-20 px-4">
            <div
                ref={containerRef}
                className={`group relative w-full overflow-hidden flex ${layouts[position]}`}
            >
                {/* Image Section */}
                <div className={`relative ${imageSize} overflow-hidden`}>
                    <div ref={imageRef} className="w-full h-full">
                        {data.image && (
                            <BlurredImage
                                imageUrl={data.image.url || ""}
                                height={data.image.height || 400}
                                width={data.image.width || 800}
                                alt={data.image.alt || data.title}
                                blurhash={data.image.blurHash || ""}
                                quality={100}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div
                        className={`absolute inset-0 bg-gradient-to-${position === "left" ? "r" : position === "right" ? "l" : position === "top" ? "b" : "t"
                            } from-transparent to-slate-900/50`}
                    />
                </div>

                {/* Content Section */}
                <div
                    ref={contentRef}
                    className={`flex-1 p-12 ${["top", "bottom"].includes(position) ? "min-h-[40vh]" : ""
                        } flex flex-col justify-center space-y-6`}
                >
                    <div>
                        <span className="project-tag inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
                            Featured Project
                        </span>

                        <h3 className="project-title text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            {data.title}
                        </h3>
                    </div>

                    {data.clientName && (
                        <div className="project-client flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" />
                            <span className="text-lg font-medium">{data.clientName}</span>
                        </div>
                    )}

                    {data.description && (
                        <p className="project-description text-lg leading-relaxed max-w-xl">
                            {data.description}
                        </p>
                    )}

                    <div className="project-links flex flex-wrap gap-4 pt-6">
                        {data.projectUrl && (
                            <Link
                                href={data.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
                            >
                                View Project
                                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                            </Link>
                        )}
                        {data.githubUrl && (
                            <Link
                                href={data.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 rounded-full border-2 border-slate-600 hover:border-slate-400 hover:text-white font-semibold transition-all duration-300"
                            >
                                GitHub
                            </Link>
                        )}
                    </div>
                </div>
            </div >
        </div >
    )
}

const ProjectCardStory = ({ data }: { data: ProjectWithRelationsSlide }) => {
    const articleRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const article = articleRef.current
        if (!article) return

        gsap.fromTo(
            article,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: article,
                    start: "top 85%"
                }
            }
        )

        const elements = article.querySelectorAll(".story-element")
        elements.forEach((el, i) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.2 + i * 0.1,
                    scrollTrigger: {
                        trigger: article,
                        start: "top 85%"
                    }
                }
            )
        })
    }, [])

    return (
        <article
            ref={articleRef}
            className="w-full flex flex-col md:flex-row gap-6 mx-auto px-6 py-16"
        >
            <div className="aspect-4/4 w-[60rem] relative mb-3 overflow-hidden group">
                {data.image && (
                    <div className="h-full w-full overflow-hidden bg-gray-100">
                        <BlurredImage
                            imageUrl={data.image.url}
                            height={data.image.height || 400}
                            width={data.image.width || 800}
                            alt={data.image.alt || data.title}
                            blurhash={data.image.blurHash || ""}
                            quality={100}
                            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </div>
                )}
            </div>

            <div className="space-y-8">
                <h1 className="story-element text-5xl md:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                    {data.title}
                </h1>

                {data.clientName && (
                    <div className="story-element flex items-center gap-2 text-base text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-medium">{data.clientName}</span>
                        {data.clientCompany && (
                            <>
                                <span className="text-border">•</span>
                                <span>{data.clientCompany}</span>
                            </>
                        )}
                    </div>
                )}
                {data.description && (
                    <p className="story-element text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                        {data.description}
                    </p>
                )}

                {data.richDescription && (
                    <div className="story-element prose prose-lg max-w-3xl text-muted-foreground">
                        {data.richDescription.split("\n").map((paragraph, idx) => {
                            return (
                                paragraph.trim() && (
                                    <p key={idx} className="mb-4">
                                        {paragraph}
                                    </p>
                                )
                            )
                        })}
                    </div>
                )}

                <div className="story-element flex flex-wrap items-center gap-6 pt-4 border-t border-border">
                    {data.projectUrl && (
                        <Link
                            href={data.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary transition-colors"
                        >
                            <span>View Project</span>
                            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    )}

                    {data.githubUrl && (
                        <Link
                            href={data.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            <span>View Source</span>
                        </Link>
                    )}
                </div>
            </div >
        </article >
    )
}