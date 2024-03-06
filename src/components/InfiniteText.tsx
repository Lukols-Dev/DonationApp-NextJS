// "use client";
// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const InfiniteText = () => {
//   const firstText = useRef(null);
//   const secondText = useRef(null);
//   const slider = useRef(null);
//   let xPercent = 0;
//   let direction = -1;

//   useLayoutEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     gsap.to(slider.current, {
//       scrollTrigger: {
//         trigger: document.documentElement,
//         scrub: 0.25,
//         start: 0,
//         end: window.innerHeight,
//         onUpdate: (e) => (direction = e.direction * -1),
//       },
//       x: "-500px",
//     });
//     requestAnimationFrame(animate);
//   }, []);

//   const animate = () => {
//     if (xPercent < -100) {
//       xPercent = 0;
//     } else if (xPercent > 0) {
//       xPercent = -100;
//     }
//     gsap.set(firstText.current, { xPercent: xPercent });
//     gsap.set(secondText.current, { xPercent: xPercent });
//     requestAnimationFrame(animate);
//     xPercent += 0.1 * direction;
//   };

//   return (
//     <div className="overflow-hidden relative flex -top-[50px]">
//       <div className="h-[500px]">
//         <div ref={slider} className="relative whitespace-nowrap">
//           <p
//             ref={firstText}
//             className="relative m-0 text-black text-[230px] font-medium pr-[50px]"
//           >
//             Monetyzuj - Zarządzaj -
//           </p>
//           <p
//             ref={secondText}
//             className="absolute left-[100%] top-0 m-0 text-black text-[230px] font-medium pr-[50px]"
//           >
//             Monetyzuj - Zarządzaj -
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfiniteText;

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const InfiniteText = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let xPercent = 0;
    let direction = -1; // Teraz zmienna jest zdefiniowana w odpowiednim zakresie

    // Sprawdzenie, czy referencje do elementów są dostępne
    if (!slider.current || !firstText.current || !secondText.current) {
      return; // Przerywa wykonanie, jeśli którykolwiek z elementów jest niezdefiniowany
    }

    // Definicja animacji
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (self) => {
          direction = self.direction === -1 ? 1 : -1;
        },
      },
      x: "-500px",
    });

    const animate = () => {
      if (!firstText.current || !secondText.current) {
        return; // Przerywa wykonanie, jeśli którykolwiek z elementów jest niezdefiniowany
      }

      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      gsap.set(firstText.current, { xPercent: xPercent });
      gsap.set(secondText.current, { xPercent: xPercent });
      xPercent += 0.1 * direction;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate); // Rozpoczęcie animacji
  }, []);

  return (
    <div className="overflow-hidden relative flex -top-[50px]">
      <div className="h-[500px]">
        <div ref={slider} className="relative whitespace-nowrap">
          <p
            ref={firstText}
            className="relative m-0 text-black text-[230px] font-medium pr-[50px]"
          >
            Monetyzuj - Zarządzaj -
          </p>
          <p
            ref={secondText}
            className="absolute left-[100%] top-0 m-0 text-black text-[230px] font-medium pr-[50px]"
          >
            Monetyzuj - Zarządzaj -
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfiniteText;
