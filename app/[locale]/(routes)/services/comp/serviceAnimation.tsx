"use client"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const ServiceAnimation = ({ 
    children
}: { 
    children: React.ReactNode
}) => {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    

    return (
        <section 
            ref={sectionRef} 
            id="services" 
            className="min-h-screen w-full bg-background/95 relative z-[2] overflow-hidden"
        >
            <div ref={contentRef} className="w-full pb-20">
                {children}
            </div>
        </section>
    )
}

export default ServiceAnimation