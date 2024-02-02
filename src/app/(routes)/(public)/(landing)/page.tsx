import InfiniteText from "@/components/InfiniteText";
import Preloader from "@/components/Preloader";
import DescriptionSection from "@/components/sections/DescriptionSection";
import HeroSection from "@/components/sections/HeroSection";
import ImageSection from "@/components/sections/ImageSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Preloader />
      <HeroSection />
      <InfiniteText />
      <ImageSection />
      <DescriptionSection />
      <section className="w-full h-[1000px] bg-yellow-500">w</section>
    </main>
  );
}
