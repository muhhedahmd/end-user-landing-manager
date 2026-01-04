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
    
    // useGSAP(() => {
    //     if (!sectionRef.current || !contentRef.current) return
        
    //     const section = sectionRef.current
    //     const content = contentRef.current
        
    //     // Let ScrollTrigger handle the calculation
    //     const tl = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: section,
    //             start: "top top",
    //             end: "bottom top",
    //             pin: true,
    //             scrub: 1,
    //             anticipatePin: 1,
    //         }
    //     })
        
    //     // Calculate the scroll distance that the content needs to move
    //     const getScrollAmount = () => {
    //         const contentHeight = content.getBoundingClientRect().height
    //         const sectionHeight = section.getBoundingClientRect().height
    //         return -(contentHeight - sectionHeight)
    //     }
        
    //     tl.to(content, {
    //         y: getScrollAmount,
    //         ease: "none"
    //     })
       
    // }, { 
    //     dependencies: [],
    //     scope: sectionRef,
    //     revertOnUpdate: true
    // })
    
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