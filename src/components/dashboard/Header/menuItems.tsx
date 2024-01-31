import TooltipWrapper from "@/components/ui/tooltip";
import { generalSans } from "@/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  menuItems: any;
}

const font = generalSans.bold.className;

const MenuItems = ({ menuItems }: Props) => {
  return (
    <nav className="flex items-center">
      <ul className="text-sm flex items-center">
        {menuItems.map((item: any) => (
          <li
            key={item.title}
            className="group flex flex-col relative  bg-transparent"
          >
            <TooltipWrapper description={item.name}>
              <Link
                href={item.link}
                className={cn(
                  font,
                  "text-[#B1B1B1] text-base p-4 z-10 group-hover:text-blue-700"
                )}
              >
                <item.icon className="w-7 h-7" />
              </Link>
            </TooltipWrapper>
            <span className="w-[80%] h-[80%] absolute top-1/2 left-1/2  z-0 transform scale-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-custom bg-[#cee2fe] rounded-md group-hover:scale-100" />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuItems;

// {menuItems.map((options: any) => (
//   <li key={options.id} className="relative group cursor-pointer">
//     <Link
//       href={options.link}
//       className="text-zinc-400 text-lg flex hover:text-blue-700"
//     >
//       <options.icon className="w-6 h-6" />
//       {/* <span className="hidden md:block"> {options.name}</span> */}
//     </Link>
//     {/* <span className="w-[3px] h-[80%] absolute z-10 -right-[1px] top-1/2 transform scale-0 -translate-y-1/2 transition-transform duration-200 ease-custom bg-blue-700 group-hover:scale-100" /> */}
//   </li>
// ))}
