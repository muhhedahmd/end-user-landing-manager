"use client"

import { Loader2, Globe, Languages } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTransition, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"

// ==================== TYPES ====================
type Variant = "default" | "outline" | "ghost" | "link" | "icon"
type Size = "sm" | "md" | "lg"
type Placement = "header" | "footer" | "sidebar" | "inline"

interface SwitchLangProps {
  variant?: Variant
  size?: Size
  placement?: Placement
  showIcon?: boolean
  showTransition?: boolean
  className?: string
}

// ==================== VARIANT STYLES ====================
const variantStyles: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-primary text-primary hover:bg-primary/10",
  ghost: "text-primary hover:bg-primary/10",
  link: "text-primary hover:underline underline-offset-4",
  icon: "p-2 rounded-full hover:bg-primary/10 text-primary",
}

const sizeStyles: Record<Size, string> = {
  sm: "text-xs px-2 py-1 h-7",
  md: "text-sm px-3 py-2 h-9",
  lg: "text-base px-4 py-2.5 h-11",
}

const iconSizeStyles: Record<Size, string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
}

// ==================== TRANSITION LOADER ====================
const TransitionLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    if (panelsRef.current.length === 0) return

    const tl = gsap.timeline()

    // Panels slide in from different directions
    tl.fromTo(
      panelsRef.current,
      {
        x: (i) => (i % 2 === 0 ? "-100%" : "100%"),
      },
      {
        x: "0%",
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.inOut",
      }
    )

    // Panels slide out
    tl.to(
      panelsRef.current,
      {
        x: (i) => (i % 2 === 0 ? "100%" : "-100%"),
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.inOut",
      },
      "+=0.3"
    )
  }, {
    dependencies: [],
    revertOnUpdate: true,
  })

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) panelsRef.current[i] = el
          }}
          className="absolute h-1/4 w-full bg-background/95 backdrop-blur-sm border-y border-border/50"
          style={{ top: `${i * 25}%` }}
        />
      ))}
    </div>
  )
}

export default function SwitchLang({
  variant = "outline",
  size = "md",
  placement = "inline",
  showIcon = false,
  showTransition = false,
  className,
}: SwitchLangProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  // Determine current and target language
  const isAr = pathname.startsWith("/ar")
  const match = pathname.match(/^\/(en|ar)(\/[a-z0-9-]+)?\/?$/i)
  const slug = match?.[2] ?? ""
  const targetLang = isAr ? "en" : "ar"
  const targetHref = `/${targetLang}${slug}`

  // Handle language switch
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    startTransition(() => {
      // router.push(targetHref)
      // router.refresh()
     window.location.href = targetHref
    // window.location.reload()

    })
  }

  // Get display text based on placement
  const getDisplayText = () => {
    if (variant === "icon") return null
    
    switch (placement) {
      case "header":
      case "sidebar":
        return isAr ? "EN" : "AR"
      case "footer":
        return isAr ? "English" : "العربية"
      default:
        return isAr ? "English" : "العربية"
    }
  }

  // Get icon based on placement
  const Icon = placement === "sidebar" ? Languages : Globe
  const iconSize = iconSizeStyles[size]

  // Base classes
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    variant !== "icon" && sizeStyles[size],
    variant === "icon" && "p-2",
    className
  )

  return (
    <>
      {/* Transition Loader */}
      {isPending && showTransition && <TransitionLoader />}

      {/* Language Switch Button */}
      <Link
        href={targetHref}
        onClick={handleClick}
        dir={isAr ? "rtl" : "ltr"}
        className={baseClasses}
        aria-label={`Switch to ${isAr ? "English" : "Arabic"}`}
      >
        {isPending ? (
          <Loader2 className={cn(iconSize, "animate-spin")} />
        ) : (
          <>
            {(showIcon || variant === "icon") && <Icon className={iconSize} />}
            {variant !== "icon" && <span>{getDisplayText()}</span>}
          </>
        )}
      </Link>
    </>
  )
}

export const SwitchLangHeader = (props: Omit<SwitchLangProps, "placement">) => (
  <SwitchLang {...props} placement="header" variant="ghost" size="sm" />
)

export const SwitchLangFooter = (props: Omit<SwitchLangProps, "placement">) => (
  <SwitchLang {...props} placement="footer" variant="link" size="md" />
)

export const SwitchLangSidebar = (props: Omit<SwitchLangProps, "placement">) => (
  <SwitchLang {...props} placement="sidebar" variant="ghost" size="md" showIcon />
)

export const SwitchLangIcon = (props: Omit<SwitchLangProps, "variant">) => (
  <SwitchLang {...props} variant="icon" size="md" />
)