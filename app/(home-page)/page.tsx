import AchievementsSection from "@/composnents/AchiveMents/Achivements";
import LoaderAchievements from "@/composnents/AchiveMents/loader-achivements";
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
    </>
  );
}
