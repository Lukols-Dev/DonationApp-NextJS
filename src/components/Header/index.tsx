"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

import gsap from "gsap";

import Container from "../Container";
import RoundedButton from "../common/Buttons/RoundedButton";
import Magnetic from "../common/Magnetic";
import Logo from "./Logo";
import Menu from "./Menu";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoginBtn from "../common/Buttons/LoginBtn";

const Header = () => {
  const button = useRef<any>(null);

  useLayoutEffect(() => {
    const element = button.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(element, {
      scrollTrigger: {
        trigger: document.body,
        start: "top+=300",
        end: "bottom top",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.to(element, {
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(element, {
            scale: 0,
            duration: 0.25,
            ease: "power2.out",
          });
        },
      },
    });
  }, []);

  return (
    <>
      <header className="w-full bg-transparent absolute z-10 top-0">
        <Container>
          <div className="flex justify-between py-4">
            <Magnetic>
              <Logo />
            </Magnetic>
            <Menu />
            <LoginBtn />
          </div>
        </Container>
      </header>
      <div className="fixed transform scale-0 top-5 right-5 z-20 " ref={button}>
        <RoundedButton />
      </div>
    </>
  );
};

export default Header;
