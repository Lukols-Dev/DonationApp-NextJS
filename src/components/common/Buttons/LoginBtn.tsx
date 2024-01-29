import { cn } from "@/lib/utils";
import Magnetic from "../Magnetic";
import Link from "next/link";
import { generalSans } from "@/fonts";

const font = generalSans.medium.className;

const LoginBtn = () => {
  return (
    <Magnetic>
      <Link
        href="/login"
        className={cn(
          font,
          "flex items-center relative justify-center text-[#18181A] text-base px-8 py-4 rounded-full border border-[#18181A]"
        )}
      >
        ZALOGUJ SIĘ
      </Link>
    </Magnetic>
  );
};

export default LoginBtn;
