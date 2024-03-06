"use client";

import { cn } from "@/lib/utils";
import Magnetic from "../Magnetic";
import { generalSans } from "@/fonts";
import { useLoginModal } from "@/hooks/useModal";
import getCurrentUser from "@/lib/auth-actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
// import { signOut, useSession } from "next-auth/react";

interface Props {
  title?: string;
}

const font = generalSans.medium.className;

const LoginBtn = ({ title }: Props) => {
  const [user, setUser] = useState<string>("");

  const getUser = async () => {
    const currentUser: any = await getSession();
    if (currentUser && currentUser.user && currentUser.user.uid) {
      setUser(currentUser.user.uid);
    }
  };

  const { onOpen } = useLoginModal();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Magnetic>
      {user && user.length > 0 ? (
        <Link
          href={`${process.env.NEXT_PUBLIC_URL}/user`}
          className={cn(
            font,
            "flex items-center relative justify-center text-[#18181A] text-base px-8 py-4 rounded-full border border-[#18181A] cursor-pointer"
          )}
        >
          Panel klienta
        </Link>
      ) : (
        <div
          onClick={() => onOpen()}
          className={cn(
            font,
            "flex items-center relative justify-center text-[#18181A] text-base px-8 py-4 rounded-full border border-[#18181A] cursor-pointer"
          )}
        >
          {!title ? "ZALOGUJ SIĘ" : title}
        </div>
      )}
    </Magnetic>
  );
};

export default LoginBtn;
