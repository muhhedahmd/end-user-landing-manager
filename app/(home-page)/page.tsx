import AchievementsSection from "@/composnents/AchiveMents/Achivements";
import LoaderAchievements from "@/composnents/AchiveMents/loader-achivements";
import ContactForm from "@/composnents/contact/ContactForm";
import Footer from "@/composnents/Footer/Footer";
import HeroSection from "@/composnents/Hero/Hero";
import LoadingHero from "@/composnents/Hero/Loading-hero";
import MainLoader from "@/composnents/Loaders/MainLoader";
import SlideShowsProd from "@/composnents/SlideShow/SlideShow";
import { Suspense } from "react";

export default function Home() {
  return (
<>
      <MainLoader/>
      <Suspense fallback={<LoadingHero />}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<><LoaderAchievements/> </>}>
        <AchievementsSection />
      </Suspense>
      <Suspense fallback={<></>}>
        <SlideShowsProd /> 
      </Suspense>

          <ContactForm />
        <Footer />
</>

  );
}
