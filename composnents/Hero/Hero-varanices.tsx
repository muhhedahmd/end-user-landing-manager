
import { IHero, Image } from "@/types/schema"
import Link from "next/link"
import BlurredImage from "../Reusabale/ClientImageWithBlurHash"
import { cn } from "@/lib/utils"

interface ProductionHeroProps {
    hero: IHero
    backgroundImage?: Image
}

export function ProductionHero({ hero, backgroundImage }: ProductionHeroProps) {
    if (!hero.isActive) return null

    const backgroundImageUrl = backgroundImage?.url || ""


    const getMinHeight = () => {
        if (hero.variant === "FULL_SCREEN") return "min-h-screen"
        if (hero.variant === "MINIMAL") return "min-h-[400px] md:min-h-[500px]"
        if (hero.variant === "SPLIT") return "min-h-[70vh]"
        if (hero.variant === "IMAGE_BACKGROUND") return "min-h-screen md:min-h-screen"
        return hero.minHeight ? `min-h-[${hero.minHeight}px]` : "min-h-[calc(100vh-64px)]"
    }

    // Parse style overrides
    const styleOverrides = hero.styleOverrides
        ? typeof hero.styleOverrides === "string"
            ? JSON.parse(hero.styleOverrides)
            : hero.styleOverrides
        : {}

    // Alignment map
    const alignmentMap = {
        LEFT: "flex-start",
        CENTER: "center",
        RIGHT: "flex-end",
    }

    // Title size mapping (converted to Tailwind classes for production)
    const titleSizeMap = {
        "2xl": "text-4xl sm:text-5xl lg:text-6xl",
        "3xl": "text-5xl sm:text-6xl lg:text-7xl",
        "4xl": "text-5xl sm:text-7xl lg:text-8xl",
        "5xl": "text-7xl sm:text-8xl lg:text-9xl",
        "6xl": "text-7xl sm:text-9xl",
        "7xl": "text-9xl",
    }

    // Button variant styles
    const buttonVariantStyles = {
        PRIMARY: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105",
        SECONDARY: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl hover:scale-105",
        GHOST: "bg-transparent border-2 border-current text-foreground hover:bg-foreground/10 backdrop-blur-sm",
        OUTLINE: "bg-transparent border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground",
        DANGER: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl",
        LINK: "bg-transparent text-primary hover:underline",
    }

    const getButtonClass = (variant?: string | null) => {
        return ` ${buttonVariantStyles[variant as keyof typeof buttonVariantStyles] || buttonVariantStyles.PRIMARY}`
    }

    // Responsive height calculation


    // Content padding based on variant
    const getContentPadding = () => {
        switch (hero.variant) {
            case "MINIMAL":
                return "px-4 py-8 sm:px-8 sm:py-12"
            case "SPLIT":
                return "px-1 py-2 sm:px-16 sm:py-12"
            default:
                return "px-4 py-12 sm:px-8 sm:py-16"
        }
    }

    // Render content
    const renderContent = () => (

        <>
            <h1
                className={`${titleSizeMap[hero.titleSize as keyof typeof titleSizeMap] || titleSizeMap["4xl"]} font-bold leading-tight tracking-tight text-balance`}
                style={{ color: hero.titleColor || undefined, marginBottom: "1rem" }}
            >
                {hero.title}
            </h1>

            {hero.subtitle && (
                <p
                    className="text-xl sm:text-2xl md:text-3xl font-semibold text-balance"
                    style={{ color: hero.subtitleColor || undefined, marginBottom: "1rem" }}
                >
                    {hero.subtitle}
                </p>
            )}

            {hero.description && (
                <p
                    className="text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed text-balance"
                    style={{ color: hero.descriptionColor || undefined, marginBottom: "2rem" }}
                >
                    {hero.description}
                </p>
            )}

            {(hero.ctaText || hero.secondaryCtaText) && (
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: alignmentMap[hero.alignment as keyof typeof alignmentMap] || "center",
                        width: "100%",
                        flexWrap: "wrap",
                    }}
                >
                    {hero.ctaText && hero.ctaUrl && (
                        <Link href={hero.ctaUrl}>
                            <button
                                className={getButtonClass(hero.ctaVariant)}
                            >

                                {hero.ctaText}
                            </button>
                        </Link>
                    )}
                    {hero.secondaryCtaText && hero.secondaryCtaUrl && (
                        <Link href={hero.secondaryCtaUrl}>
                            <button className={getButtonClass(hero.secondaryCtaVariant)}>
                                {hero.secondaryCtaText}
                            </button>
                        </Link>
                    )}
                </div>
            )}

            {hero.showScrollIndicator && (
                <>
                </>
                // <div

                //     className="z-10 absolute -bottom-60   md:-bottom-40 left-1/2  transform -translate-x-1/2 -translate-y-1/2   flex flex-col items-center gap-2 text-foreground/60"
                // >
                //     <p className="text-sm">Scroll to explore</p>
                //         <ChevronDown size={24} />
                //     </div>
                // </div>
            )}
        </>
    )

    // Render variants - MATCHING HeroPreview
    const renderVariant = () => {

        switch (hero.variant) {
            case "SPLIT":
                return (
                    <div className=" relative z-10 w-full  flex flex-col  md:items-enter items-start xl:h-[65dvh]  md:h-[70dvh] h-[84dvh]">

                        <div className="md:pl-5 md:mb-0 mb-5 flex-1 flex flex-col md:justify-center justify-start w-full" style={{ padding: getContentPadding() }}>

                            <div
                                className=" flex start  gap-10 items-end justify-between w-full "
                                style={{
                                    // textAlign: hero.alignment === "CENTER" ? "center" : hero.alignment === "RIGHT" ? "right" : "left",
                                }}
                            >
                                <div>

                                    <h1

                                        className="text-base sm:text-lg md:text-5xl leading-relaxed text-balance font-bold"
                                        // style={{  || undefined, marginBottom: "1rem" }}
                                    >
                                        {hero.title}
                                    </h1>

                                    {hero.subtitle && (

                                        <p
                                            className="text-xl sm:text-2xl md:text-2xl  text-balance font-light"
                                            // style={{ color: hero.subtitleColor || undefined, marginBottom: "1rem" }}
                                        >
                                            {hero.subtitle}
                                        </p>
                                    )}

                                    {hero.description && (

                                        <p
                                            className="text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed text-balance font-light"
                                            // style={{ color: hero.descriptionColor || undefined, }}
                                        >
                                            {hero.description}
                                        </p>
                                    )}
                                </div>
                                <div className=" md:g-accent rounded-md w-max p-1  gap-3  md:static  z-10 flex justify-start items-end flex-col md:flex-row">

                                    {(hero.ctaText || hero.secondaryCtaText) && (

                                        <>
                                            {hero.ctaText && hero.ctaUrl && (
                                                <Link
                                                className="w-max"

                                                    href={hero.ctaUrl}>
                                                    {hero.ctaText}
                                                </Link>
                                            )}
                                            {hero.secondaryCtaText && hero.secondaryCtaUrl && (
                                                <Link
                                                className="w-max"
                                                    href={hero.secondaryCtaUrl}>
                                                    {hero.secondaryCtaText}
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </div>



                            </div>
                        </div>
                        {backgroundImageUrl && backgroundImage && (


                            <div
                                className=" rounded-xl md:p-5 flex  h-full  w-full overflow-hidden md:pr-5"
                            >

                                <BlurredImage
                                    alt={backgroundImage.alt || ""}
                                    imageUrl={backgroundImage.url}
                                    height={backgroundImage.height && backgroundImage.height > 400 ? backgroundImage.height : 400}
                                    width={backgroundImage.width && backgroundImage.width > 400 ? backgroundImage.width : 400}
                                    blurhash={backgroundImage.blurHash || ""}
                                    className={"w-full h-full object-cover"}
                                    
                                />

                            </div>
                        )}
                    </div>
                )

            case "IMAGE_BACKGROUND":
                return (
                    <div className="relative z-10 w-full max-w-4xl mx-auto" style={{ padding: getContentPadding() }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                            {renderContent()}
                        </div>
                    </div>
                )

            case "MINIMAL":
                return (
                    <div className="relative z-10 w-full max-w-2xl mx-auto" style={{ padding: getContentPadding() }}>
                        <div
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
                        >
                            {renderContent()}
                        </div>
                    </div>
                )

            case "VIDEO_BACKGROUND":
                return (
                    <div className="relative z-10 w-full max-w-4xl mx-auto" style={{ padding: getContentPadding() }}>
                        <div
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
                        >
                            {renderContent()}
                        </div>
                    </div>
                )

            case "FULL_SCREEN":
                return (
                    <div
                        className="relative z-10 w-full h-full flex flex-col items-center justify-center"
                        style={{ padding: getContentPadding() }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                maxWidth: "56rem",
                            }}
                        >
                            {renderContent()}
                        </div>
                    </div>
                )

            default: // CENTERED
                return (
                    <div className="relative z-10 w-full max-w-4xl mx-auto" style={{ padding: getContentPadding() }}>
                        <div

                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: alignmentMap[hero.alignment as keyof typeof alignmentMap] || "center",
                                textAlign: hero.alignment === "LEFT" ? "left" : hero.alignment === "RIGHT" ? "right" : "center",
                            }}
                        >
                            {renderContent()}
                        </div>
                    </div>
                )
        }
    }

    return (
        <div
            className={cn(`relative w-full overflow-hidden flex  justify-center ${getMinHeight()}`, hero.variant !== "SPLIT" && "items-center")}
            style={{
                // backgroundColor: "#ffffff",
                // backgroundColor: !backgroundImageUrl && !hero.backgroundVideo ? hero.backgroundColor || "transparent" : "transparent",
                backgroundImage: hero.variant !== "SPLIT" && backgroundImageUrl ? `url(${backgroundImageUrl})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                ...(styleOverrides as React.CSSProperties),
            }}

        >
            <div className="md:container">

                {/* Background Image with BlurredImage - Not for SPLIT variant */}
                {backgroundImage && hero.variant !== "SPLIT" && (
                    <div className="absolute inset-0 w-full h-full -z-20">
                        <BlurredImage
                            alt={backgroundImage.alt || ""}
                            imageUrl={backgroundImage.url}
                            height={backgroundImage.height || 400}
                            width={backgroundImage.width || 400}
                            className={"w-full h-full object-cover"}
                            
                            blurhash={backgroundImage.blurHash || ""}

                        />
                    </div>
                )}

                {/* Background Video */}
                {hero.backgroundVideo && (
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover -z-20">
                        <source src={hero.backgroundVideo} type="video/mp4" />
                    </video>
                )}

                {/* Overlay */}
                {(backgroundImageUrl || hero.backgroundVideo) && (
                    <div
                        className="absolute inset-0 -z-10"
                        style={{
                            backgroundColor: hero.overlayColor || "#000000",
                            opacity: hero.overlayOpacity ?? 0.5,
                        }}
                        aria-hidden="true"
                    />
                )}

                {/* Background Gradient - Only if no image/video */}
                {!backgroundImageUrl && !hero.backgroundVideo && (
                    <div className="absolute inset-0 -z-10" aria-hidden="true">
                        <div className="absolute top-20 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                    </div>
                )}

                {/* Content */}
                <div className="relative w-full">{renderVariant()}</div>

                {/* Custom CSS */}
                {hero.customCSS && <style dangerouslySetInnerHTML={{ __html: hero.customCSS }} />}
            </div>

        </div>
    )
}
