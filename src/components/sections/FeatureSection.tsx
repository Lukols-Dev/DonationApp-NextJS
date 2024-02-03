"use client";

import Container from "../Container";
import Picture1 from "../../../public/assets/images/test/1.jpeg";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FeatureSection = () => {
  const conainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: conainer,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.6, 0.7], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section>
      <Container>
        <div ref={conainer} className="relative h-[2000px]">
          <div className="sticky start-0 top-0 h-[100vh]">
            <div className="w-full h-full absolute top-0 flex flex-col items-center justify-center">
              <motion.div
                style={{ opacity: opacity1 }}
                className="w-full h-[500px] sticky start-0 top-0  flex items-start justify-center gap-9"
              >
                <div className="flex flex-col w-[500px]">
                  <p className="text-[70px]">Płatności</p>
                  <p className="text-[40px]">
                    Ustaw metody płatności jednym kliknięciem i zbieraj
                    darowizny od społeczności
                  </p>
                </div>
                <div className="w-[500px] h-[500px] relative">
                  <Image
                    src={Picture1}
                    fill
                    alt="Image"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
            <div className="w-full h-full absolute top-0 flex flex-col items-center justify-center">
              <motion.div
                style={{ opacity: opacity2 }}
                className="w-full h-[500px] sticky start-0 top-0 flex items-start justify-center gap-9"
              >
                <div className="flex flex-col w-[500px]">
                  <p className="text-[70px]">Powiadomienia</p>
                  <p className="text-[40px]">
                    Ustaw metody płatności jednym kliknięciem i zbieraj
                    darowizny od społeczności
                  </p>
                </div>
                <div className="w-[500px] h-[500px] relative">
                  <Image
                    src={Picture1}
                    fill
                    alt="Image"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
            <div className="w-full h-full absolute top-0 flex flex-col items-center justify-center">
              <motion.div
                style={{ opacity: opacity3 }}
                className="w-full h-[500px]  start-0 top-0 flex items-start justify-center gap-9"
              >
                <div className="flex flex-col w-[500px]">
                  <p className="text-[70px]">Konfigurator</p>
                  <p className="text-[40px]">
                    Ustaw metody płatności jednym kliknięciem i zbieraj
                    darowizny od społeczności
                  </p>
                </div>
                <div className="w-[500px] h-[500px] relative">
                  <Image
                    src={Picture1}
                    fill
                    alt="Image"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeatureSection;
