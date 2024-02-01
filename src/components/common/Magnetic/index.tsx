"use client";

import {
  FC,
  Fragment,
  ReactElement,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactElement;
}

const Magnetic: FC<MagneticProps> = ({ children }) => {
  const magnetic = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = magnetic.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const yTo = gsap.quickTo(element, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: any) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    // remove event listeners, so that there is no memory leakage
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return cloneElement(children, { ref: magnetic });
};

export default Magnetic;
