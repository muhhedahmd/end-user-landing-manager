import type { IHero, Image } from "@/types/schema";
import HeroError from "./hero-error";

import ClientHeroVarients from "./_comp/clientHeroVarients";
import HeroAnimation from "./_comp/heroAnamation";
import { getCompanyInfo } from "@/app/[locale]/(routes)/services/comp/Fetchers";



type HeroResult =
  | { status: "success"; hero: IHero; backgroundImage: Image }
  | { status: "error" };

async function fetchActiveHero({locale} : { locale: "en" | "ar"}): Promise<HeroResult> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero/active?lang=${locale}`,
      {
              cache: "no-store", 
              // next: { revalidate: 3600 },

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
  const cmopanyInfo = await getCompanyInfo();
  const companyName =  cmopanyInfo?.company?.name || "Your Company Name";

  if (result.status === "error") {
    return <HeroError />;
  }

  
  return (
    <section
      className="w-screen h-screen"
      role="banner"
      aria-label={result.hero.name || "Hero section"}
    >
      <HeroAnimation companyName={companyName}>
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
