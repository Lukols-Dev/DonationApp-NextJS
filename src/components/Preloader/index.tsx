"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { opacity, slideUp } from "./animation";
import Logo from "../Header/Logo";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dimension, setDimension] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="h-screen w-screen flex items-center justify-center fixed z-50 bg-black"
        >
          {dimension.width > 0 && (
            <>
              {/* <motion.div
                className="flex text-white text-[42px] text-center items-center absolute z-10"
                variants={opacity}
                initial="initial"
                animate="enter"
              >
                <Logo />
              </motion.div> */}
              <svg className="absolute bottom-0 w-full h-[calc(100%-300px)]">
                <motion.path
                  className="fill-black"
                  variants={curve}
                  initial="initial"
                  exit="exit"
                ></motion.path>
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
