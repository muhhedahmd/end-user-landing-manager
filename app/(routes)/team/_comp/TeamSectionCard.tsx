"use client";
import ContactForm from "@/composnents/contact/ContactForm";
import { useSectionVisibility } from "@/composnents/contact/SectionVisibilityContext";
import BlurredImage from "@/composnents/Reusabale/ClientImageWithBlurHash";
import { TeamMemberWithImage } from "@/types/schema";
import { PaginatedResponse } from "@/types/services";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, User, Mail, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);



const TeamSectionCard = ({
    TeamMembers,
}: {
    TeamMembers: PaginatedResponse<TeamMemberWithImage> | null;
}) => {
    const SectionRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [progress, setProgress] = useState(0);

 const { setSingleCompositionVisible } = useSectionVisibility();

  useEffect(() => {
    if (!SectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        
        setSingleCompositionVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(SectionRef.current);

    return () => observer.disconnect();
  }, [setSingleCompositionVisible , SectionRef]);


    useGSAP(
        () => {
            if (!SectionRef.current || !trackRef.current) return;

            const cards = cardsRef.current.filter(Boolean);

            // Calculate scroll distance to show 3 cards at a time
            const cardWidth = cards[0]?.offsetWidth || 400;
            const gap = 80; // gap between cards
            const scrollWidth = (cardWidth + gap) * (cards.length - 3);

            // Horizontal scroll animation
            gsap.fromTo(
                trackRef.current,
                { x: scrollWidth / 2, ease: "none" },
                {
                    x: -scrollWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: SectionRef.current,
                        start: "top top",
                        end: () => `+=${scrollWidth * 3}`,
                        pin: true,
                        scrub: 1 / (TeamMembers?.data?.length || 1),
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            setProgress(self.progress);
                        },
                    },
                }
            );

            // Animation for each card
        },
        {
            scope: SectionRef,
            dependencies: [trackRef, SectionRef],
        }
    );

    useGSAP(
        () => {
            if (!cardsRef.current) return;
            const cards = cardsRef.current;
            cards.forEach((card, index) => {
                if (!card) return;

                const totalCards = cards.length;
                // const progress = self.progress;

                // Calculate position relative to viewport center
                const cardProgress = (progress - 0.5) * totalCards * 1.5 - index;
                const position = cardProgress - 1; // -1 = left, 0 = center, 1 = right

                const rotateY = position * 90; // -90° to 90°
                let scale = 1;
                if (Math.abs(position) < 1) {
                    scale = 1 + (1 - Math.abs(position)) * 0.3; // up to 1.3x at center
                } else {
                    scale = 0.85;
                }

                const z = Math.abs(position) < 1 ? (1 - Math.abs(position)) * 100 : -50;

                const y = Math.abs(position) * 30;

                const opacity = Math.abs(position) < 1.5 ? 1 : 0.3;

                gsap.to(card, {
                    rotateY: rotateY,
                    // scale: scale,
                    z: z,
                    // y: y,
                    // opacity: opacity,
                    duration: 0.1,
                    overwrite: true,
                });
            });
        },
        {
            dependencies: [progress, cardsRef],
        }
    );

    const data = TeamMembers?.data
        .concat({
            id: "Dump",
            name: "Dump",
            image: null,
            imageId: undefined,
            isActive: false,
            isFeatured: false,
            slug: "dump",
            position: "",
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        })


    return (
        <section className="w-auto h-auto ">
            <div
                ref={SectionRef}
                className="min-h-screen min-w-screen bg-neutral-900 flex items-center justify-center overflow-hidden relative"
                style={{ perspective: "2000px" }}
            >

                <div className="absolute -z-1 top-10 left-1/2 -translate-x-1/2 ">

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
                        OUR TEAM
                    </h2>
                </div>
                <div
                    ref={trackRef}
                    className="flex pl-100 items-center justify-start gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-32"
                    style={{
                        transformStyle: "preserve-3d",
                        paddingLeft: "calc(200vw - 200px)",
                        paddingRight: "calc(40vw - 200px)",
                    }}
                >
                    {
                        data && data.map((member, index) => {
                            if (member.name === "Dump") {
                                return (
                                    <div
                                        ref={(el) => {
                                            if (cardsRef.current) cardsRef.current[index] = el;
                                        }}
                                        key={index}
                                        className="relative shrink-0 pointer-events-auto"
                                        style={{
                                            width: "clamp(280px, 35vw, 450px)",
                                            height: "clamp(400px, 50vw, 600px)",
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        {/* Special Front Side */}
                                        <div
                                            className="card-front absolute inset-0 flex flex-col justify-between items-center text-white p-6 sm:p-8 rounded-2xl shadow-2xl overflow-hidden"
                                            style={{
                                                backfaceVisibility: "hidden",
                                                transformStyle: "preserve-3d",
                                            }}
                                        >
                                            {/* Animated background effect */}
                                            <div className="absolute inset-0 opacity-30">
                                                <div className="absolute top-0 left-0 w-40 h-40 bg-orange-700 rounded-full blur-3xl animate-pulse" />
                                                <div className="absolute bottom-0 right-0 w-60 h-60 bg-orange-500 rounded-full blur-3xl animate-pulse delay-700" />
                                            </div>

                                            <div className="flex justify-end w-full relative z-10">
                                                <ArrowUpRight className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 animate-bounce" />
                                            </div>

                                            <div className="flex-1 flex flex-col justify-center items-center text-center gap-4 relative z-10">
                                                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/50 animate-pulse">
                                                    <Mail className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
                                                </div>
                                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
                                                    Get In Touch
                                                </h3>
                                                <p className="text-base sm:text-lg md:text-xl opacity-90 drop-shadow-md">
                                                    Let&apos;s Work Together
                                                </p>
                                                <div className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/40">
                                                    <span className="text-sm sm:text-base font-semibold">We&lsquo;re Hiring!</span>
                                                </div>
                                            </div>

                                            <div className="relative z-10">
                                                <button className=" cursor-pointer px-6 sm:px-8 py-3 sm:py-4 border-orange-500 border-1 text-orange-600 font-bold rounded-full hover:scale-105 transition-transform shadow-xl text-sm sm:text-base">
                                                    Contact Us Now
                                                </button>
                                            </div>
                                        </div>

                                        {/* Back Side - Company Name */}
                                        <div
                                            className="card-back absolute inset-0 flex items-center justify-center text-white p-6 sm:p-8 rounded-2xl shadow-2xl"
                                            style={{
                                                backfaceVisibility: "hidden",
                                                transform: "rotateY(180deg)",
                                                transformStyle: "preserve-3d",
                                            }}
                                        >
                                            <h2 className="text-4xl flex flex-col justify-center items-center sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
                                                TECH VISION
                                                <span className="text-orange-500 ">

                                                    @{new Date().getFullYear() + 1}
                                                </span>
                                            </h2>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div

                                    ref={(el) => {
                                        if (cardsRef.current) cardsRef.current[index] = el;
                                    }}
                                    key={index}
                                    className="relative shrink-0"
                                    style={{
                                        width: "clamp(280px, 35vw, 450px)",
                                        height: "clamp(400px, 50vw, 600px)",
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    {/* Front Side */}
                                    <div

                                        className="card-front absolute inset-0 flex flex-col justify-between items-center  text-white p-6 sm:p-8 rounded-2xl shadow-2xl"
                                        style={{
                                            backfaceVisibility: "hidden",
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        <div className="flex justify-end w-full">
                                            <ArrowUpRight className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-center items-center text-center gap-4">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <BlurredImage
                                                    imageUrl={member.image?.url || ""}
                                                    blurhash={member.image?.blurHash || ""}
                                                    quality={70}
                                                    alt={member.name}
                                                    width={128}
                                                    height={128}
                                                    className="rounded-full object-cover w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 absolute inset-0"
                                                />
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                                                {member.name}
                                            </h3>
                                            <p className="text-base sm:text-lg md:text-xl opacity-90">
                                                {member.position}
                                            </p>
                                        </div>

                                        <div className="text-6xl sm:text-7xl md:text-8xl font-black opacity-10">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                    </div>

                                    {/* Back Side */}
                                    <div
                                        className="card-back absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-neutral-800 to-neutral-900 text-white p-6 sm:p-8 rounded-2xl shadow-2xl"
                                        style={{
                                            backfaceVisibility: "hidden",
                                            transform: "rotateY(180deg)",
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        <div className="flex flex-col gap-6 sm:gap-8 w-full">
                                            <div className="text-center">
                                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                                                    {member.name}
                                                </h3>
                                                <p className="text-sm sm:text-base md:text-lg text-orange-400">
                                                    {member.position}
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-4 sm:gap-6">
                                                <div className="flex items-center gap-3 sm:gap-4 bg-white/5 p-3 sm:p-4 rounded-lg">
                                                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 shrink-0" />
                                                    <span className="text-xs sm:text-sm md:text-base break-all">
                                                        {member.email}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 sm:gap-4 bg-white/5 p-3 sm:p-4 rounded-lg">
                                                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 shrink-0" />
                                                    <span className="text-xs sm:text-sm md:text-base line-clamp-6">
                                                        {member.bio}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* <div className="mt-4 sm:mt-6">
                                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base">
                                                    Connect
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {/* Scroll Indicator */}
            </div>
            <div className="h-auto w-screen bg-neutral-900 relative z-1" >
                <ContactForm/>
            </div>
            {/* <div className="h-screen w-screen bg-amber-300"/> */}
        </section>
    );
};

export default TeamSectionCard;
