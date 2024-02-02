"use client";

import { generalSans } from "@/fonts";
import { cn } from "@/lib/utils";
import LoginBtn from "../common/Buttons/LoginBtn";
import Container from "../Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const font = generalSans.medium.className;

const DescriptionSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section>
      <Container>
        <div className="w-full h-full flex items-center justify-end">
          <div className="flex flex-col gap-8">
            <motion.p
              ref={container}
              className={cn(
                "text-[#18181A] text-3xl text-left w-[780px]",
                font
              )}
              style={{ opacity }}
            >
              Wierzymy w siłę innowacji i rozwój, który wyznacza kierunki
              przyszłości w świecie streamingu. Nasz no-code konfigurator dla
              streamerów to narzędzie, które pozwala na łatwe wprowadzenie opcji
              płatności i wyznacza nowe standardy w kreowaniu streamów. Jesteśmy
              po to, aby wspierać użytkowników na każdym etapie ich drogi – od
              początkujących, dzięki kompleksowym kursom wprowadzającym, aż po
              zaawansowanych twórców treści, którzy pragną podnieść swoje
              transmisje na nieosiągalny dotąd poziom nowoczesności. Razem
              kształtujemy świat, w którym własność, współpraca i innowacja
              rozkwitają, przekraczając tradycyjne granice. Czy jesteś gotowy,
              aby do nas dołączyć i wpłynąć na zmiany?
            </motion.p>
            <div className="w-[282px]">
              <LoginBtn title="Dołącz do Tipey" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DescriptionSection;
