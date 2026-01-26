/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useState, useEffect, useRef } from "react"
import { Switch } from "@/components/ui/switch"
import { Loader2, Moon, MoonIcon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
// ==================== TYPES ====================
type Variant = "default" | "outline" | "ghost" | "link" | "icon"
type Size = "sm" | "md" | "lg"
type Placement = "header" | "footer" | "sidebar" | "inline"

interface ThemeToggleProps {
  variant?: Variant
  size?: Size
  placement?: Placement
  showIcon?: boolean
  showTransition?: boolean
  className?: string
}

// ==================== STYLE MAPS ====================
const variantStyles: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: " text-primary hover:bg-primary/10",
  ghost: "text-primary hover:bg-primary/10",
  link: "text-primary hover:underline underline-offset-4",
  icon: "p-2 rounded-full hover:bg-primary/10 text-primary",
}

// const sizeStyles: Record<Size, string> = {
//   sm: "text-xs px-2 py-1 h-7",
//   md: "text-sm px-3 py-2 h-9",
//   lg: "text-base px-4 py-2.5 h-11",
// }



// ==================== THEME TOGGLE ====================
export function ThemeToggle({
  variant = "default",
  // size = "md",
  // showIcon = false,
  className,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Load initial theme from localStorage once
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  // Classes
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-all ",
    variantStyles[variant],
    // sizeStyles[size],
    className
  )
  // const iconSize = iconSizeStyles[size]

  if(variant ==="link") { 
    return  <button  onClick={toggleTheme} className={"cursor-pointer "+baseClasses}>
        {theme}

    </button>
  }
  if(variant === "default")return (
    <div  className={baseClasses}>
      <Switch
      onClick={toggleTheme}
           className="w-12 h-6 rounded-md bg-transparent outline-none  "
        checked={theme === "dark"}

        icon={

          theme === "dark" ? <Moon  className="w-5 h-5 text-neutral-100 bg-neutral-900  rounded-full" /> : <Sun className="w-5 h-5 text-yellow-100 bg-yellow-400 rounded-full" />
        }
      />

    </div>
  )
}

// ==================== VARIANT EXPORTS ====================
export const ThemeToggleHeader = (props: Omit<ThemeToggleProps, "placement">) => (
  <ThemeToggle {...props} placement="header" variant="ghost" size="sm" />
)
export const ThemeToggleFooter = (props: Omit<ThemeToggleProps, "placement">) => (
  <ThemeToggle {...props} placement="footer" variant="link" size="md" />
)
export const ThemeToggleSidebar = (props: Omit<ThemeToggleProps, "placement">) => (
  <ThemeToggle {...props} placement="sidebar" variant="ghost" size="md" showIcon />
)
export const ThemeToggleIcon = (props: Omit<ThemeToggleProps, "variant">) => (
  <ThemeToggle {...props} variant="icon" size="md" />
)
