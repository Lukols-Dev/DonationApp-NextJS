import { UserRound } from "lucide-react";
import Image from "next/image";

interface Props {
  src?: string;
}

const Avatar = ({ src }: Props) => {
  return (
    <div className="bg-[#b1b1b141] w-[60px] h-[60px] rounded-full flex items-center justify-center">
      {src ? (
        <Image alt="Avatar" fill src={src} />
      ) : (
        <UserRound className="w-7 h-7" />
      )}
    </div>
  );
};

export default Avatar;
