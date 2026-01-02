"use client";
import { Button } from "@/components/ui/button";
import BlurredImage from "@/composnents/Reusabale/ClientImageWithBlurHash";
import { useBreakPoints } from "@/hooks/useBreakPoint";
import { ServiceWithImage } from "@/types/schema";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, ChevronDown, ChevronUp, X } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";

const FloatServiceDialog = ({
    children,
    item,
    Allitems,
    idx
}: {
    idx: number,
    Allitems: ServiceWithImage[]
    item: ServiceWithImage;
    children: React.ReactNode;
}) => {
    const [currIdx, setCurrIdx] = useState<number>(idx);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const Overlay = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState<ServiceWithImage>(item);
    const [openDailog, setOpenDailog] = useState<boolean>(false);
    const {  BreakPoint } = useBreakPoints()
    const isMobile = BreakPoint === "sm"

    useGSAP(() => {
        gsap.set(containerRef.current, {
            bottom: "-100vh",
            autoAlpha: 1,
            duration: .1,
            display:"block",
            ease: "power4.out",
        });
    }, {})
    // Dialog open/close animation
    useGSAP(

        () => {
            if (!containerRef.current) return;
            if (openDailog === false) {
                gsap.to(containerRef.current, {
                    bottom: "-100vh",
                    autoAlpha: 1,
                    duration: 1.2,
                    ease: "power4.out",
                });
                gsap.to(Overlay.current, {
                    autoAlpha: 0,
                    ease: "power4.out",
                });
            } else {
                gsap.to(containerRef.current, {
                    bottom: "0",
                    autoAlpha: 1,
                    duration: 1.2,
                    ease: "power4.out",
                });
                gsap.to(Overlay.current, {
                    autoAlpha: 1,
                    ease: "power4.out",
                });
            }
        },
        {
            dependencies: [openDailog],
            scope: containerRef,
        }
    );

    // Content change animation
    useGSAP(
        () => {
            if (!contentRef.current || !openDailog) return;

            const tl = gsap.timeline();

            // Fade out and slide up
            tl.from(contentRef.current, {
                opacity: 0,
                y: 200,
                duration: .5,
                ease: "power4.out",
            })
                // Fade in and slide down
                .to(contentRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power1.out",
                });
        },
        {
            dependencies: [currIdx, openDailog],
            scope: contentRef,
        }
    );

    const handleNext = () => {
        if (currIdx + 1 >= Allitems.length) return;

        const newIdx = currIdx + 1;
        setCurrIdx(newIdx);
        setSelected(Allitems[newIdx]);
    };
    const handlePrev = () => {
        if (currIdx === 0) return;

        const newIdx = currIdx - 1;
        setCurrIdx(newIdx);
        setSelected(Allitems[newIdx]);
    };


    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpenDailog(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);



    return (
        <Fragment>
            <button
                onClick={() => {
                    setOpenDailog(true);
                }}
                className="flex items-center justify-between text-start w-full hover:bg-black hover:text-white cursor-pointer"
            >
                {children}
            </button>

            <div
                ref={Overlay}
                className="overlay opacity-0 fixed z-10 h-screen w-screen top-0 left-0 bg-black/20"
            />

            <div
                style={{
                    boxShadow: "rgb(204, 204, 204) 0px -8px 10px",
                }}
                ref={containerRef}
                className="z-11 fixed hidden bottom-[-10vh] left-0 w-screen h-[95vh] lg:h-[80vh] bg-neutral-100 overflow-hidden"
            >
                {/* Header */}
                <div className="relative w-full p-3 sm:p-4 md:p-4 justify-between items-center flex border-b border-neutral-200">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold truncate pr-2">
                        {selected.name}
                    </h2>
                    <Button
                        onClick={() => setOpenDailog(false)}
                        className="rounded-full flex-shrink-0"
                        size={"icon-sm"}
                    >
                        <X />
                    </Button>
                </div>

                {/* Content - Scrollable Area */}
                <article

                    ref={contentRef}
                    className="flex items-start justify-center p-4 sm:p-6 md:p-8 lg:p-10 h-[calc(100%-80px)] overflow-y-auto md:flex-row flex-col-reverse gap-6 lg:gap-0"
                >
                    {/* Text Content - Maintaining Big Font Identity */}
                    <div className="flex items-start justify-between flex-col gap-6 sm:gap-8 md:gap-10 md:pr-6 lg:pr-10 flex-1 w-full md:w-1/2">
                        <div className="flex items-start justify-between flex-col gap-6 sm:gap-8 md:gap-10 w-full">
                            {/* Title with Icon */}
                            <h3 className="text-xl line-clamp-1 sm:text-4xl md:text-5xl flex items-center gap-2 sm:gap-3">
                                <span className="text-2xl  sm:text-5xl md:text-6xl">{selected.icon}</span>
                                <span className="line-clamp-1">

                                {selected.name}
                                </span>
                            </h3>

                            {/* Description - Keep Big */}
                            <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl max-w-4xl leading-snug sm:leading-normal">
                                {selected.description}
                            </p>

                            {/* Rich Description */}
                            <p className="text-md sm:text-xl md:text-2xl font-bold">
                                {selected.richDescription}
                            </p>
                        </div>

                        {/* Contact Button */}
                        <button className="w-full sm:w-auto mt-8 sm:mt-20 md:mt-32 lg:mt-40 p-3 sm:p-4 border border-black flex items-center justify-center sm:justify-between gap-3 rounded-md cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 text-base sm:text-lg">
                            Contact Now <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex-1 h-[250px] sm:h-[350px] md:h-auto">
                        {selected.image && (
                            <BlurredImage
                                className="w-full h-full object-cover rounded-lg"
                                height={selected.image.height || 500}
                                width={selected.image.width || 500}
                                imageUrl={selected.image.url}
                                blurhash={selected.image.blurHash || ""}
                                quality={70}
                                alt={selected.image.alt || selected.name + " alt"}
                            />
                        )}
                    </div>
                </article>

                {/* Navigation Buttons - Fixed Position */}
                <div className="  absolute bottom-0 right-4 sm:right-6 md:right-8 z-30 flex flex-row sm:flex-col gap-2">

                    <Button
                        size={"icon-sm"}
                        disabled={currIdx <= 0}
                        onClick={handlePrev}
                        className="rounded-full flex items-center justify-center border border-black p-1 px-2 hover:bg-black hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ChevronUp className="block w-5 h-5" />
                    </Button>
                    <Button
                        size={"icon-sm"}
                        disabled={currIdx + 1 >= Allitems.length}
                        onClick={handleNext}
                        className="rounded-full flex items-center justify-center border border-black p-1 px-2 hover:bg-black hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ChevronDown className="block w-5 h-5" />
                    </Button>
                </div>
            </div>
        </Fragment>
    );
};

export default FloatServiceDialog;