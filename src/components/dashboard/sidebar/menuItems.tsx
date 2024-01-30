import { generalSans } from "@/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  defaultOpen?: boolean;
  sidebarOpt: any;
}

const font = generalSans.bold.className;

const MenuItems = ({ defaultOpen, sidebarOpt }: Props) => {
  return (
    <div className="h-full flex flex-col items-center">
      <div className={cn(font, "text-4xl text-[#18181A] mt-6 mb-16")}>
        TIPEY
      </div>
      <ul className="flex flex-col gap-2">
        {sidebarOpt.map((sidebarOptions: any) => (
          <li
            key={sidebarOptions.id}
            className="flex justify-left relative group"
          >
            <Link
              href={sidebarOptions.link}
              className="text-zinc-400 text-lg flex gap-2 w-full py-2 px-16 hover:text-blue-700"
            >
              <sidebarOptions.icon className="w-6 h-6" />
              {sidebarOptions.name}
            </Link>
            <span className="w-[3px] h-[80%] absolute right-0 top-1/2 transform scale-0 -translate-y-1/2 transition-transform duration-200 ease-custom bg-blue-700 group-hover:scale-100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItems;
