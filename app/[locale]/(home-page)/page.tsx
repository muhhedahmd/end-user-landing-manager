import AchievementsSection from "@/composnents/AchiveMents/Achivements";
import LoaderAchievements from "@/composnents/AchiveMents/loader-achivements";
import ContactForm from "@/composnents/contact/ContactForm";
import Footer from "@/composnents/Footer/Footer";
import Header from "@/composnents/Header/header";
import HeroSection from "@/composnents/Hero/Hero";
import MainLoader from "@/composnents/Loaders/MainLoader";
import SlideShowsProd from "@/composnents/SlideShow/SlideShow";
import { getDictionary } from "@/lib/i18n";
import { Loader2 } from "lucide-react";
import { Fragment, Suspense } from "react";

export default  async function Home({ params  }: {  params: Promise<{ locale: string }> }) {
  const _locale = (await params).locale as "en" | "ar" 
  const dictionary = await getDictionary(_locale);
  
  return (
   <Fragment>
      <MainLoader duration={2000} />
      <Header locale={_locale || "en"} />

      <Suspense fallback={<div className="h-screen w-screen "/>}>
        <HeroSection locale={_locale || "en"} />
      </Suspense>

      <Suspense fallback={<><LoaderAchievements /> </>}>
        <AchievementsSection  dictionary={dictionary}  locale={_locale || "en"} />
      </Suspense>
      <Suspense fallback={<div className="h-screen w-screen flex items center justify-center "> <Loader2 className="w-10 h-10  animate-spin"/> </div>}>
        <SlideShowsProd  locale={_locale || "en"} />
      </Suspense>

      <ContactForm dictionary={dictionary} />
      <Footer locale={_locale || "en"} dictionary={dictionary}/>
    </Fragment>

  );
}
