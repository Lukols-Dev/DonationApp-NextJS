import InfiniteText from "@/components/InfiniteText";
import Preloader from "@/components/Preloader";
import ContactSection from "@/components/sections/ContactSection";
import DescriptionSection from "@/components/sections/DescriptionSection";
import FeatureSection from "@/components/sections/FeatureSection";
import HeroSection from "@/components/sections/HeroSection";
import ImageSection from "@/components/sections/ImageSection";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <Preloader />
      <HeroSection />
      <InfiniteText />
      <ImageSection />
      <DescriptionSection />
      <FeatureSection />
      <ContactSection />
    </main>
  );
}
