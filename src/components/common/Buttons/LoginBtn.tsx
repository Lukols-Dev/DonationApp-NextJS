import { cn } from "@/lib/utils";
import Magnetic from "../Magnetic";
import { generalSans } from "@/fonts";
import { useLoginModal } from "@/hooks/useModal";

const font = generalSans.medium.className;

const LoginBtn = () => {
  const { onOpen } = useLoginModal();

  return (
    <Magnetic>
      <div
        onClick={() => onOpen()}
        className={cn(
          font,
          "flex items-center relative justify-center text-[#18181A] text-base px-8 py-4 rounded-full border border-[#18181A] cursor-pointer"
        )}
      >
        ZALOGUJ SIĘ
      </div>
    </Magnetic>
  );
};

export default LoginBtn;
