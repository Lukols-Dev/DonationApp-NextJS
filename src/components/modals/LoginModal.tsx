"use client";

import { useLoginModal } from "@/hooks/useModal";
import Modal from "./Modal";
import { FC } from "react";
import { generalSans } from "@/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = generalSans.medium.className;

const LoginModal: FC = () => {
  const { isOpen, onClose } = useLoginModal();

  const bodyModal = <LoginItems />;

  return (
    <Modal
      title="ZALOGUJ SIĘ"
      body={bodyModal}
      isOpen={isOpen}
      onClose={onClose}
      position="center"
    />
  );
};

export default LoginModal;

const LoginItems = () => {
  return (
    <ul className="w-full flex flex-col gap-4 items-center justify-center list-none mt-4">
      <li className="w-full">
        <button
          className={cn(
            font,
            "w-full flex items-center relative justify-center text-[#18181A] text-base py-3 rounded-full border border-[#18181A]"
          )}
          type="button"
        >
          <Image
            src={"./assets/google-icon.svg"}
            width={30}
            height={30}
            className="object-fill absolute left-3"
            alt="google icon"
          />
          Google
        </button>
      </li>
      <li className="w-full relative">
        <div
          className={cn(
            font,
            "w-full flex items-center relative justify-center text-[#18181A] text-base py-3 rounded-full border border-[#18181A] blur-[2px] cursor-not-allowed"
          )}
        >
          <Image
            src={"./assets/youtube-icon.svg"}
            width={30}
            height={30}
            className="object-fill absolute left-3"
            alt="google icon"
          />
          Youtube
        </div>
        <span className="text-[#6710a9] font-bold text-xs absolute top-1/2 right-6 transform -translate-y-1/2">
          wkrótce
        </span>
      </li>
      <li className="w-full relative">
        <div
          className={cn(
            font,
            "w-full flex items-center relative justify-center text-[#18181A] text-base py-3 rounded-full border border-[#18181A] blur-[2px] cursor-not-allowed"
          )}
        >
          <Image
            src={"./assets/twitch-icon.svg"}
            width={30}
            height={30}
            className="object-fill absolute left-3"
            alt="google icon"
          />
          Twitch
        </div>
        <span className="text-[#6710a9] font-bold text-xs absolute top-1/2 right-6 transform -translate-y-1/2">
          wkrótce
        </span>
      </li>
      <li className="w-full  relative">
        <div
          className={cn(
            font,
            "w-full flex items-center relative justify-center text-[#18181A] text-base py-3 rounded-full border border-[#18181A] blur-[2px] cursor-not-allowed"
          )}
        >
          <Image
            src={"./assets/twitter-icon.svg"}
            width={30}
            height={30}
            className="object-fill absolute left-3"
            alt="google icon"
          />
          Twitter
        </div>
        <span className="text-[#6710a9] font-bold text-xs absolute top-1/2 right-6 transform -translate-y-1/2">
          wkrótce
        </span>
      </li>
      <li className="w-full relative">
        <div
          className={cn(
            font,
            "w-full flex items-center relative justify-center text-[#18181A] text-base py-3 rounded-full border border-[#18181A] blur-[2px] cursor-not-allowed"
          )}
        >
          <Image
            src={"./assets/metamask-icon.svg"}
            width={30}
            height={30}
            className="object-fill absolute left-3"
            alt="google icon"
          />
          Metamask
        </div>
        <span className="text-[#6710a9] font-bold text-xs absolute top-1/2 right-6 transform -translate-y-1/2">
          wkrótce
        </span>
      </li>
    </ul>
  );
};
