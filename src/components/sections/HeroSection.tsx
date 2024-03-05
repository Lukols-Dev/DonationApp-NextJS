import Image from "next/image";
import Container from "../Container";
import { generalSans } from "@/fonts";
import { cn } from "@/lib/utils";

const font = generalSans.medium.className;

const HeroSection = async () => {
  return (
    <section>
      <Container>
        <div className="w-full h-[900px] xl:h-screen xl:max-h-[900px] relative">
          <div className="flex flex-col w-full max-w-[680px] gap-4 absolute -translate-x-1/2 left-1/2 top-[200px] xl:-translate-x-0 xl:left-0 xl:top-1/3">
            <h1
              className={cn(
                "text-4xl text-black sm:text-5xl md:text-6xl",
                font
              )}
            >
              Twórz & Monetyzuj
            </h1>
            <h1
              className={cn(
                "text-4xl text-black flex items-center sm:text-5xl md:text-6xl",
                font
              )}
            >
              <span
                className={cn(
                  "bg-[#18181A] text-[#70FF4D] py-1 px-3 rounded-lg text-2xl md:text-5xl mr-2",
                  font
                )}
              >
                No-Code
              </span>
              Live Stream
            </h1>
          </div>
          <div className="w-full sm:w-[452px] h-[452px] flex flex-col gap-4 absolute -translate-x-1/2 left-1/2  top-[400px] xl:left-auto xl:-translate-x-0 xl:right-0 xl:top-[20%]">
            <div className="w-full h-full flex items-end gap-4">
              <div className="w-full h-full max-w-[248px] max-h-[216px] rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] relative overflow-hidden">
                <Image
                  alt="Avatar"
                  fill
                  className="object-cover object-center"
                  src="/assets/images/hero2.png"
                />
              </div>
              <div className="w-full h-full msx-w-[183px] max-h-44 rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] relative overflow-hidden">
                <Image
                  alt="Avatar"
                  fill
                  className="object-cover object-center"
                  src="/assets/images/hero3.png"
                />
              </div>
            </div>
            <div className="w-full h-full flex items-start gap-4">
              <div className="w-full h-full max-w-[183px] max-h-44 rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] relative overflow-hidden">
                <Image
                  alt="Avatar"
                  fill
                  className="object-cover object-center"
                  src="/assets/images/hero1.png"
                />
              </div>
              <div className="w-full h-full max-w-[248px] max-h-[216px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] relative overflow-hidden">
                <Image
                  alt="Avatar"
                  fill
                  className="object-cover object-center"
                  src="/assets/images/hero4.png"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
