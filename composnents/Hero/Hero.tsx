import type { IHero, Image } from "@/types/schema";
import HeroError from "./hero-error";

import ClientHeroVarients from "./_comp/clientHeroVarients";
import HeroAnimation from "./_comp/heroAnamation";

export const dynamic = "force-dynamic";
 export const revalidate = 3600; // Use this for ISR instead


type HeroResult =
  | { status: "success"; hero: IHero; backgroundImage: Image }
  | { status: "error" };

async function fetchActiveHero({locale} : { locale: "en" | "ar"}): Promise<HeroResult> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero/active?lang=${locale}`,
      {
              cache: "no-store", // Changed for debugging

      },

    );

    if (!res.ok) return { status: "error" };

    const json = await res.json();
    const payload = json?.data;

    return {
      status: "success",
      hero: payload.hero,
      backgroundImage: payload.backgroundImage,
    };
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}
export default async function HeroSection({
    locale
} : { 
    locale: "en" | "ar"
}) {
  const result = await fetchActiveHero({locale});

  if (result.status === "error") {
    return <HeroError />;
  }

  return (
    <section
      className="w-screen h-screen"
      role="banner"
      aria-label={result.hero.name || "Hero section"}
    >
      <HeroAnimation>
        <ClientHeroVarients
          hero={{...result.hero , 
            backgroundColor:"",
            overlayColor:"",
          }}
          backgroundImage={result.backgroundImage}
        />
      </HeroAnimation>
    </section>
  );
}
