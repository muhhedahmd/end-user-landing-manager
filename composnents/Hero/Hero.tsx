

import type { IHero, Image } from "@/types/schema"
import HeroError from "./hero-error"

import ClientHeroVarients from "./_comp/clientHeroVarients";
import HeroAnimation from "./_comp/heroAnamation";



export const dynamic = "force-static"


type HeroResult =
    | { status: "success"; hero: IHero; backgroundImage: Image }
    | { status: "error" }

async function fetchActiveHero(): Promise<HeroResult> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero/active`,
            {
                cache: "force-cache",
                next: { revalidate: 3600 },
            }
        )


        if (!res.ok) return { status: "error" }


        const json = await res.json()
        const payload = json?.data



        return {
            status: "success",
            hero: payload.hero,
            backgroundImage: payload.backgroundImage,
        }
    } catch (error) {
        console.error(error)
        return { status: "error" }
    }
}
export default async function HeroSection() {
    const result = await fetchActiveHero()


    if (result.status === "error") {
        return <HeroError />
    }



    return (

        <section
        className="w-screen h-screen"
          role="banner"
                aria-label={result.hero.name || "Hero section"}
        >

        <HeroAnimation>
           
                <ClientHeroVarients hero={result.hero} backgroundImage={result.backgroundImage} />
            </HeroAnimation>
            </section>
    )
}



