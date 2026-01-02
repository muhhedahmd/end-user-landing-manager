import AchievementsSection from "@/composnents/AchiveMents/Achivements";
import LoaderAchievements from "@/composnents/AchiveMents/loader-achivements";
import ContactForm from "@/composnents/contact/ContactForm";
import { SectionVisibilityProvider } from "@/composnents/contact/SectionVisibilityContext";
import Footer from "@/composnents/Footer/Footer";
import Header from "@/composnents/Header/header";
import HeroSection from "@/composnents/Hero/Hero";
import MainLoader from "@/composnents/Loaders/MainLoader";
import SlideShowsProd from "@/composnents/SlideShow/SlideShow";
import { Suspense } from "react";

export default function Home() {
  return (
    <>


      <MainLoader />
      <Header />

      <Suspense fallback={<div className="h-screen w-screen bg-black"/>}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<><LoaderAchievements /> </>}>
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
