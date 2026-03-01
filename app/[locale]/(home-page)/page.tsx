import AchievementsSection from "@/custom-components/Achievements/Achievements";
import LoaderAchievements from "@/custom-components/Achievements/loader-achievements";
import ContactForm from "@/custom-components/contact/ContactForm";
import Footer from "@/custom-components/Footer/Footer";
import Header from "@/custom-components/Header/header";
import HeroSection from "@/custom-components/Hero/Hero";
import MainLoader from "@/custom-components/Loaders/MainLoader";
import { CompositionLoader } from "@/custom-components/SlideShow/_comp/SlidesLoader";
import SlideShowsProd from "@/custom-components/SlideShow/SlideShow";
import { getDictionary } from "@/lib/i18n";
import { CompositionType } from "@/types/schema";
import { Fragment, Suspense } from "react";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const _locale = (await params).locale as "en" | "ar"
  const dictionary = await getDictionary(_locale);

  return (
    <Fragment>
      <MainLoader duration={2000} />
      <Header locale={_locale || "en"} />

      <Suspense fallback={<div className="h-screen w-screen " />}>
        <HeroSection locale={_locale || "en"} />
      </Suspense>

      <Suspense fallback={<><LoaderAchievements /> </>}>
        <AchievementsSection dictionary={dictionary} locale={_locale || "en"} />
      </Suspense>
      <Suspense fallback={
        <div className="flex min-h-screen w-screen items-center container mx-auto justify-center flex-col gap-4">
          <CompositionLoader composition={CompositionType.GRID} locale={_locale || "en"} />
          <CompositionLoader composition={CompositionType.PARALLAX} locale={_locale || "en"} />
          <CompositionLoader composition={CompositionType.CAROUSEL} locale={_locale || "en"} />
          <CompositionLoader composition={CompositionType.LIGHTBOX} locale={_locale || "en"} />
          <CompositionLoader composition={CompositionType.MARQUEE} locale={_locale || "en"} />
          <CompositionLoader composition={CompositionType.COVERFLOW} locale={_locale || "en"} />
        </div>
      }>
        <SlideShowsProd locale={_locale || "en"} />
      </Suspense>

      <ContactForm dictionary={dictionary} />
      <Footer locale={_locale || "en"} dictionary={dictionary} />
    </Fragment>

  );
}
