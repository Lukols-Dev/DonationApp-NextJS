import Link from "next/link";
import { generalSans } from "@/fonts";
import { cn } from "@/lib/utils";
import Magnetic from "../common/Magnetic";

const font = generalSans.bold.className;

const Logo = () => {
  return (
    <Magnetic>
      <Link href={"/"} className={cn(font, "text-4xl text-[#18181A]")}>
        TIPEY
      </Link>
    </Magnetic>
  );
};

export default Logo;
