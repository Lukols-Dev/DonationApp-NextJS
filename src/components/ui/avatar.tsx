import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";
import Image from "next/image";

interface Props {
  src?: string;
  fill?: boolean;
}

const Avatar = ({ src, fill }: Props) => {
  return (
    <div
      className={cn(
        "bg-[#b1b1b141] w-[60px] h-[60px] rounded-full flex items-center justify-center overflow-hidden relative",
        { "w-full h-full": fill }
      )}
    >
      {src ? (
        <Image
          alt="Avatar"
          fill
          className="object-cover object-center"
          src={src}
        />
      ) : (
        <UserRound className={cn("w-7 h-7", { "w-full h-full": fill })} />
      )}
    </div>
  );
};

export default Avatar;
