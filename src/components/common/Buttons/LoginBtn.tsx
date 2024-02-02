"use client";

import { cn } from "@/lib/utils";
import Magnetic from "../Magnetic";
import { generalSans } from "@/fonts";
import { useLoginModal } from "@/hooks/useModal";
// import { signOut, useSession } from "next-auth/react";

interface Props {
  title?: string;
}

const font = generalSans.medium.className;

const LoginBtn = ({ title }: Props) => {
  // const { data: session } = useSession();
  const { onOpen } = useLoginModal();

  return (
    <Magnetic>
      {/* {session && session.user ? (
        <div
          onClick={() => signOut()}
          className={cn(
            font,
            "flex items-center relative justify-center text-[#18181A] text-base px-8 py-4 rounded-full border border-[#18181A] cursor-pointer"
          )}
        >
          WYLOGUJ SIĘ
        </div>
      ) : ( */}
      <div
        onClick={() => onOpen()}
        className={cn(
          font,
          "flex items-center relative justify-center text-[#18181A] text-base px-8 py-4 rounded-full border border-[#18181A] cursor-pointer"
        )}
      >
        {!title ? "ZALOGUJ SIĘ" : title}
      </div>
      {/* )} */}
    </Magnetic>
  );
};

export default LoginBtn;
