"use client";

import Image from "next/image";
import Picture1 from "../../../public/assets/images/test/1.jpeg";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ImageSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky start-0 top-0 h-[100vh]">
        <div className="w-full h-full absolute top-0 flex items-center justify-center">
          <motion.div className="w-screen h-screen relative" style={{ scale }}>
            <Image
              src={Picture1}
              fill
              alt="Image"
              placeholder="blur"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
