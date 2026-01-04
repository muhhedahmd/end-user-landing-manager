import AchievementsSection from "@/composnents/AchiveMents/Achivements";
import LoaderAchievements from "@/composnents/AchiveMents/loader-achivements";
import ContactForm from "@/composnents/contact/ContactForm";
import Footer from "@/composnents/Footer/Footer";
import Header from "@/composnents/Header/header";
import HeroSection from "@/composnents/Hero/Hero";
import MainLoader from "@/composnents/Loaders/MainLoader";
import SlideShowsProd from "@/composnents/SlideShow/SlideShow";
import { Fragment, Suspense } from "react";

export default function Home() {
  return (
   <Fragment>


      <MainLoader />
      <Header />

      <Suspense fallback={<div className="h-screen w-screen "/>}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<><LoaderAchievements /> </>}>
        <AchievementsSection />
      </Suspense>
      <Suspense fallback={<div className="h-screen w-screen "/>}>
        <SlideShowsProd />
      </Suspense>

      <ContactForm />
      <Footer />
    </Fragment>

  );
}
