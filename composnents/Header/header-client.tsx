"use client"

import { Fragment, useRef, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { CompanyInfo } from "@/types/schema"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "../toggleTheme"

interface NavItem {
  label: string
  href: string
}

export default function HeaderClient({ navItems, companyInfo }: { navItems: NavItem[], companyInfo: CompanyInfo | null }) {
  const [open, setOpen] = useState(false)


  return (
    <Fragment>
      <div className=" p-1  flex-1 text-end  hidden md:flex  items-center  gap-3 justify-end" >
        <Link href="#contact" className=" p-1 px-2 border border-primary   w-fit  text-primary hover:text-primary/80 hover:border-primary/80 rounded-md " >
          contact us

        </Link>
        <div className="border border-primary px-2 py-1 rounded-md">

          <ThemeToggle />
        </div>
      </div>

      <div className=" md:hidden  flex items-center  justify-center gap-2">
        <Button onClick={() => setOpen(true)} variant="ghost" className="   ">

          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

      </div>
      <CustomDrawer companyInfo={companyInfo} navItems={navItems} open={open} onOpenChange={setOpen} />
    </Fragment>
  )
}



function CustomDrawer({

  open,
  onOpenChange,
  navItems,
  companyInfo
}: {
  companyInfo: CompanyInfo | null
  open: boolean
  onOpenChange: (open: boolean) => void
  navItems: NavItem[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !overlayRef.current || !contentRef.current) return

    if (open) {

      // Overlay fade in
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })

      // Drawer slide in with dynamic dimensions
      gsap.to(containerRef.current, {
        x: 0,
        width: "100vw",
        height: "100vh",

        duration: 0.6,
        ease: "power4.out"
      })

      // Stagger nav items
      if (navItemsRef.current) {
        const items = navItemsRef.current.querySelectorAll('.nav-item')
        gsap.fromTo(items,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.3,
            ease: "power3.out"
          }
        )
      }
    } else {
      // Reverse animations
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      })

      gsap.to(containerRef.current, {
        x: "100%",
        width: 0,
        duration: 0.4,
        ease: "power3.in"
      })
    }
  }, {
    dependencies: [open],
  })


  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 opacity-0"
        style={{ display: open ? 'block' : 'none' }}
      />

      {/* Drawer */}
      <div
        ref={containerRef}
        className="fixed  overflow-hidden top-0 right-0 bg-background border-l border-border z-50 transform translate-x-full"
        style={{ width: 0, height: "100dvh" }}
      >
        <div ref={contentRef} className="h-full flex flex-col p-6 md:p-8 lg:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Image src={companyInfo?.logo?.url || ""} alt="logo" width={30} height={30} />
              </div>
              <span className="font-bold text-xl text-foreground">{companyInfo?.name}</span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => onOpenChange(false)}
              className="w-12 h-12 rounded-full border border-border hover:bg-accent flex items-center justify-center transition-all duration-300 hover:rotate-90"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Navigation */}
          <nav ref={navItemsRef} className="flex-1 flex flex-col justify-center gap-2">
            <Link
              href={"/"}
              onClick={() => onOpenChange(false)}
              className="nav-item group flex items-center justify-between py-3 md:py-4 border-b border-border opacity-0"
            >
              <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-foreground group-hover:translate-x-2 transition-transform duration-300">
                {"Home"}
              </span>
              <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className="nav-item group flex items-center justify-between py-3 md:py-4 border-b border-border opacity-0"
              >
                <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-foreground group-hover:translate-x-2 transition-transform duration-300">
                  {item.label}
                </span>
                <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="pt-6 md:pt-8 border-t border-border">
            <button className="w-full py-3 md:py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all duration-300 hover:scale-105">
              Get Started
            </button>

        
            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
                      <ThemeToggle />      
            </div>
          </div>
        </div>
      </div>
    </>
  )
}