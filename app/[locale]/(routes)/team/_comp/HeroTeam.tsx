"use client";

import { DictionaryShape } from "@/composnents/contact/ContactForm";
import { useGSAP } from "@gsap/react";
import gsap, { SteppedEase } from "gsap";
import { useRef } from "react";

const HeroTeam = ({ title} : {  title : string  }) => {
    const heroSection = useRef<HTMLElement>(null);
    const heroTitle = useRef<HTMLParagraphElement>(null);
    const wordsRef = useRef<HTMLSpanElement[]>([]);

    // reset refs every render
    useGSAP(
        () => {
            if (!heroTitle.current || !wordsRef.current.length) return;

            const tl = gsap.timeline();

            tl.set(heroTitle.current, { autoAlpha: 0 });
            tl.set(wordsRef.current, { autoAlpha: 0 });

            tl.to(heroTitle.current, {
                autoAlpha: 1,
                duration: 1,
                delay: 0.5,
                ease: "power3.out",
            }).to(
                wordsRef.current,
                {
                    autoAlpha: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: {
                        each: 0.04,
                        from: "random",
                        repeat: -1,
                        yoyo: true,
                        repeatDelay: 1.5,
                        onRepeat: () => {},
                        ease: SteppedEase.config(12),

                    },
                    ease: "power3.out",
                },
                "-=0.3"
            );
        },
        { scope: heroSection }
    );

    return (
        <section
            ref={heroSection}
            className=" fixed w-screen h-screen top-0 left-0  flex items-center mx-auto px-4 py-30 text-center font-bold"
        >
            <p ref={heroTitle} className=" max-w-7xl   mx-auto opacity-0 leading-tight flex flex-wrap justify-center gap-4 text-4xl md:text-5xl lg:text-6xl">
                {title.split(" ").map((word, index) => (
                    <span
                        key={index}
                        ref={(el) => { if (el) { if (!wordsRef.current) { wordsRef.current = []; } wordsRef.current[index] = el; } }}
                         className=" cursor-none inline-block text-2xl md:text-5xl lg:text-6xl"
                    >
                        {word}&nbsp;
                    </span>
                ))}
            </p>
        </section>
    );
};

export default HeroTeam;
